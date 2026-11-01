import { useParams, Link } from 'react-router-dom'
import {
  Award,
  CheckCircle2,
  Copy,
  ExternalLink,
  Flame,
  FolderGit2,
  MapPin,
  ShieldCheck,
  Star,
  ThumbsUp,
  Zap,
} from 'lucide-react'
import TrackIcon from '../components/TrackIcon'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { getCertificatesForUser } from '../services/certificateService'
import { getStudentStreak } from '../services/streakService'
import { getAllSubmissions } from '../services/projectSubmissionService'
import { goals } from '../data/goals'
import { mentorService } from '../services/mentorService'
import { safeRead, progressKey } from '../utils/storage'

function PortfolioPage() {
  const { studentEmail: paramEmail } = useParams()
  const { currentUser } = useAuth()
  const showToast = useToast()

  // Determine email to view
  const targetEmail = (paramEmail || currentUser?.email || 'rohan.mehra@example.com').toLowerCase()
  const isOwner = currentUser && currentUser.email.toLowerCase() === targetEmail

  // Lookup user info
  const usersMap = safeRead('road2code_users', {})
  const targetUser = usersMap[targetEmail] || {
    name: targetEmail === 'rohan.mehra@example.com' ? 'Rohan Mehra' : targetEmail.split('@')[0],
    email: targetEmail,
  }

  const streakData = getStudentStreak(targetEmail)
  const certificates = getCertificatesForUser(targetEmail)
  const allSubs = getAllSubmissions()
  const studentSubs = allSubs.filter(s => s.studentEmail.toLowerCase() === targetEmail)

  // Completed tracks
  const completedTracks = goals.filter(g => {
    const raw = safeRead(progressKey(targetEmail, g.key), [])
    return Array.isArray(raw) && raw.length >= 8
  })

  // Mentor recommendations
  const recommendedTracks = goals.filter(g => mentorService.isStudentRecommended(targetEmail, g.key))

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      showToast('Portfolio link copied! Share this with recruiters.')
    } catch {
      showToast('Unable to copy automatically. Copy from address bar.', 'error')
    }
  }

  return (
    <section className="page page--portfolio">
      {/* Portfolio Header Card */}
      <header className="portfolio-header-card">
        <div className="portfolio-header-left">
          <span className="avatar avatar--xl">{targetUser.name.charAt(0)}</span>
          <div>
            <div className="portfolio-name-row">
              <h1>{targetUser.name}</h1>
              {recommendedTracks.length > 0 && (
                <span className="badge badge--recommended">
                  <ThumbsUp size={13} aria-hidden="true" /> Mentor Recommended
                </span>
              )}
            </div>
            <p className="portfolio-email">{targetUser.email}</p>
            <div className="portfolio-meta-tags">
              <span className="meta-tag"><MapPin size={13} /> India / Remote</span>
              <span className="meta-tag"><Flame size={13} className="icon-fire" /> {streakData.streak}-Day Streak</span>
              <span className="meta-tag"><Zap size={13} className="icon-gold" /> {streakData.xp} XP (Level {streakData.level})</span>
            </div>
          </div>
        </div>

        <div className="portfolio-header-actions">
          <button className="btn btn--primary" onClick={handleCopyLink}>
            <Copy size={15} aria-hidden="true" />
            <span>Copy Portfolio Link</span>
          </button>
          {isOwner && (
            <Link to="/resume" className="btn">
              Generate ATS Resume
            </Link>
          )}
        </div>
      </header>

      {/* Verified Credentials Showcase */}
      <section className="portfolio-section" aria-labelledby="creds-heading">
        <div className="portfolio-section-head">
          <Award size={22} className="icon-gold" aria-hidden="true" />
          <div>
            <h2 id="creds-heading">Verified Credentials & Certifications ({certificates.length})</h2>
            <p>Official course completion credentials issued and verified by Road2Code.</p>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="portfolio-empty-box">
            <p>No certificates completed yet.</p>
          </div>
        ) : (
          <div className="portfolio-certs-grid">
            {certificates.map(c => (
              <article key={c.certId} className="portfolio-cert-card" style={{ '--track': c.trackColor }}>
                <div className="portfolio-cert-card__head">
                  <span className="track-chip"><TrackIcon trackKey={c.trackKey} /></span>
                  <div>
                    <h3>{c.trackTitle} Professional Route</h3>
                    <span className="cert-id-tag">{c.certId}</span>
                  </div>
                </div>
                <div className="portfolio-cert-meta">
                  <span>Issued: {c.issuedDateString}</span>
                  <span>Mentor: {c.mentorName}</span>
                </div>
                <div className="portfolio-cert-actions">
                  <Link to={`/certificate/${c.certId}`} className="btn btn--sm">
                    View Certificate <ExternalLink size={12} aria-hidden="true" />
                  </Link>
                  <Link to={`/verify/${c.certId}`} className="btn btn--sm">
                    <ShieldCheck size={12} aria-hidden="true" /> Verify
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Proof of Work: Submitted Practice Projects */}
      <section className="portfolio-section" aria-labelledby="projects-heading">
        <div className="portfolio-section-head">
          <FolderGit2 size={22} aria-hidden="true" />
          <div>
            <h2 id="projects-heading">Proof-of-Work Projects ({studentSubs.length})</h2>
            <p>Hands-on engineering projects built and reviewed by industry mentors.</p>
          </div>
        </div>

        {studentSubs.length === 0 ? (
          <div className="portfolio-empty-box">
            <p>No projects submitted yet.</p>
          </div>
        ) : (
          <div className="portfolio-projects-grid">
            {studentSubs.map(sub => (
              <article key={sub.id} className="portfolio-project-card">
                <div className="portfolio-project-card__head">
                  <div>
                    <span className="track-badge-tag">{sub.trackKey}</span>
                    <h3>{sub.title}</h3>
                  </div>
                  {sub.rating && (
                    <span className="rating-badge">
                      <Star size={13} className="icon-gold" aria-hidden="true" />
                      <span>{sub.rating} / 5</span>
                    </span>
                  )}
                </div>

                <div className="portfolio-project-links">
                  <a href={sub.githubUrl} target="_blank" rel="noreferrer" className="text-link">
                    GitHub Repository <ExternalLink size={12} aria-hidden="true" />
                  </a>
                  {sub.liveDemoUrl && (
                    <a href={sub.liveDemoUrl} target="_blank" rel="noreferrer" className="text-link">
                      Live App <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  )}
                </div>

                {sub.mentorReview && (
                  <div className="mentor-review-feedback-box">
                    <p className="mentor-quote">“{sub.mentorReview}”</p>
                    <small>— {sub.reviewedBy || 'Lead Mentor'}</small>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Completed Tracks Overview */}
      <section className="portfolio-section" aria-labelledby="tracks-heading">
        <div className="portfolio-section-head">
          <CheckCircle2 size={22} className="icon-green" aria-hidden="true" />
          <div>
            <h2 id="tracks-heading">Curriculum Mastery</h2>
            <p>Full 8-stop learning routes completed by the candidate.</p>
          </div>
        </div>

        <div className="portfolio-tracks-list">
          {completedTracks.map(t => (
            <div key={t.key} className="portfolio-track-item" style={{ '--track': t.color }}>
              <span className="track-chip"><TrackIcon trackKey={t.key} /></span>
              <div>
                <strong>{t.label}</strong>
                <span>8 of 8 stops completed • Ready for Junior/Associate Roles</span>
              </div>
            </div>
          ))}
          {completedTracks.length === 0 && (
            <p className="portfolio-empty-note">Currently progressing through active stops.</p>
          )}
        </div>
      </section>
    </section>
  )
}

export default PortfolioPage
