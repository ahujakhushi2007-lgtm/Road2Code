import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  DollarSign,
  Info,
  MapPin,
  XCircle,
} from 'lucide-react'
import TrackIcon from '../components/TrackIcon'
import { goals } from '../data/goals'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import {
  acceptInterviewSlot,
  checkEligibility,
  formatRemainingOfferTime,
  getStudentOffers,
} from '../services/jobService'
import { COURSE_PRICE_INR } from '../services/enrollmentService'

function JobsPage() {
  const { currentUser } = useAuth()
  const showToast = useToast()
  const [selectedTrack, setSelectedTrack] = useState(goals[0].key)
  const [selectedSlots, setSelectedSlots] = useState({})
  const [, setRefreshKey] = useState(0)

  if (!currentUser) return null

  const eligibility = checkEligibility(currentUser.email, selectedTrack)
  const currentGoal = goals.find(g => g.key === selectedTrack) || goals[0]
  const offers = getStudentOffers(currentUser.email)
  const trackOffers = offers.filter(o => o.track === selectedTrack)


  const handleAcceptSlot = (jobId) => {
    const slot = selectedSlots[jobId]
    if (!slot) {
      showToast('Please pick an interview slot before confirming.', 'error')
      return
    }

    const result = acceptInterviewSlot(currentUser.email, jobId, slot)
    if (result.ok) {
      showToast(`Interview confirmed! Scheduled for: ${slot}`)
      setRefreshKey(k => k + 1)
    } else {
      showToast(result.error, 'error')
    }
  }

  return (
    <section className="page">
      <header className="page-head page-head--wide">
        <div className="jobs-header-badge">
          <Briefcase size={16} aria-hidden="true" />
          <span>Hiring Partners Demo Network</span>
        </div>
        <h1>Job Opportunities</h1>
        <p>
          Fast-track interview pipelines for certified Road2Code graduates. Complete your track,
          earn your mentor's recommendation, and book exclusive interview slots with hiring partners.
        </p>
      </header>

      {/* Demo Disclaimer Note */}
      <aside className="dev-notice-banner dev-notice-banner--accent" role="note">
        <Info size={18} aria-hidden="true" />
        <div>
          <strong>Simulated Demo Environment:</strong>
          <span>
            {' '}All company names, compensation packages (LPA), and interview bookings are purely fictional
            demonstration fixtures. No real employment contracts are offered.
          </span>
        </div>
      </aside>

      {/* Track Selector Bar */}
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Select track to check eligibility">
          {goals.map(g => {
            const trackElig = checkEligibility(currentUser.email, g.key)
            return (
              <button
                key={g.key}
                className={`chip ${selectedTrack === g.key ? 'is-on' : ''}`}
                aria-pressed={selectedTrack === g.key}
                onClick={() => setSelectedTrack(g.key)}
              >
                <span>{g.short}</span>
                {trackElig.isEligible && (
                  <span className="chip__indicator" title="Eligible for jobs" aria-label="Eligible">●</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Eligibility Checklist Card */}
      <article className="eligibility-card" style={{ '--track': currentGoal.color }}>
        <div className="eligibility-card__head">
          <span className="track-chip"><TrackIcon trackKey={currentGoal.key} /></span>
          <div>
            <h2>{currentGoal.label} Interview Eligibility</h2>
            <p>
              {eligibility.isEligible
                ? 'Congratulations! You meet all criteria and are actively receiving interview offers.'
                : 'Here is what you need to complete to unlock partner job offers for this track:'}
            </p>
          </div>
          <span className={`badge ${eligibility.isEligible ? 'badge--ok' : 'badge--pending'}`}>
            {eligibility.isEligible ? 'Eligible for Offers' : 'Requirements Pending'}
          </span>
        </div>

        <ul className="eligibility-checklist">
          {eligibility.checks.map(item => (
            <li key={item.id} className={`checklist-item ${item.passed ? 'is-passed' : 'is-missing'}`}>
              <span className="checklist-item__icon" aria-hidden="true">
                {item.passed ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              </span>
              <div className="checklist-item__body">
                <strong>{item.label}</strong>
                <span>{item.hint}</span>
              </div>
              {!item.passed && item.id === 'paid' && (
                <Link to={`/roadmap/${currentGoal.key}`} className="btn btn--sm btn--primary">
                  Enroll ₹{COURSE_PRICE_INR}
                </Link>
              )}
              {!item.passed && item.id === 'completed' && (
                <Link to={`/roadmap/${currentGoal.key}`} className="btn btn--sm">
                  Finish Stops
                </Link>
              )}
              {!item.passed && item.id === 'recommended' && (
                <span className="checklist-subtext">Attend live sessions & submit doubts</span>
              )}
            </li>
          ))}
        </ul>
      </article>

      {/* Job Offers Section */}
      <section className="jobs-offers-section" aria-labelledby="jobs-heading">
        <div className="jobs-offers-head">
          <h2 id="jobs-heading">Available Job Offers ({trackOffers.length})</h2>
          <p>Verified interview slots directly open to eligible {currentGoal.label} students.</p>
        </div>

        {trackOffers.length === 0 ? (
          <div className="empty-state">
            <Compass size={40} aria-hidden="true" />
            <h3>No active job offers for this track</h3>
            <p>
              {eligibility.isEligible
                ? 'Offers are periodically matched. Check back after your next live mentor review.'
                : 'Complete the 3 eligibility milestones above to receive direct hiring interview invites.'}
            </p>
            <Link to={`/roadmap/${currentGoal.key}`} className="btn btn--primary">
              Open Roadmap
            </Link>
          </div>
        ) : (
          <div className="jobs-list">
            {trackOffers.map(job => {
              const isAccepted = job.status === 'interview_accepted'
              const isExpired = job.status === 'expired'
              const isOffered = job.status === 'offered'

              return (
                <article key={job.id} className="job-card">
                  <div className="job-card__head">
                    <div>
                      <div className="job-card__company-row">
                        <span className="job-company">{job.company}</span>
                        <span className="badge badge--salary">
                          <DollarSign size={13} aria-hidden="true" /> {job.packageRange}
                        </span>
                      </div>
                      <h3 className="job-role">{job.role}</h3>
                      <div className="job-meta-row">
                        <span className="job-meta-item">
                          <MapPin size={14} aria-hidden="true" /> {job.location}
                        </span>
                        <span className="job-meta-item">
                          <Briefcase size={14} aria-hidden="true" /> {currentGoal.label}
                        </span>
                      </div>
                    </div>

                    <div className="job-status-col">
                      {isOffered && (
                        <div className="job-countdown-box">
                          <Clock size={14} aria-hidden="true" />
                          <span>{formatRemainingOfferTime(job.remainingMs)}</span>
                        </div>
                      )}
                      {isAccepted && (
                        <span className="badge badge--ok">
                          <CheckCircle2 size={13} aria-hidden="true" /> Interview Booked
                        </span>
                      )}
                      {isExpired && (
                        <span className="badge badge--danger">
                          <AlertTriangle size={13} aria-hidden="true" /> Offer Expired
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="job-desc">{job.description}</p>

                  <div className="job-skills-chips">
                    {job.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>

                  {/* Slot Booking Area */}
                  {isOffered && (
                    <div className="job-booking-box">
                      <h4><Calendar size={15} /> Select an Interview Slot:</h4>
                      <div className="job-slots-grid">
                        {job.slots.map(slot => (
                          <label key={slot} className="slot-option">
                            <input
                              type="radio"
                              name={`slot-${job.id}`}
                              value={slot}
                              checked={selectedSlots[job.id] === slot}
                              onChange={() => setSelectedSlots({ ...selectedSlots, [job.id]: slot })}
                            />
                            <span>{slot}</span>
                          </label>
                        ))}
                      </div>

                      <button
                        className="btn btn--primary"
                        onClick={() => handleAcceptSlot(job.id)}
                        disabled={!selectedSlots[job.id]}
                      >
                        Confirm & Accept Interview
                      </button>
                    </div>
                  )}

                  {isAccepted && job.application && (
                    <div className="job-confirmed-box">
                      <CheckCircle2 size={18} className="icon-green" aria-hidden="true" />
                      <div>
                        <strong>Interview Confirmed:</strong>
                        <p>{job.application.slot} • Simulated Google Meet invitation sent to your email.</p>
                      </div>
                    </div>
                  )}

                  {isExpired && (
                    <div className="job-expired-box">
                      <AlertTriangle size={16} aria-hidden="true" />
                      <span>This offer’s 48-hour response deadline has passed. Stay active for new postings!</span>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </section>
    </section>
  )
}

export default JobsPage
