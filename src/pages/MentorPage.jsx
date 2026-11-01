import { useState } from 'react'
import {
  CheckCircle2,
  Edit2,
  ExternalLink,
  FolderGit2,
  Info,
  Lightbulb,
  MessageSquare,
  Send,
  Sparkles,
  Star,
  ThumbsUp,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import TrackIcon from '../components/TrackIcon'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { roadmaps } from '../data/roadmaps'
import { mentorService } from '../services/mentorService'
import { jobService } from '../services/jobService'
import { getAllSubmissions, reviewProject } from '../services/projectSubmissionService'

function MentorPage() {
  const { currentUser } = useAuth()
  const showToast = useToast()

  const [activeTab, setActiveTab] = useState('students') // 'students' | 'ideas' | 'submissions'
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [feedbackText, setFeedbackText] = useState('')

  // Project review inputs per submission: { [subId]: { rating: 5, review: '' } }
  const [reviewInputs, setReviewInputs] = useState({})

  // Project idea form state
  const [editingIdeaId, setEditingIdeaId] = useState(null)
  const [ideaTrack, setIdeaTrack] = useState(currentUser?.tracks?.[0] || 'frontend')
  const [ideaTitle, setIdeaTitle] = useState('')
  const [ideaDesc, setIdeaDesc] = useState('')
  const [ideaDifficulty, setIdeaDifficulty] = useState('Intermediate')
  const [formError, setFormError] = useState('')

  const [, setRefresh] = useState(0)
  const triggerRefresh = () => setRefresh(r => r + 1)

  if (!currentUser || currentUser.role !== 'mentor') {
    return null
  }

  const assignedTracks = currentUser.tracks || []
  const enrolledStudents = mentorService.getStudentsForMentor(currentUser.email)
  const allIdeas = mentorService.getProjectIdeas()
  const myIdeas = allIdeas.filter(i => i.mentorEmail === currentUser.email)

  // Submissions filtered to tracks this mentor handles
  const allSubmissions = getAllSubmissions()
  const mentorTrackSubmissions = allSubmissions.filter(s => assignedTracks.includes(s.trackKey))

  const handleRecommendToggle = (student) => {
    const newState = !student.isRecommended
    mentorService.recommendStudentForInterview(student.studentEmail, student.trackKey, newState)
    showToast(
      newState
        ? `${student.studentName} is now recommended for job interviews!`
        : `Removed interview recommendation for ${student.studentName}.`
    )
    triggerRefresh()
    if (selectedStudent) {
      setSelectedStudent({ ...selectedStudent, isRecommended: newState })
    }
  }

  const handleAddFeedback = (e) => {
    e.preventDefault()
    if (!feedbackText.trim() || !selectedStudent) return

    mentorService.addStudentFeedback(
      selectedStudent.studentEmail,
      selectedStudent.trackKey,
      currentUser.email,
      feedbackText
    )
    setFeedbackText('')
    showToast('Feedback note added for student.')
    triggerRefresh()
    const updatedFeedback = mentorService.getStudentFeedback(
      selectedStudent.studentEmail,
      selectedStudent.trackKey
    )
    setSelectedStudent({ ...selectedStudent, feedbacks: updatedFeedback })
  }

  const handleSaveIdea = (e) => {
    e.preventDefault()
    if (!ideaTitle.trim()) {
      setFormError('Please enter a project title.')
      return
    }
    if (!ideaDesc.trim()) {
      setFormError('Please provide a description.')
      return
    }

    if (editingIdeaId) {
      mentorService.updateProjectIdea(editingIdeaId, {
        track: ideaTrack,
        title: ideaTitle,
        description: ideaDesc,
        difficulty: ideaDifficulty,
      })
      showToast('Project idea updated!')
      setEditingIdeaId(null)
    } else {
      mentorService.addProjectIdea(currentUser.email, currentUser.name, {
        track: ideaTrack,
        title: ideaTitle,
        description: ideaDesc,
        difficulty: ideaDifficulty,
      })
      showToast('New project idea posted to student roadmap!')
    }

    setIdeaTitle('')
    setIdeaDesc('')
    setFormError('')
    triggerRefresh()
  }

  const handleStartEditIdea = (idea) => {
    setEditingIdeaId(idea.id)
    setIdeaTrack(idea.track)
    setIdeaTitle(idea.title)
    setIdeaDesc(idea.description)
    setIdeaDifficulty(idea.difficulty)
    setActiveTab('ideas')
  }

  const handleDeleteIdea = (ideaId) => {
    mentorService.deleteProjectIdea(ideaId)
    showToast('Project idea deleted.')
    if (editingIdeaId === ideaId) {
      setEditingIdeaId(null)
      setIdeaTitle('')
      setIdeaDesc('')
    }
    triggerRefresh()
  }

  const handleReviewSubmission = (subId) => {
    const input = reviewInputs[subId] || { rating: 5, review: 'Great code hygiene and clean component architecture.' }
    const res = reviewProject(subId, {
      rating: input.rating || 5,
      mentorReview: input.review || 'Approved code review with high standards.',
      mentorName: currentUser.name,
    })
    if (res.ok) {
      showToast('Project code review submitted and student profile updated!')
      triggerRefresh()
    }
  }

  return (
    <section className="page">
      <header className="page-head page-head--wide">
        <div className="mentor-chip-badge">
          <Sparkles size={16} aria-hidden="true" />
          <span>Mentor Portal: {currentUser.speciality}</span>
        </div>
        <h1>Welcome, {currentUser.name}</h1>
        <p>
          Oversee student progress, evaluate project code submissions, recommend candidates for partner
          job opportunities, and post curated project challenges.
        </p>

        {/* Assigned Tracks List */}
        <div className="mentor-assigned-tracks">
          <span>Your Assigned Tracks:</span>
          {assignedTracks.map(t => (
            <span key={t} className="track-badge-tag">{t}</span>
          ))}
        </div>
      </header>

      {/* Visible Dev Note */}
      <aside className="dev-notice-banner" role="note">
        <Info size={18} aria-hidden="true" />
        <div>
          <strong>Browser-Only Demo Environment:</strong>
          <span>
            {' '}Since localStorage is isolated per-browser, this dashboard displays students stored in this browser
            (including sample demonstration students). The service interface is built with backend-ready contracts
            for production Firebase/Supabase database swap.
          </span>
        </div>
      </aside>

      {/* Tabs */}
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Mentor views">
          <button
            className={`chip ${activeTab === 'students' ? 'is-on' : ''}`}
            aria-pressed={activeTab === 'students'}
            onClick={() => setActiveTab('students')}
          >
            <Users size={15} aria-hidden="true" />
            <span>Enrolled Students ({enrolledStudents.length})</span>
          </button>
          <button
            className={`chip ${activeTab === 'submissions' ? 'is-on' : ''}`}
            aria-pressed={activeTab === 'submissions'}
            onClick={() => setActiveTab('submissions')}
          >
            <FolderGit2 size={15} aria-hidden="true" />
            <span>Project Code Reviews ({mentorTrackSubmissions.length})</span>
          </button>
          <button
            className={`chip ${activeTab === 'ideas' ? 'is-on' : ''}`}
            aria-pressed={activeTab === 'ideas'}
            onClick={() => setActiveTab('ideas')}
          >
            <Lightbulb size={15} aria-hidden="true" />
            <span>My Project Ideas ({myIdeas.length})</span>
          </button>
        </div>
      </div>

      {/* Students View */}
      {activeTab === 'students' && (
        <div className="mentor-students-view">
          {enrolledStudents.length === 0 ? (
            <div className="empty-state">
              <Users size={36} aria-hidden="true" />
              <h3>No enrolled students yet</h3>
              <p>When students start a demo or enroll in your assigned tracks, they will appear here.</p>
            </div>
          ) : (
            <ul className="board">
              {enrolledStudents.map(student => {
                const jobStatus = jobService.getStudentTrackJobStatus(student.studentEmail, student.trackKey)
                return (
                  <li
                    key={`${student.studentEmail}-${student.trackKey}`}
                    className="board__row board__row--spacious"
                    style={{ '--track': student.trackColor }}
                  >
                    <span className="track-chip"><TrackIcon trackKey={student.trackKey} /></span>

                    <div className="board__name">
                      <div className="board__title-row">
                        <h2>{student.studentName}</h2>
                        <span className={`badge badge--${student.status}`}>
                          {student.status === 'paid' ? 'Paid Course' : student.status === 'demo' ? '3-Day Demo' : 'Expired Demo'}
                        </span>
                        {student.isRecommended && (
                          <span className="badge badge--recommended">
                            <ThumbsUp size={12} aria-hidden="true" /> Recommended for Job
                          </span>
                        )}
                      </div>
                      <p>
                        Track: <strong>{student.trackTitle}</strong> • {student.notesCount} note{student.notesCount === 1 ? '' : 's'} written
                      </p>
                      <small className="student-active-meta">
                        Job status: {jobStatus.label}
                      </small>
                    </div>

                    <div className="board__progress-col">
                      <ProgressBar
                        completed={student.stopsDone}
                        total={student.totalStops}
                        color={student.trackColor}
                        filled={Array.from({ length: student.totalStops }, (_, i) => i < student.stopsDone)}
                      />
                      <span className="board__progress-text">
                        {student.stopsDone} of {student.totalStops} stops completed
                      </span>
                    </div>

                    <div className="board__actions-col">
                      <button
                        className="btn btn--sm btn--primary"
                        onClick={() => setSelectedStudent(student)}
                      >
                        Inspect Student
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}

      {/* Submissions Review View */}
      {activeTab === 'submissions' && (
        <div className="mentor-submissions-view">
          <div className="section-title-wrap">
            <h2>Student Code Submissions for Verification</h2>
            <p>Review candidate GitHub repositories and live deployments to award official star ratings.</p>
          </div>

          <div className="mentor-submissions-grid">
            {mentorTrackSubmissions.map(sub => (
              <article key={sub.id} className="mentor-sub-review-card">
                <div className="mentor-sub-head">
                  <div>
                    <span className="track-badge-tag">{sub.trackKey}</span>
                    <h3>{sub.title}</h3>
                    <p className="student-author-line">
                      Submitted by <strong>{sub.studentName}</strong> ({sub.studentEmail})
                    </p>
                  </div>
                  {sub.rating ? (
                    <span className="rating-badge">
                      <Star size={14} className="icon-gold" aria-hidden="true" />
                      <span>{sub.rating} / 5 Stars Approved</span>
                    </span>
                  ) : (
                    <span className="badge badge--pending">Needs Review</span>
                  )}
                </div>

                <div className="mentor-sub-links">
                  <a href={sub.githubUrl} target="_blank" rel="noreferrer" className="btn btn--sm">
                    Inspect GitHub Repo <ExternalLink size={13} aria-hidden="true" />
                  </a>
                  {sub.liveDemoUrl && (
                    <a href={sub.liveDemoUrl} target="_blank" rel="noreferrer" className="btn btn--sm">
                      Inspect Live App <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  )}
                </div>

                {/* Rating & Review Form */}
                <div className="sub-review-input-box">
                  <div className="checkout-form-split">
                    <label className="select field">
                      <span>Rating (1-5 Stars)</span>
                      <select
                        value={reviewInputs[sub.id]?.rating || sub.rating || 5}
                        onChange={(e) => setReviewInputs({
                          ...reviewInputs,
                          [sub.id]: { ...(reviewInputs[sub.id] || {}), rating: Number(e.target.value) },
                        })}
                      >
                        <option value={5}>5 Stars - Outstanding</option>
                        <option value={4}>4 Stars - Solid Engineering</option>
                        <option value={3}>3 Stars - Needs Polish</option>
                        <option value={2}>2 Stars - Missing Requirements</option>
                      </select>
                    </label>
                  </div>

                  <label className="field">
                    <span>Mentor Code Review Comments</span>
                    <input
                      type="text"
                      placeholder="e.g. Clean async state handling, modular components. Ready for interviews."
                      value={reviewInputs[sub.id]?.review ?? sub.mentorReview ?? ''}
                      onChange={(e) => setReviewInputs({
                        ...reviewInputs,
                        [sub.id]: { ...(reviewInputs[sub.id] || {}), review: e.target.value },
                      })}
                    />
                  </label>

                  <button
                    type="button"
                    className="btn btn--sm btn--primary"
                    onClick={() => handleReviewSubmission(sub.id)}
                  >
                    Submit Official Review
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Project Ideas View */}
      {activeTab === 'ideas' && (
        <div className="mentor-ideas-management">
          {/* Post/Edit Form */}
          <section className="mentor-form-card" aria-labelledby="form-idea-heading">
            <h2 id="form-idea-heading">{editingIdeaId ? 'Edit Project Idea' : 'Post a New Project Idea'}</h2>
            <p className="mentor-form-sub">
              Your recommended projects appear in the student roadmap under "Ideas from your mentor".
            </p>

            <form onSubmit={handleSaveIdea} className="auth-form">
              <div className="checkout-form-split">
                <label className="select field">
                  <span>Track</span>
                  <select
                    value={ideaTrack}
                    onChange={(e) => setIdeaTrack(e.target.value)}
                  >
                    {assignedTracks.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>

                <label className="select field">
                  <span>Difficulty Level</span>
                  <select
                    value={ideaDifficulty}
                    onChange={(e) => setIdeaDifficulty(e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </label>
              </div>

              <label className="field">
                <span>Project Title</span>
                <input
                  type="text"
                  value={ideaTitle}
                  onChange={(e) => setIdeaTitle(e.target.value)}
                  placeholder="e.g. Distributed Rate Limiter with Redis"
                  required
                />
              </label>

              <label className="field">
                <span>Project Description & Specifications</span>
                <textarea
                  rows={3}
                  value={ideaDesc}
                  onChange={(e) => setIdeaDesc(e.target.value)}
                  placeholder="Describe the expected architecture, key features, and what the student will learn..."
                  required
                />
              </label>

              {formError && <p className="field-error" role="alert">{formError}</p>}

              <div className="form-action-row">
                <button type="submit" className="btn btn--primary">
                  {editingIdeaId ? 'Update Project Idea' : 'Post Project Idea'}
                </button>
                {editingIdeaId && (
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setEditingIdeaId(null)
                      setIdeaTitle('')
                      setIdeaDesc('')
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* List of Mentor's Ideas */}
          <section className="mentor-posted-ideas" aria-labelledby="my-ideas-heading">
            <h2 id="my-ideas-heading">My Active Project Ideas ({myIdeas.length})</h2>
            <div className="mentor-ideas-grid">
              {myIdeas.map(idea => (
                <article key={idea.id} className="mentor-idea-card">
                  <div className="mentor-idea-card__head">
                    <span className="track-badge-tag">{idea.track}</span>
                    <span className={`difficulty-tag difficulty-${idea.difficulty.toLowerCase()}`}>
                      {idea.difficulty}
                    </span>
                  </div>
                  <h3>{idea.title}</h3>
                  <p className="mentor-idea-card__desc">{idea.description}</p>
                  <div className="mentor-idea-card__actions">
                    <button
                      className="btn btn--sm"
                      onClick={() => handleStartEditIdea(idea)}
                      aria-label={`Edit ${idea.title}`}
                    >
                      <Edit2 size={13} aria-hidden="true" /> Edit
                    </button>
                    <button
                      className="btn btn--sm btn--danger-outline"
                      onClick={() => handleDeleteIdea(idea.id)}
                      aria-label={`Delete ${idea.title}`}
                    >
                      <Trash2 size={13} aria-hidden="true" /> Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedStudent(null) }}>
          <div className="modal modal--wide" role="dialog" aria-modal="true" aria-labelledby="student-detail-title">
            <button
              className="icon-btn modal__close"
              onClick={() => setSelectedStudent(null)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="student-modal-head">
              <span className="avatar avatar--lg">{selectedStudent.studentName.charAt(0)}</span>
              <div>
                <h2 id="student-detail-title">{selectedStudent.studentName}</h2>
                <p className="student-modal-email">{selectedStudent.studentEmail}</p>
                <div className="student-modal-tags">
                  <span className="track-badge-tag">{selectedStudent.trackTitle}</span>
                  <span className={`badge badge--${selectedStudent.status}`}>
                    {selectedStudent.status === 'paid' ? 'Paid Course' : '3-Day Demo'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="student-modal-actions-bar">
              <button
                className={`btn ${selectedStudent.isRecommended ? 'btn--recommended-active' : 'btn--primary'}`}
                onClick={() => handleRecommendToggle(selectedStudent)}
              >
                <ThumbsUp size={16} aria-hidden="true" />
                <span>
                  {selectedStudent.isRecommended
                    ? 'Recommended for Interview (Click to Revoke)'
                    : 'Recommend for Interview'}
                </span>
              </button>
            </div>

            {/* Per-Stop Progress Breakdown */}
            <div className="student-modal-stops-section">
              <h3>Per-Stop Completion</h3>
              <p className="student-modal-sub">
                Stops completed: {selectedStudent.stopsDone} of {selectedStudent.totalStops}
              </p>
              <ol className="student-stop-breakdown-list">
                {roadmaps[selectedStudent.trackKey]?.steps?.map((step, idx) => {
                  const isDone = (selectedStudent.completedSteps || []).includes(step.id) || idx < selectedStudent.stopsDone
                  return (
                    <li key={step.id} className={`student-stop-item ${isDone ? 'is-done' : ''}`}>
                      <span className="student-stop-badge">
                        {isDone ? <CheckCircle2 size={16} /> : idx + 1}
                      </span>
                      <span className="student-stop-topic">{step.topic}</span>
                      <span className="student-stop-status">{isDone ? 'Completed' : 'Pending'}</span>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* Feedback Notes Section */}
            <div className="student-modal-feedback-section">
              <h3><MessageSquare size={16} /> Mentor Feedback & Notes</h3>
              <form onSubmit={handleAddFeedback} className="feedback-add-form">
                <input
                  type="text"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Leave actionable feedback, code review comments or interview tips..."
                  aria-label="Add feedback note"
                />
                <button type="submit" className="btn btn--sm btn--primary" disabled={!feedbackText.trim()}>
                  <Send size={14} aria-hidden="true" /> Add Note
                </button>
              </form>

              <div className="student-feedbacks-list">
                {(!selectedStudent.feedbacks || selectedStudent.feedbacks.length === 0) ? (
                  <p className="panel-empty">No feedback notes recorded yet for this student.</p>
                ) : (
                  <ul>
                    {selectedStudent.feedbacks.map(fb => (
                      <li key={fb.id} className="feedback-item">
                        <p>{fb.text}</p>
                        <small>{fb.mentorName} • {new Date(fb.createdAt).toLocaleDateString('en-IN')}</small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default MentorPage
