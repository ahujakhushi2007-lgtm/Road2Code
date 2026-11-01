import { useState } from 'react'
import { ExternalLink, FolderGit2, Star, UploadCloud } from 'lucide-react'
import { getStudentSubmissions, submitProject } from '../services/projectSubmissionService'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

function StopProjectSubmission({ trackKey, stepId, stepTopic }) {
  const { currentUser, openAuth } = useAuth()
  const showToast = useToast()

  const [submissions, setSubmissions] = useState(() =>
    currentUser ? getStudentSubmissions(currentUser.email, trackKey).filter(s => s.stepId === stepId) : []
  )

  const [title, setTitle] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [liveDemoUrl, setLiveDemoUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentUser) {
      openAuth('login')
      showToast('Please log in to submit your project.')
      return
    }

    if (!githubUrl.includes('github.com')) {
      showToast('Please enter a valid GitHub repository URL.', 'error')
      return
    }

    const res = submitProject(currentUser.email, currentUser.name, {
      trackKey,
      stepId,
      title: title || `${stepTopic} Practice Milestone`,
      githubUrl,
      liveDemoUrl,
    })

    if (res.ok) {
      setSubmissions(getStudentSubmissions(currentUser.email, trackKey).filter(s => s.stepId === stepId))
      setTitle('')
      setGithubUrl('')
      setLiveDemoUrl('')
      showToast('Project submitted! Your mentor will review and rate it.')
    } else {
      showToast(res.error, 'error')
    }
  }

  return (
    <div className="stop-submission-panel" role="region" aria-label={`Project submission for ${stepTopic}`}>
      <div className="stop-submission-head">
        <h4><FolderGit2 size={16} /> Submit Your Project for Mentor Review</h4>
        <p>Submit your GitHub repository and live deployment to earn mentor ratings and placement recommendations.</p>
      </div>

      <form onSubmit={handleSubmit} className="stop-submission-form">
        <label className="field">
          <span>Project Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`e.g. ${stepTopic} Dashboard App`}
            required
          />
        </label>

        <div className="checkout-form-split">
          <label className="field">
            <span>GitHub Repository URL</span>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/your-username/repo"
              required
            />
          </label>
          <label className="field">
            <span>Live Demo URL (Optional)</span>
            <input
              type="url"
              value={liveDemoUrl}
              onChange={(e) => setLiveDemoUrl(e.target.value)}
              placeholder="https://my-project.vercel.app"
            />
          </label>
        </div>

        <button type="submit" className="btn btn--sm btn--primary">
          <UploadCloud size={14} aria-hidden="true" /> Submit for Review
        </button>
      </form>

      {submissions.length > 0 && (
        <div className="stop-submissions-history">
          <h5>Your Submitted Projects ({submissions.length})</h5>
          <div className="submission-cards-list">
            {submissions.map(sub => (
              <div key={sub.id} className="submitted-card">
                <div className="submitted-card__head">
                  <strong>{sub.title}</strong>
                  {sub.rating ? (
                    <span className="rating-badge">
                      <Star size={13} className="icon-gold" aria-hidden="true" />
                      <span>{sub.rating} / 5 Stars</span>
                    </span>
                  ) : (
                    <span className="badge badge--pending">Under Mentor Review</span>
                  )}
                </div>

                <div className="submitted-links-row">
                  <a href={sub.githubUrl} target="_blank" rel="noreferrer" className="text-link">
                    GitHub Code <ExternalLink size={12} aria-hidden="true" />
                  </a>
                  {sub.liveDemoUrl && (
                    <a href={sub.liveDemoUrl} target="_blank" rel="noreferrer" className="text-link">
                      Live App <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  )}
                </div>

                {sub.mentorReview && (
                  <div className="mentor-review-feedback-box">
                    <p>“{sub.mentorReview}”</p>
                    <small>— Reviewed by {sub.reviewedBy}</small>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default StopProjectSubmission

