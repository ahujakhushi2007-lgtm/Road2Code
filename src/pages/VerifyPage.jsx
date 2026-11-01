import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Award, CheckCircle2, Search, ShieldAlert, ShieldCheck } from 'lucide-react'
import { getCertificateById } from '../services/certificateService'

function VerifyPage() {
  const { certId } = useParams()
  const navigate = useNavigate()
  const [queryId, setQueryId] = useState(certId || '')

  const certificate = getCertificateById(certId)

  const handleSearch = (e) => {
    e.preventDefault()
    if (queryId.trim()) {
      navigate(`/verify/${queryId.trim().toUpperCase()}`)
    }
  }

  return (
    <section className="page page--narrow">
      <header className="page-head">
        <div className="verify-badge-tag">
          <ShieldCheck size={16} aria-hidden="true" />
          <span>Public Credential Verification</span>
        </div>
        <h1>Certificate Verification</h1>
        <p>Verify authentic, tamper-evident certificates issued by Road2Code.</p>
      </header>

      {/* Verification Lookup Form */}
      <form onSubmit={handleSearch} className="verify-lookup-form">
        <div className="verify-search-input-wrap">
          <Search size={18} aria-hidden="true" />
          <input
            type="text"
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
            placeholder="Enter Certificate ID (e.g. R2C-FRONTEND-2026-AB7X9Q)"
            aria-label="Certificate ID"
            required
          />
          <button type="submit" className="btn btn--primary">
            Verify ID
          </button>
        </div>
      </form>

      {certificate ? (
        <article className="verify-result-card verify-result-card--valid">
          <div className="verify-result-card__banner">
            <CheckCircle2 size={24} aria-hidden="true" />
            <div>
              <h2>Valid Credential Confirmed</h2>
              <p>This certificate was officially issued and recorded in the Road2Code registry.</p>
            </div>
          </div>

          <dl className="verify-details-list">
            <div>
              <dt>Recipient Name</dt>
              <dd><strong>{certificate.studentName}</strong></dd>
            </div>
            <div>
              <dt>Course Track</dt>
              <dd><strong>{certificate.trackTitle}</strong></dd>
            </div>
            <div>
              <dt>Certificate ID</dt>
              <dd><code>{certificate.certId}</code></dd>
            </div>
            <div>
              <dt>Date of Issue</dt>
              <dd>{certificate.issuedDateString}</dd>
            </div>
            <div>
              <dt>Lead Mentor</dt>
              <dd>{certificate.mentorName} ({certificate.mentorTitle})</dd>
            </div>
            <div>
              <dt>Curriculum Scope</dt>
              <dd>Full mastery of all {certificate.totalStops} modules and practical milestones</dd>
            </div>
          </dl>

          <div className="verify-result-actions">
            <Link to={`/certificate/${certificate.certId}`} className="btn btn--primary">
              <Award size={16} aria-hidden="true" />
              <span>View Full Certificate</span>
            </Link>
          </div>
        </article>
      ) : certId ? (
        <article className="verify-result-card verify-result-card--invalid">
          <div className="verify-result-card__banner">
            <ShieldAlert size={24} aria-hidden="true" />
            <div>
              <h2>Certificate ID Not Found</h2>
              <p>No credential matching <code>{certId}</code> was found in our verification registry.</p>
            </div>
          </div>
          <p className="verify-invalid-note">
            Please double-check the certificate ID string or contact the student for the exact URL.
          </p>
        </article>
      ) : null}
    </section>
  )
}

export default VerifyPage
