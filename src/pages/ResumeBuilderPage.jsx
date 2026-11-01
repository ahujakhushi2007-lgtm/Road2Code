import { useState } from 'react'
import { Download, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getCertificatesForUser } from '../services/certificateService'
import { getAllSubmissions } from '../services/projectSubmissionService'

function ResumeBuilderPage() {
  const { currentUser } = useAuth()
  const studentEmail = currentUser?.email || 'rohan.mehra@example.com'
  const studentName = currentUser?.name || 'Rohan Mehra'

  const certificates = getCertificatesForUser(studentEmail)
  const allSubs = getAllSubmissions()
  const studentSubs = allSubs.filter(s => s.studentEmail.toLowerCase() === studentEmail.toLowerCase())

  // Customizable states
  const [phone, setPhone] = useState('+91 98765 43210')
  const [location, setLocation] = useState('Bengaluru, India')
  const [headline, setHeadline] = useState('Frontend & Full-Stack Software Engineer')
  const [summary, setSummary] = useState(
    'Motivated software engineer with proven mastery of modern component architecture, state management, and accessible UI engineering. Completed extensive industry curriculum on Road2Code with verified credentials.'
  )
  const [skills, setSkills] = useState('React, JavaScript, TypeScript, Next.js, HTML5, CSS3, Tailwind CSS, Git, REST APIs, Node.js')

  const handlePrint = () => {
    window.print()
  }

  return (
    <section className="page page--resume">
      <div className="resume-toolbar no-print">
        <div>
          <div className="resume-badge">
            <Sparkles size={15} aria-hidden="true" />
            <span>1-Click ATS Resume Builder</span>
          </div>
          <h1>Generate Your Professional Resume</h1>
          <p>Pre-populated with your verified Road2Code credentials, completed projects, and technical skills.</p>
        </div>
        <div className="resume-buttons">
          <button type="button" className="btn btn--primary" onClick={handlePrint}>
            <Download size={16} aria-hidden="true" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      <div className="resume-editor-grid no-print">
        <label className="field">
          <span>Professional Headline</span>
          <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} />
        </label>
        <div className="checkout-form-split">
          <label className="field">
            <span>Phone</span>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <label className="field">
            <span>Location</span>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </label>
        </div>
        <label className="field">
          <span>Professional Summary</span>
          <textarea rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} />
        </label>
        <label className="field">
          <span>Core Technical Skills (Comma-separated)</span>
          <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
        </label>
      </div>

      {/* Printable ATS Document */}
      <div className="resume-sheet resume-print-area">
        <header className="resume-sheet-header">
          <h2>{studentName}</h2>
          <p className="resume-headline">{headline}</p>
          <div className="resume-contact-row">
            <span>{studentEmail}</span>
            <span>•</span>
            <span>{phone}</span>
            <span>•</span>
            <span>{location}</span>
          </div>
        </header>

        <section className="resume-sheet-section">
          <h3>Professional Summary</h3>
          <p>{summary}</p>
        </section>

        <section className="resume-sheet-section">
          <h3>Technical Skills</h3>
          <p className="resume-skills-line">{skills}</p>
        </section>

        <section className="resume-sheet-section">
          <h3>Verified Credentials & Certifications</h3>
          <ul className="resume-items-list">
            {certificates.map(cert => (
              <li key={cert.certId} className="resume-item">
                <div className="resume-item-head">
                  <strong>{cert.trackTitle} Professional Route</strong>
                  <span>{cert.issuedDateString}</span>
                </div>
                <p className="resume-item-sub">
                  Road2Code Academy • Verified Credential ID: <code>{cert.certId}</code> • Mentor: {cert.mentorName}
                </p>
                <p className="resume-item-desc">
                  Mastered all {cert.totalStops} core engineering modules, passing rigorous hands-on assessments.
                </p>
              </li>
            ))}
            {certificates.length === 0 && (
              <li className="resume-item">
                <div className="resume-item-head">
                  <strong>Frontend Developer Route (In Progress)</strong>
                  <span>2026</span>
                </div>
                <p className="resume-item-sub">Road2Code Academy</p>
              </li>
            )}
          </ul>
        </section>

        <section className="resume-sheet-section">
          <h3>Engineering Projects</h3>
          <ul className="resume-items-list">
            {studentSubs.map(sub => (
              <li key={sub.id} className="resume-item">
                <div className="resume-item-head">
                  <strong>{sub.title}</strong>
                  <span>{new Date(sub.submittedAt).toLocaleDateString('en-IN')}</span>
                </div>
                <p className="resume-item-sub">
                  Code: {sub.githubUrl} {sub.liveDemoUrl && `• Live: ${sub.liveDemoUrl}`}
                </p>
                {sub.mentorReview && (
                  <p className="resume-item-desc">
                    Mentor Endorsement: “{sub.mentorReview}” — {sub.reviewedBy}
                  </p>
                )}
              </li>
            ))}
            {studentSubs.length === 0 && (
              <li className="resume-item">
                <div className="resume-item-head">
                  <strong>Interactive Web Platform Project</strong>
                  <span>Recent</span>
                </div>
                <p className="resume-item-desc">
                  Built accessible components using modern React patterns, responsive CSS Grid, and custom hooks.
                </p>
              </li>
            )}
          </ul>
        </section>
      </div>
    </section>
  )
}

export default ResumeBuilderPage
