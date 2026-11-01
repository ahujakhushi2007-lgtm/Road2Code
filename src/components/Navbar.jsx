import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Briefcase,
  ChevronDown,
  Flame,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react'
import BrandMark from './BrandMark'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useTheme } from '../hooks/useTheme'
import { jobService } from '../services/jobService'
import { getStudentStreak } from '../services/streakService'

const isMac = typeof navigator !== 'undefined' && navigator.userAgent.includes('Mac')

function Navbar({ onOpenPalette }) {
  const { currentUser, logout, openAuth } = useAuth()
  const showToast = useToast()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef(null)

  const isMentor = currentUser?.role === 'mentor'
  const isStudent = currentUser && !isMentor

  // Streak data for logged-in students
  const streakData = isStudent ? getStudentStreak(currentUser.email) : null

  // Check for available job offers for students
  const offersCount = isStudent ? jobService.getStudentOffers(currentUser.email).filter(o => o.status === 'offered').length : 0

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Adds a border once the page is scrolled. The cleanup removes the listener on unmount.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    setMoreOpen(false)
  }
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  const handleLogout = () => {
    logout()
    closeMenu()
    showToast('Logged out')
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <BrandMark />
          <span>Road2Code</span>
        </NavLink>

        <nav className={`navbar__links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
          <NavLink
            to="/courses"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
          >
            <span>Courses</span>
          </NavLink>

          {/* Role-specific Nav Links */}
          {isMentor && (
            <NavLink
              to="/mentor"
              onClick={closeMenu}
              className={({ isActive }) => `nav-link nav-link--highlight ${isActive ? 'is-active' : ''}`}
            >
              <LayoutDashboard size={15} aria-hidden="true" />
              <span>Mentor dashboard</span>
            </NavLink>
          )}

          {isStudent && (
            <>
              <NavLink
                to="/my-courses"
                onClick={closeMenu}
                className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              >
                <GraduationCap size={15} aria-hidden="true" />
                <span>My courses</span>
              </NavLink>
              <NavLink
                to="/jobs"
                onClick={closeMenu}
                className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              >
                <Briefcase size={15} aria-hidden="true" />
                <span>Jobs</span>
                {offersCount > 0 && <span className="nav-badge" aria-label={`${offersCount} new job offers`}>{offersCount}</span>}
              </NavLink>
            </>
          )}

          <NavLink
            to="/live"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
          >
            <span>Live Doubts</span>
          </NavLink>

          <NavLink
            to="/leaderboard"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
          >
            <span>Leaderboard</span>
          </NavLink>

          {/* Desktop "More" dropdown for secondary / advanced features */}
          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="nav-link nav-dropdown__trigger"
              onClick={() => setMoreOpen(prev => !prev)}
              aria-expanded={moreOpen}
            >
              <span>More</span>
              <ChevronDown size={14} className={moreOpen ? 'icon-rotated' : ''} aria-hidden="true" />
            </button>
            {moreOpen && (
              <div className="nav-dropdown__menu" role="menu">
                <NavLink to="/mock-interview" onClick={() => { setMoreOpen(false); closeMenu() }} className="nav-dropdown__item">
                  <span>AI Mock Interview</span>
                </NavLink>
                <NavLink to="/resume" onClick={() => { setMoreOpen(false); closeMenu() }} className="nav-dropdown__item">
                  <span>ATS Resume Builder</span>
                </NavLink>
                {isStudent && (
                  <NavLink to="/refer" onClick={() => { setMoreOpen(false); closeMenu() }} className="nav-dropdown__item">
                    <span>Refer & Earn (₹100)</span>
                  </NavLink>
                )}
                <NavLink to="/campus" onClick={() => { setMoreOpen(false); closeMenu() }} className="nav-dropdown__item">
                  <span>Campus TPO Portal</span>
                </NavLink>
                <NavLink to="/quiz" onClick={() => { setMoreOpen(false); closeMenu() }} className="nav-dropdown__item">
                  <span>Career Quiz</span>
                </NavLink>
                <NavLink to="/about" onClick={() => { setMoreOpen(false); closeMenu() }} className="nav-dropdown__item">
                  <span>About Road2Code</span>
                </NavLink>
              </div>
            )}
          </div>

          <div className="navbar__mobile-actions">
            {currentUser ? (
              <>
                {isMentor ? (
                  <NavLink to="/mentor" className="btn btn--primary" onClick={closeMenu}>
                    Mentor dashboard
                  </NavLink>
                ) : (
                  <>
                    <NavLink to="/portfolio" className="btn" onClick={closeMenu}>Public Portfolio</NavLink>
                    <NavLink to="/resume" className="btn" onClick={closeMenu}>ATS Resume</NavLink>
                    <NavLink to="/mock-interview" className="btn" onClick={closeMenu}>Mock Interview</NavLink>
                    <NavLink to="/refer" className="btn" onClick={closeMenu}>Refer & Earn</NavLink>
                    <NavLink to="/my-courses" className="btn" onClick={closeMenu}>My courses</NavLink>
                    <NavLink to="/jobs" className="btn" onClick={closeMenu}>
                      Jobs {offersCount > 0 ? `(${offersCount})` : ''}
                    </NavLink>
                    <NavLink to="/progress" className="btn" onClick={closeMenu}>My progress</NavLink>
                  </>
                )}
                <button className="btn" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <button className="btn btn--primary" onClick={() => { openAuth('login'); closeMenu() }}>
                Log in
              </button>
            )}
          </div>
        </nav>

        <div className="navbar__actions">
          {/* Daily streak indicator for students */}
          {isStudent && streakData && (
            <NavLink to="/leaderboard" className="streak-indicator-chip" title={`${streakData.streak}-day streak! Click for leaderboard`}>
              <Flame size={15} className="icon-fire" aria-hidden="true" />
              <span>{streakData.streak}</span>
            </NavLink>
          )}

          <button className="palette-trigger" onClick={onOpenPalette} aria-label="Open command palette">
            <Search size={15} aria-hidden="true" />
            <span className="palette-trigger__text">Search</span>
            <kbd>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>

          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${nextTheme} mode`}
            title={`Switch to ${nextTheme} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {currentUser ? (
            <div className="navbar__user">
              <NavLink
                to={isMentor ? '/mentor' : '/portfolio'}
                className="user-chip"
                title={isMentor ? 'Mentor dashboard' : 'My Public Portfolio'}
              >
                <span className="avatar">{currentUser.name.charAt(0).toUpperCase()}</span>
                <span className="user-chip__name">
                  {currentUser.name.split(' ')[0]}
                  {isMentor && <span className="user-chip__role">Mentor</span>}
                </span>
              </NavLink>
              <button className="icon-btn" onClick={handleLogout} aria-label="Log out" title="Log out">
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <button className="btn btn--primary btn--sm navbar__login" onClick={() => openAuth('login')}>
              Log in
            </button>
          )}

          <button
            className="icon-btn hamburger"
            onClick={() => setMenuOpen(open => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
