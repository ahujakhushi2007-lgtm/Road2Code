import { useState } from 'react'
import { Clock, Radio, Send, Video } from 'lucide-react'
import TrackIcon from '../components/TrackIcon'
import { goals } from '../data/goals'
import { getAllLiveSessions, getPastLiveSessions } from '../data/liveSessions'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { COURSE_PRICE_INR, getEnrollment } from '../services/enrollmentService'
import { liveDoubtsKey, safeRead, safeWrite } from '../utils/storage'

function LivePage() {
  const { currentUser, openAuth } = useAuth()
  const showToast = useToast()
  const [selectedTrack, setSelectedTrack] = useState('all')
  const [advanceText, setAdvanceText] = useState({})

  const allSessions = getAllLiveSessions()
  const visibleSessions = selectedTrack === 'all'
    ? allSessions
    : allSessions.filter(s => s.trackKey === selectedTrack)

  const handleAskDoubt = (trackKey, e) => {
    e.preventDefault()
    const text = (advanceText[trackKey] || '').trim()
    if (!text) return

    if (!currentUser) {
      openAuth('login')
      showToast('Please log in to submit a question.')
      return
    }

    const key = liveDoubtsKey(trackKey)
    const current = safeRead(key, [])
    const newDoubt = {
      id: Date.now(),
      text,
      askedBy: currentUser.name,
      createdAt: Date.now(),
    }
    safeWrite(key, [newDoubt, ...current])
    setAdvanceText(prev => ({ ...prev, [trackKey]: '' }))
    showToast(`Question submitted for ${trackKey} live doubt session!`)
  }

  return (
    <section className="page">
      <header className="page-head page-head--wide">
        <div className="live-page-head-badge">
          <Radio size={16} className="live-pulse" aria-hidden="true" />
          <span>Daily 7:00 PM IST Mentorship</span>
        </div>
        <h1>Daily Live Doubt Sessions</h1>
        <p>
          Connect with industry mentors every evening. Bring questions from your roadmap stops,
          review code patterns, and ask questions before each session begins.
        </p>
      </header>

      {/* Filter by track */}
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filter sessions by track">
          <button
            className={`chip ${selectedTrack === 'all' ? 'is-on' : ''}`}
            aria-pressed={selectedTrack === 'all'}
            onClick={() => setSelectedTrack('all')}
          >
            All Tracks ({goals.length})
          </button>
          {goals.map(g => (
            <button
              key={g.key}
              className={`chip ${selectedTrack === g.key ? 'is-on' : ''}`}
              aria-pressed={selectedTrack === g.key}
              onClick={() => setSelectedTrack(g.key)}
            >
              {g.short}
            </button>
          ))}
        </div>
      </div>

      <div className="live-sessions-grid">
        {visibleSessions.map(session => {
          const pastSessions = getPastLiveSessions(session.trackKey)
          const enrollment = currentUser ? getEnrollment(currentUser.email, session.trackKey) : { status: 'none' }
          const isPaid = currentUser?.role === 'mentor' || enrollment.status === 'paid'

          return (
            <article key={session.trackKey} className="live-session-card live-session-card--full" style={{ '--track': session.trackColor }}>
              <div className="live-session-card__head">
                <div className="track-title-combo">
                  <span className="track-chip"><TrackIcon trackKey={session.trackKey} /></span>
                  <div>
                    <h2>{session.trackLabel}</h2>
                    <span className="live-time">{session.timeString}</span>
                  </div>
                </div>

                <div className="live-mentor-info">
                  <span className="live-mentor-label">Assigned Mentor:</span>
                  <strong>{session.mentorName}</strong>
                  <small>{session.mentorTitle}</small>
                </div>
              </div>

              <div className="live-session-card__body">
                <div>
                  <span className="live-topic-tag">Today's Topic:</span>
                  <h3 className="live-topic-title">{session.topic}</h3>
                </div>

                <div className="live-join-wrap">
                  <a
                    href={session.joinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--primary btn--lg"
                  >
                    <Video size={16} aria-hidden="true" />
                    <span>Join live Google Meet</span>
                  </a>
                  {!isPaid && (
                    <span className="live-perk-hint">
                      Demo users get 1 demo session • Full sessions included in ₹{COURSE_PRICE_INR}
                    </span>
                  )}
                </div>
              </div>

              {/* Ask Question in Advance */}
              <form
                onSubmit={(e) => handleAskDoubt(session.trackKey, e)}
                className="live-advance-form"
              >
                <div className="live-advance-input-row">
                  <input
                    type="text"
                    value={advanceText[session.trackKey] || ''}
                    onChange={(e) => setAdvanceText({ ...advanceText, [session.trackKey]: e.target.value })}
                    placeholder={`Ask ${session.mentorName.split(' ')[0]} a question in advance...`}
                    aria-label={`Ask a doubt for ${session.trackLabel}`}
                  />
                  <button type="submit" className="btn btn--sm" disabled={!(advanceText[session.trackKey] || '').trim()}>
                    <Send size={14} aria-hidden="true" /> Submit Question
                  </button>
                </div>
              </form>

              {/* Past Sessions List */}
              <div className="live-past-sessions">
                <h4><Clock size={14} /> Past Sessions</h4>
                <ul>
                  {pastSessions.map(past => (
                    <li key={past.id} className="past-session-item">
                      <div>
                        <strong>{past.topic}</strong>
                        <span>{past.dateString}</span>
                      </div>
                      <span className="badge badge--recording">
                        Recording coming soon
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default LivePage
