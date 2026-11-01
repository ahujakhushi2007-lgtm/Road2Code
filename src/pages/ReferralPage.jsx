import {
  Copy,
  Gift,
  Share2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { getStudentReferralData } from '../services/referralService'

function ReferralPage() {
  const { currentUser } = useAuth()
  const showToast = useToast()

  const referralData = getStudentReferralData(currentUser?.email, currentUser?.name)
  const shareUrl = `${window.location.origin}/courses?ref=${referralData.code}`

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralData.code)
      showToast(`Referral code ${referralData.code} copied!`)
    } catch {
      showToast('Copy code directly: ' + referralData.code)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      showToast('Referral link copied to clipboard!')
    } catch {
      showToast('Copy URL from address bar.')
    }
  }

  return (
    <section className="page page--narrow">
      <header className="page-head">
        <div className="referral-badge-tag">
          <Gift size={16} aria-hidden="true" />
          <span>Student Affiliate Program</span>
        </div>
        <h1>Refer & Earn</h1>
        <p>
          Give friends ₹50 off their course enrollment and earn ₹100 cash reward for every friend
          who joins Road2Code.
        </p>
      </header>

      {/* Rewards Overview */}
      <dl className="stats">
        <div><dt>Friends Invited</dt><dd>{referralData.invitesCount}</dd></div>
        <div><dt>Total Rewards Earned</dt><dd>₹{referralData.earnings}</dd></div>
        <div><dt>Friend Discount</dt><dd>₹50 OFF</dd></div>
      </dl>

      <article className="referral-box-card">
        <div className="referral-box-head">
          <Share2 size={24} className="icon-gold" aria-hidden="true" />
          <div>
            <h2>Your Unique Referral Code</h2>
            <p>Share this code or link with your college peers and coding groups.</p>
          </div>
        </div>

        <div className="referral-code-display">
          <span className="referral-code-pill">{referralData.code}</span>
          <div className="referral-actions-group">
            <button type="button" className="btn btn--primary" onClick={handleCopyCode}>
              <Copy size={15} aria-hidden="true" /> Copy Code
            </button>
            <button type="button" className="btn" onClick={handleCopyLink}>
              Copy Share Link
            </button>
          </div>
        </div>
      </article>

      <section className="referral-steps-section" aria-labelledby="how-refer-heading">
        <h2 id="how-refer-heading">How the Affiliate Program Works</h2>
        <ol className="how__steps">
          <li className="how__step">
            <span className="how__num">1</span>
            <h3>Share your code</h3>
            <p>Send your code or link to classmates, coding communities, and college WhatsApp groups.</p>
          </li>
          <li className="how__step">
            <span className="how__num">2</span>
            <h3>Friend gets ₹50 off</h3>
            <p>Your friend applies the code at checkout and enrolls for ₹449 instead of ₹499.</p>
          </li>
          <li className="how__step">
            <span className="how__num">3</span>
            <h3>You get ₹100 reward</h3>
            <p>Earn ₹100 directly credited to your student wallet for every verified enrollment.</p>
          </li>
        </ol>
      </section>
    </section>
  )
}

export default ReferralPage
