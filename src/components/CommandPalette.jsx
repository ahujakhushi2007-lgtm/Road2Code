import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, CornerDownLeft, Search } from 'lucide-react'
import TrackIcon from './TrackIcon'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { goals } from '../data/goals'
import { navLinks } from '../data/navLinks'

// A keyboard-first menu (Ctrl+K or ⌘K) for jumping to any page or route.
function CommandPalette({ onClose }) {
  const navigate = useNavigate()
  const { currentUser, logout, openAuth } = useAuth()
  const showToast = useToast()
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const isMentor = currentUser?.role === 'mentor'
  const isStudent = currentUser && !isMentor

  const commands = [
    { id: 'home', group: 'Pages', label: 'Home', run: () => navigate('/') },
    ...navLinks.map(link => ({ id: link.to, group: 'Pages', label: link.label, run: () => navigate(link.to) })),
    { id: 'verify', group: 'Pages', label: 'Verify a certificate', run: () => navigate('/verify') },
    { id: 'leaderboard', group: 'Community', label: 'Cohort Leaderboard', run: () => navigate('/leaderboard') },
    { id: 'campus', group: 'Community', label: 'Campus TPO Portal', run: () => navigate('/campus') },
    { id: 'mock', group: 'Career', label: 'AI Mock Interview', run: () => navigate('/mock-interview') },
    ...(isStudent
      ? [
          { id: 'portfolio', group: 'Career', label: 'My Public Portfolio Profile', run: () => navigate('/portfolio') },
          { id: 'resume', group: 'Career', label: '1-Click ATS Resume Generator', run: () => navigate('/resume') },
          { id: 'refer', group: 'Account', label: 'Refer & Earn ₹100', run: () => navigate('/refer') },
          { id: 'my-courses', group: 'Learning', label: 'My enrolled courses', run: () => navigate('/my-courses') },
          { id: 'jobs', group: 'Learning', label: 'Job opportunities', run: () => navigate('/jobs') },
        ]
      : []),
    ...(isMentor
      ? [
          { id: 'mentor', group: 'Mentorship', label: 'Mentor dashboard', run: () => navigate('/mentor') },
        ]
      : []),
    { id: 'plan', group: 'Pages', label: 'Plan a route', run: () => navigate('/generator') },
    ...goals.map(goal => ({
      id: goal.key,
      group: 'Routes',
      label: `${goal.label} route (₹499)`,
      goal,
      run: () => navigate(`/roadmap/${goal.key}`),
    })),
    ...(currentUser
      ? [
          ...(isStudent
            ? [{ id: 'progress', group: 'Account', label: 'My progress', run: () => navigate('/progress') }]
            : []),
          { id: 'logout', group: 'Account', label: 'Log out', run: () => { logout(); showToast('Logged out') } },
        ]
      : [{ id: 'login', group: 'Account', label: 'Log in or sign up', run: () => openAuth('login') }]),
  ]

  const search = query.trim().toLowerCase()
  const results = search === '' ? commands : commands.filter(command => command.label.toLowerCase().includes(search))

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  // Keep the highlighted row in view while moving with the arrow keys.
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const runCommand = (command) => {
    onClose()
    command.run()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(index => Math.min(index + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(index => Math.max(index - 1, 0))
    } else if (e.key === 'Enter' && results[activeIndex]) {
      e.preventDefault()
      runCommand(results[activeIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="palette-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="palette__search">
          <Search size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Jump to a page or a route"
            aria-label="Search pages and routes"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={results[activeIndex] ? `command-${activeIndex}` : undefined}
          />
          <kbd>esc</kbd>
        </div>

        <ul className="palette__results" id="palette-results" role="listbox" ref={listRef}>
          {results.length === 0 && <li className="palette__empty">Nothing matches “{query}”.</li>}
          {results.map((command, index) => (
            <Fragment key={command.id}>
              {(index === 0 || results[index - 1].group !== command.group) && (
                <li className="palette__group" role="presentation">{command.group}</li>
              )}
              <li
                id={`command-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={`palette__item ${index === activeIndex ? 'is-active' : ''}`}
                onMouseMove={() => setActiveIndex(index)}
                onClick={() => runCommand(command)}
              >
                {command.goal ? (
                  <span className="palette__icon track-ink" style={{ '--track': command.goal.color }}>
                    <TrackIcon trackKey={command.goal.key} size={16} />
                  </span>
                ) : (
                  <span className="palette__icon"><ChevronRight size={16} aria-hidden="true" /></span>
                )}
                <span className="palette__label">{command.label}</span>
                {index === activeIndex && <CornerDownLeft size={14} className="palette__enter" aria-hidden="true" />}
              </li>
            </Fragment>
          ))}
        </ul>

        <p className="palette__foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> to move</span>
          <span><kbd>↵</kbd> to open</span>
          <span><kbd>esc</kbd> to close</span>
        </p>
      </div>
    </div>
  )
}

export default CommandPalette
