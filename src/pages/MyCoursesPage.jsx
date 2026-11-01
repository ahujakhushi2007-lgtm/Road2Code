import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, CheckCircle2, Clock, ExternalLink, GraduationCap, Lock, Sparkles } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import TrackIcon from '../components/TrackIcon'
import CheckoutModal from '../components/CheckoutModal'
import { useAuth } from '../context/AuthContext'
import { goals } from '../data/goals'
import { roadmaps } from '../data/roadmaps'
import { COURSE_PRICE_INR, formatRemainingDemo, getAllEnrollments } from '../services/enrollmentService'
import { getCertificatesForUser } from '../services/certificateService'
import { progressKey, safeRead } from '../utils/storage'

function MyCoursesPage() {
  const { currentUser } = useAuth()
  const [filter, setFilter] = useState('all') // 'all' | 'paid' | 'demo'
  const [checkoutGoal, setCheckoutGoal] = useState(null)
  const [, setRefreshKey] = useState(0)

  if (!currentUser) return null

  const enrollments = getAllEnrollments(currentUser.email)
  const certificates = getCertificatesForUser(currentUser.email)

  // Map enrolled tracks
  const enrolledTracks = goals
    .map(goal => {
      const enrollment = enrollments[goal.key]
      if (!enrollment || enrollment.status === 'none') return null

      const raw = safeRead(progressKey(currentUser.email, goal.key), [])
      const completed = Array.isArray(raw) ? raw : []
      const steps = roadmaps[goal.key].steps
      const cert = certificates.find(c => c.trackKey === goal.key)

      return {
        goal,
        enrollment,
        status: enrollment.status, // 'paid' | 'demo' | 'demo_expired'
        completedCount: completed.length,
        totalStops: steps.length,
        isCompleted: completed.length >= steps.length,
        filled: steps.map(s => completed.includes(s.id)),
        certificate: cert || null,
      }
    })
    .filter(Boolean)

  const paidCourses = enrolledTracks.filter(t => t.status === 'paid')
  const demoCourses = enrolledTracks.filter(t => t.status === 'demo')
  const expiredCourses = enrolledTracks.filter(t => t.status === 'demo_expired')

  const visibleCourses = enrolledTracks.filter(item => {
    if (filter === 'paid') return item.status === 'paid'
    if (filter === 'demo') return item.status === 'demo' || item.status === 'demo_expired'
    return true
  })

  return (
    <section className="page">
      <header className="page-head page-head--wide">
        <h1>My Courses</h1>
        <p>
          Track your active enrollments, 3-day demos, earned certificates, and next stops.
        </p>
      </header>

      {/* Earned Certificates Section */}
      {certificates.length > 0 && (
        <section className="earned-certificates-card" aria-labelledby="certs-heading">
          <div className="earned-certificates-card__head">
            <Award size={24} className="icon-gold" aria-hidden="true" />
            <div>
              <h2 id="certs-heading">Earned Certificates ({certificates.length})</h2>
              <p>Verified certificates earned by completing full paid courses.</p>
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
                  View <ExternalLink size={13} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Overview Stats */}
      <dl className="stats">
        <div><dt>Paid Courses</dt><dd>{paidCourses.length}</dd></div>
        <div><dt>Active Demos</dt><dd>{demoCourses.length}</dd></div>
        <div><dt>Certificates</dt><dd>{certificates.length}</dd></div>
      </dl>

      {/* Filter Tabs */}
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filter courses">
          <button
            className={`chip ${filter === 'all' ? 'is-on' : ''}`}
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All Courses ({enrolledTracks.length})
          </button>
          <button
            className={`chip ${filter === 'paid' ? 'is-on' : ''}`}
            aria-pressed={filter === 'paid'}
            onClick={() => setFilter('paid')}
          >
            Paid ({paidCourses.length})
          </button>
          <button
            className={`chip ${filter === 'demo' ? 'is-on' : ''}`}
            aria-pressed={filter === 'demo'}
            onClick={() => setFilter('demo')}
          >
            Demos ({demoCourses.length + expiredCourses.length})
          </button>
        </div>

        <Link to="/courses" className="btn btn--sm">
          Browse all {goals.length} courses
        </Link>
      </div>

      {visibleCourses.length === 0 ? (
        <div className="empty-state">
          <GraduationCap size={40} aria-hidden="true" />
          <h2>No courses found</h2>
          <p>
            You haven't enrolled in or started a demo for any track yet.
            Explore all {goals.length} career routes and start your free 3-day demo today!
          </p>
          <Link to="/courses" className="btn btn--primary btn--lg">
            Explore Courses (₹{COURSE_PRICE_INR})
          </Link>
        </div>
      ) : (
        <ul className="board">
          {visibleCourses.map(({ goal, status, enrollment, completedCount, totalStops, isCompleted, filled, certificate }) => {
            const isPaidCourse = status === 'paid'
            const isDemoActive = status === 'demo'
            const isDemoEnded = status === 'demo_expired'

            return (
              <li key={goal.key} className="board__row board__row--spacious" style={{ '--track': goal.color }}>
                <span className="track-chip"><TrackIcon trackKey={goal.key} /></span>

                <div className="board__name">
                  <div className="board__title-row">
                    <h2>{goal.label}</h2>
                    {isPaidCourse && (
                      <span className="badge badge--paid">
                        <CheckCircle2 size={12} aria-hidden="true" /> Paid Access
                      </span>
                    )}
                    {isDemoActive && (
                      <span className="badge badge--demo">
                        <Clock size={12} aria-hidden="true" /> {formatRemainingDemo(enrollment.remainingMs)}
                      </span>
                    )}
                    {isDemoEnded && (
                      <span className="badge badge--expired">
                        <Lock size={12} aria-hidden="true" /> Demo Expired
                      </span>
                    )}
                  </div>
                  <p>{goal.tagline}</p>
                </div>

                <div className="board__progress-col">
                  <ProgressBar
                    completed={completedCount}
                    total={totalStops}
                    color={goal.color}
                    filled={filled}
                  />
                  <span className="board__progress-text">
                    {completedCount} of {totalStops} stops complete {isCompleted ? '• Route finished' : ''}
                  </span>
                </div>

                <div className="board__actions-col">
                  {isPaidCourse ? (
                    <>
                      <Link to={`/roadmap/${goal.key}`} className="btn btn--sm btn--primary">
                        Continue Route
                      </Link>
                      {certificate && (
                        <Link to={`/certificate/${certificate.certId}`} className="btn btn--sm">
                          <Award size={14} aria-hidden="true" /> Certificate
                        </Link>
                      )}
                    </>
                  ) : isDemoActive ? (
                    <>
                      <Link to={`/roadmap/${goal.key}`} className="btn btn--sm">
                        Continue Demo
                      </Link>
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={() => setCheckoutGoal(goal)}
                      >
                        <Sparkles size={14} aria-hidden="true" /> Buy ₹{COURSE_PRICE_INR}
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn--primary btn--sm"
                      onClick={() => setCheckoutGoal(goal)}
                    >
                      <Lock size={14} aria-hidden="true" /> Buy course ₹{COURSE_PRICE_INR}
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {/* Checkout Modal when upgrading */}
      {checkoutGoal && (
        <CheckoutModal
          trackKey={checkoutGoal.key}
          trackTitle={checkoutGoal.label}
          trackColor={checkoutGoal.color}
          studentEmail={currentUser.email}
          onClose={() => setCheckoutGoal(null)}
          onSuccess={() => {
            setRefreshKey(k => k + 1)
          }}
        />
      )}
    </section>
  )
}

export default MyCoursesPage

