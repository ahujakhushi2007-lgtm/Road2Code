import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import ResourceCard from '../components/ResourceCard'
import { useDebounce } from '../hooks/useDebounce'
import { goals, skillOptions } from '../data/goals'
import { roadmaps } from '../data/roadmaps'

const sortLabels = { relevance: 'Best match', topic: 'Topic (A to Z)', track: 'Track (A to Z)' }

// Every step of every track in one flat list, built once when this file loads.
const allSteps = goals.flatMap(goal =>
  roadmaps[goal.key].steps.map(step => ({ ...step, goal }))
)

// 2 = the topic itself matches, 1 = only the track name or a resource matches, 0 = no match.
function matchScore(step, query) {
  if (step.topic.toLowerCase().includes(query)) return 2
  if (step.goal.label.toLowerCase().includes(query)) return 1
  if (step.resources.some(resource => resource.label.toLowerCase().includes(query))) return 1
  return 0
}

// Wraps the first match of `query` inside `text` in a <mark> tag.
function Highlight({ text, query }) {
  const start = text.toLowerCase().indexOf(query)
  if (query === '' || start === -1) return text
  const end = start + query.length
  return (
    <>
      {text.slice(0, start)}
      <mark>{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  )
}

function SearchPage({ onPickGoal }) {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [trackFilter, setTrackFilter] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')

  // Filtering waits until typing pauses for 250 ms (debounce).
  const search = useDebounce(query.trim().toLowerCase(), 250)

  // useMemo re-runs the search only when the debounced text, the filter or the sort order changes.
  const results = useMemo(() => {
    if (search === '') return []
    const matches = allSteps
      .map(step => ({ step, score: matchScore(step, search) }))
      .filter(({ step, score }) => score > 0 && (trackFilter === 'all' || step.goal.key === trackFilter))

    if (sortBy === 'relevance') matches.sort((a, b) => b.score - a.score)
    if (sortBy === 'topic') matches.sort((a, b) => a.step.topic.localeCompare(b.step.topic))
    if (sortBy === 'track') matches.sort((a, b) => a.step.goal.label.localeCompare(b.step.goal.label))
    return matches.map(match => match.step)
  }, [search, trackFilter, sortBy])

  const clearSearch = () => {
    setQuery('')
    inputRef.current.focus() // useRef gives direct access to the <input> DOM element
  }

  const handlePick = (goalKey) => {
    onPickGoal(goalKey)
    navigate('/generator')
  }

  return (
    <section className="page page--narrow">
      <header className="page-head">
        <h1>Search every stop</h1>
        <p>Know the technology but not the track? Search all {allSteps.length} stops at once.</p>
      </header>

      <div className="search-bar">
        <Search size={18} aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try React, Docker or SQL"
          aria-label="Search stops"
        />
        {query !== '' && (
          <button className="icon-btn icon-btn--sm" onClick={clearSearch} aria-label="Clear search">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="toolbar toolbar--compact">
        <label className="select">
          <span>Track</span>
          <select value={trackFilter} onChange={(e) => setTrackFilter(e.target.value)}>
            <option value="all">All tracks</option>
            {goals.map(goal => <option key={goal.key} value={goal.key}>{goal.label}</option>)}
          </select>
        </label>
        <label className="select">
          <span>Sort</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>

      {search === '' ? (
        <div className="quick-picks">
          <p>Or start with a technology:</p>
          <div className="chips">
            {skillOptions.map(skill => (
              <button key={skill} className="chip" onClick={() => setQuery(skill)}>{skill}</button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <p className="panel-empty">
          No stops match “{search}”{trackFilter !== 'all' ? ' in this track' : ''}. Check the spelling or set the track to All tracks.
        </p>
      ) : (
        <>
          <p className="result-count">
            {results.length} {results.length === 1 ? 'stop matches' : 'stops match'} “{search}”
          </p>
          <ul className="results">
            {results.map(step => (
              <li key={`${step.goal.key}-${step.id}`} className="result" style={{ '--track': step.goal.color }}>
                <p className="result__track"><span className="dot" aria-hidden="true" />{step.goal.label}, stop {step.id}</p>
                <h2><Highlight text={step.topic} query={search} /></h2>
                <div className="station__resources">
                  {step.resources.map(resource => (
                    <ResourceCard key={resource.url} resource={resource} />
                  ))}
                </div>
                <button className="text-btn" onClick={() => handlePick(step.goal.key)}>
                  Plan the {step.goal.label} route
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default SearchPage
