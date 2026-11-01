import { Link } from 'react-router-dom'
import { Award, ExternalLink } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import TrackIcon from '../components/TrackIcon'
import { useAuth } from '../context/AuthContext'
import { goals } from '../data/goals'
import { roadmaps } from '../data/roadmaps'
import { progressKey, safeRead } from '../utils/storage'
import { getCertificatesForUser } from '../services/certificateService'

// Only reachable when logged in (wrapped in <ProtectedRoute> in App.jsx).
function ProgressPage() {
  const { currentUser } = useAuth()

  const certificates = currentUser ? getCertificatesForUser(currentUser.email) : []

  // Hooks can't be called inside a loop, so this reads localStorage safely using safeRead.
  // A track counts as "started" only if completed.length > 0.
  const tracks = goals.map(goal => {
    const raw = safeRead(progressKey(currentUser.email, goal.key), [])
    const completed = Array.isArray(raw) ? raw : []
    const steps = roadmaps[goal.key].steps
    const isStarted = completed.length > 0
    const isCompleted = completed.length >= steps.length
    const cert = certificates.find(c => c.trackKey === goal.key)

    return {
      goal,
      started: isStarted,
      done: completed.length,
      total: steps.length,
      isCompleted,
      filled: steps.map(step => completed.includes(step.id)),
      next: steps.find(step => !completed.includes(step.id)),
      certificate: cert || null,
    }
  })

  const started = tracks.filter(track => track.started)
  const notStarted = tracks.filter(track => !track.started)
  const totalDone = started.reduce((sum, track) => sum + track.done, 0)

  return (
    <section className="page page--narrow">
      <header className="page-head">
        <h1>Hi {currentUser.name.split(' ')[0]}, here's your progress</h1>
        <p>
          {started.length === 0
            ? "You haven't started a route yet. Pick any track below to begin."
            : `You've finished ${totalDone} stop${totalDone === 1 ? '' : 's'} across ${started.length} track${started.length === 1 ? '' : 's'}.`}
        </p>
      </header>

      {/* Earned Certificates Card */}
      {certificates.length > 0 && (
        <section className="earned-certificates-card" aria-labelledby="progress-certs-heading">
          <div className="earned-certificates-card__head">
            <Award size={22} className="icon-gold" aria-hidden="true" />
            <div>
              <h2 id="progress-certs-heading">Earned Certificates ({certificates.length})</h2>
              <p>Official verified completion credentials.</p>
            </div>
          </div>
          <div className="earned-certificates-list">
            {certificates.map(cert => (
              <div key={cert.certId} className="certificate-chip-card">
                <div>
                  <strong>{cert.trackTitle}</strong>
                  <span className="cert-id-tag">{cert.certId}</span>
                </div>
                <Link to={`/certificate/${cert.certId}`} className="btn btn--sm">
                  View Certificate <ExternalLink size={13} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <ul className="progress-list">
        {[...started, ...notStarted].map(({ goal, started: isStarted, done, total, filled, next, certificate }) => (
          <li key={goal.key} className="progress-row" style={{ '--track': goal.color }}>
            <span className="track-chip"><TrackIcon trackKey={goal.key} /></span>
            <div className="progress-row__body">
              <div className="progress-row__head">
                <h2>{goal.label}</h2>
                <div className="progress-row__actions">
                  {certificate && (
                    <Link to={`/certificate/${certificate.certId}`} className="btn btn--sm">
                      <Award size={14} aria-hidden="true" /> Certificate
                    </Link>
                  )}
                  <Link to={`/roadmap/${goal.key}`} className="btn btn--sm">{isStarted ? 'Continue' : 'Start'}</Link>
                </div>
              </div>
              <ProgressBar completed={done} total={total} color={goal.color} filled={filled} />
              <p className="progress-row__next">
                {next ? `Next stop: ${next.topic}` : 'Route complete. Every stop is done.'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProgressPage
