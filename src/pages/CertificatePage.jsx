import { useParams, Link } from 'react-router-dom'
import { Award, Copy, Download, ExternalLink, ShieldCheck } from 'lucide-react'
import BrandMark from '../components/BrandMark'
import { getCertificateById } from '../services/certificateService'
import { useToast } from '../context/ToastContext'

function CertificatePage() {
  const { certId } = useParams()
  const showToast = useToast()

  const certificate = getCertificateById(certId)

  if (!certificate) {
    return (
      <section className="page page--narrow">
        <div className="empty-state">
          <Award size={48} aria-hidden="true" />
          <h1>Certificate Not Found</h1>
          <p>The certificate with ID <code>{certId}</code> could not be found or has not been issued yet.</p>
          <Link to="/courses" className="btn btn--primary">Browse Courses</Link>
        </div>
      </section>
    )
  }

  const verifyUrl = `${window.location.origin}/verify/${certificate.certId}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(verifyUrl)
      showToast('Public verification link copied to clipboard!')
    } catch {
      showToast('Unable to copy automatically. Copy from address bar.', 'error')
    }
  }

  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <section className="page page--certificate">
      {/* Action Toolbar */}
      <div className="certificate-actions-bar no-print">
        <div className="certificate-meta-text">
          <span>Certificate ID: <strong>{certificate.certId}</strong></span>
          <span className="badge badge--ok">Verified & Issued</span>
        </div>
        <div className="certificate-buttons">
          <button className="btn btn--primary" onClick={handleDownloadPDF}>
            <Download size={16} aria-hidden="true" />
            <span>Download PDF / Print</span>
          </button>
          <button className="btn" onClick={handleCopyLink}>
            <Copy size={16} aria-hidden="true" />
            <span>Copy Verify Link</span>
          </button>
          <Link to={`/verify/${certificate.certId}`} className="btn">
            <ExternalLink size={16} aria-hidden="true" />
            <span>Check Verify Page</span>
          </Link>
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div className="certificate-container certificate-print-area" style={{ '--track': certificate.trackColor }}>
        <div className="certificate-border">
          <div className="certificate-inner">
            {/* Certificate Header */}
            <header className="certificate-header">
              <div className="certificate-brand">
                <BrandMark size={36} />
                <div className="certificate-brand-text">
                  <span className="cert-brand-name">Road2Code</span>
                  <span className="cert-brand-sub">Platform for Engineering Excellence</span>
                </div>
              </div>
              <div className="certificate-badge-seal">
                <ShieldCheck size={28} aria-hidden="true" />
                <span>Verified Credential</span>
              </div>
            </header>

            {/* Certificate Body */}
            <div className="certificate-body">
              <p className="cert-pretitle">Certificate of Completion</p>
              <h1 className="cert-subtitle">This is to proudly certify that</h1>

              <div className="cert-recipient-name">
                {certificate.studentName}
              </div>

              <p className="cert-declaration">
                has successfully completed all modules, practical engineering assessments, and roadmap stops of the
              </p>

              <h2 className="cert-course-title">
                {certificate.trackTitle} Route
              </h2>

              <p className="cert-stats-line">
                Demonstrating applied mastery of all {certificate.totalStops} foundational & advanced topics in this curriculum.
              </p>
            </div>

            {/* Certificate Footer */}
            <footer className="certificate-footer">
              <div className="cert-signature-block">
                <div className="cert-signature-line" />
                <strong>{certificate.mentorName}</strong>
                <span>Lead Course Mentor • {certificate.mentorTitle}</span>
              </div>

              <div className="cert-seal-center">
                <div className="cert-gold-seal">
                  <Award size={32} />
                  <span>HONOR ROLL</span>
                </div>
                <span className="cert-id-stamp">{certificate.certId}</span>
              </div>

              <div className="cert-date-block">
                <div className="cert-signature-line" />
                <strong>{certificate.issuedDateString}</strong>
                <span>Date of Issuance • Road2Code Academy</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CertificatePage
