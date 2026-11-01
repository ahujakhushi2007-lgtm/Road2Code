import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  Bot,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Copy,
  Download,
  Flame,
  FolderGit2,
  HelpCircle,
  Lightbulb,
  Lock,
  MapPin,
  MessageSquare,
  Newspaper,
  Radio,
  RotateCcw,
  Send,
  Sparkles,
  StickyNote,
  Terminal,
  Unlock,
  User,
  Video,
} from 'lucide-react'
import ProgressBar from './ProgressBar'
import ResourceCard from './ResourceCard'
import StepArticles from './StepArticles'
import StepNotes from './StepNotes'
import TrackIcon from './TrackIcon'
import CheckoutModal from './CheckoutModal'
import CodePlayground from './CodePlayground'
import RoadyAiAssistant from './RoadyAiAssistant'
import StopCommunityForum from './StopCommunityForum'
import StopProjectSubmission from './StopProjectSubmission'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useNotes } from '../hooks/useNotes'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { projectSuggestions } from '../data/projectSuggestions'
import { COURSE_PRICE_INR, formatRemainingDemo, getEnrollment, startDemo } from '../services/enrollmentService'
import { getProjectIdeas } from '../services/mentorService'
import { getTodaySession } from '../data/liveSessions'
import { getCourseNotes } from '../data/courseNotes'
import { issueCertificateIfEligible } from '../services/certificateService'
import { getStudentStreak } from '../services/streakService'
import { liveDoubtsKey, safeRead, safeWrite } from '../utils/storage'

// Splits text into lowercase words: "Node.js Basics" -> ["node.js", "basics"]
const toWords = (text) => text.toLowerCase().split(/[^a-z0-9+#.]+/).filter(Boolean)

// Splits a topic into its parts: "HTML, CSS & JavaScript" -> ["HTML", "CSS", "JavaScript"]
const toParts = (topic) => topic.split(/\s+or\s+|[&,/()]/).map(part => part.trim()).filter(Boolean)

// A stop counts as known when one of its parts starts with a skill the user picked.
function knowsTopic(topic, skills) {
  const parts = toParts(topic).map(toWords)
  return skills.some(skill => {
    const skillWords = toWords(skill)
    return parts.some(part => skillWords.every((word, i) => part[i] === word))
  })
}

function Roadmap({ goal, roadmap, storageKey, notesStorageKey, isGuest, knownSkills, onStartOver }) {
  const { currentUser, openAuth } = useAuth()
  const showToast = useToast()

  // Track enrollment status
  const [enrollment, setEnrollment] = useState(() =>
    currentUser ? getEnrollment(currentUser.email, goal.key) : { status: 'none', remainingMs: 0 }
  )
  const [showCheckout, setShowCheckout] = useState(false)
  const [isBookingMentor, setIsBookingMentor] = useState(false)

  // Streak & XP
  const streakData = getStudentStreak(currentUser?.email)

  // Ids of completed steps, e.g. [1, 3]
  const [completed, setCompleted] = useLocalStorage(storageKey, () =>
    roadmap.steps.filter(step => knowsTopic(step.topic, knownSkills)).map(step => step.id)
  )
  const { notesFor, addNote, updateNote, deleteNote } = useNotes(notesStorageKey)
  const [openPanel, setOpenPanel] = useState(null) // e.g. "notes-3", "study-3", "roady-3", "code-3"

  // Live doubt session state
  const todaySession = getTodaySession(goal.key)
  const [doubtText, setDoubtText] = useState('')
  const [doubtsList, setDoubtsList] = useState(() => safeRead(liveDoubtsKey(goal.key), []))

  // Mentor project ideas for this track
  const mentorIdeas = getProjectIdeas(goal.key)

  const isMentor = currentUser?.role === 'mentor'
  const isPaid = isMentor || enrollment.status === 'paid'
  const isDemo = enrollment.status === 'demo'
  const isDemoExpired = enrollment.status === 'demo_expired'

  const nextStop = roadmap.steps.find(step => !completed.includes(step.id))
  const isAllCompleted = completed.length === roadmap.steps.length

  // Check or issue certificate if paid and finished
  const certificate = isPaid && isAllCompleted && currentUser
    ? issueCertificateIfEligible(currentUser.email, currentUser.name, goal.key)
    : null

  const refreshEnrollment = () => {
    if (currentUser) {
      setEnrollment(getEnrollment(currentUser.email, goal.key))
    }
  }

  const handleStartDemo = () => {
    if (!currentUser) {
      openAuth('login')
      showToast('Please log in to start your free 3-day demo')
      return
    }
    const result = startDemo(currentUser.email, goal.key)
    if (result.ok) {
      refreshEnrollment()
      showToast('3-day demo activated! Stops 1 and 2 unlocked.')
    } else {
      showToast(result.error, 'error')
    }
  }

  const toggleComplete = (step, index) => {
    // If not paid and beyond first 2 stops, restrict action
    if (!isPaid && index >= 2) {
      showToast(`Stops 3–8 are locked in demo. Buy course for ₹${COURSE_PRICE_INR} to unlock.`, 'error')
      setShowCheckout(true)
      return
    }

    if (completed.includes(step.id)) {
      setCompleted(completed.filter(id => id !== step.id))
      showToast(`Reopened ${step.topic}`)
    } else {
      setCompleted([...completed, step.id])
      showToast(`Marked ${step.topic} as done (+50 XP!)`)
    }
  }

  const togglePanel = (panel) => setOpenPanel(current => (current === panel ? null : panel))

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      showToast('Link copied')
    } catch {
      showToast("Couldn't copy the link. Copy it from the address bar instead.", 'error')
    }
  }

  const handleAskDoubt = (e) => {
    e.preventDefault()
    if (!doubtText.trim()) return

    const newDoubt = {
      id: Date.now(),
      text: doubtText.trim(),
      askedBy: currentUser ? currentUser.name : 'Guest student',
      createdAt: Date.now(),
    }
    const updated = [newDoubt, ...doubtsList]
    setDoubtsList(updated)
    safeWrite(liveDoubtsKey(goal.key), updated)
    setDoubtText('')
    showToast('Your doubt has been submitted for today’s live session.')
  }

  const handleDownloadNotes = () => {
    if (!isPaid) {
      showToast(`Study notes download is for paid students. Buy for ₹${COURSE_PRICE_INR} to download.`, 'error')
      setShowCheckout(true)
      return
    }

    const lines = [
      `# ${goal.label} Course Notes — Road2Code`,
      `Price: ₹${COURSE_PRICE_INR} (Paid Access)`,
      `Student: ${currentUser?.name || 'Enrolled Student'}`,
      `Downloaded on: ${new Date().toLocaleDateString('en-IN')}`,
      `================================================================`,
      '',
    ]

    roadmap.steps.forEach((step, idx) => {
      const notes = getCourseNotes(goal.key, step.id, step.topic)
      lines.push(`## Stop ${idx + 1}: ${step.topic}`)
      lines.push(`Summary: ${notes.summary}`)
      lines.push('')
      lines.push(`### In-Depth Sections`)
      notes.sections.forEach(sec => {
        lines.push(`#### ${sec.heading}`)
        lines.push(sec.content)
        lines.push('')
      })
      lines.push(`### Key Points to Remember`)
      notes.keyPoints.forEach(pt => lines.push(`* ${pt}`))
      lines.push('')
      lines.push(`### Revision Checklist`)
      notes.reviseChecklist.forEach(item => lines.push(`[ ] ${item}`))
      lines.push('')
      lines.push(`----------------------------------------------------------------`)
      lines.push('')
    })

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${goal.key}-course-notes.md`
    anchor.click()
    URL.revokeObjectURL(url)
    showToast('Course notes downloaded as Markdown.')
  }

  const handleBook1on1 = () => {
    if (!currentUser) {
      openAuth('login')
      showToast('Please log in to book a 1-on-1 mentor session.')
      return
    }
    setIsBookingMentor(true)
    setTimeout(() => {
      setIsBookingMentor(false)
      showToast('1-on-1 mentor booking confirmed! Calendar invite sent for Thursday, 6:00 PM IST.')
    }, 1200)
  }

  return (
    <article className="roadmap" style={{ '--track': goal.color }}>
      {/* Roadmap Header */}
      <header className="roadmap__head">
        <div className="roadmap__title">
          <span className="track-chip track-chip--lg"><TrackIcon trackKey={goal.key} size={22} /></span>
          <div>
            <div className="roadmap__title-row">
              <h1>{roadmap.title} route</h1>
              <span className="course-price-badge">₹{COURSE_PRICE_INR}</span>
              {currentUser && (
                <span className="streak-pill" title="Daily consistent streak">
                  <Flame size={14} className="icon-fire" aria-hidden="true" />
                  <span>{streakData.streak} days</span>
                </span>
              )}
            </div>
            <p>
              {isGuest
                ? `Guest preview: Stops 1 & 2 open. Start free 3-day demo or buy for ₹${COURSE_PRICE_INR}.`
                : isPaid
                ? 'Enrolled & Paid • Full lifetime access with mentor support, AI tutor, and certificate.'
                : isDemo
                ? `Demo active • ${formatRemainingDemo(enrollment.remainingMs)}`
                : isDemoExpired
                ? `Demo ended • Unlock all 8 stops for ₹${COURSE_PRICE_INR}`
                : `Previewing route • Start 3-day demo or buy for ₹${COURSE_PRICE_INR}`}
            </p>
          </div>
        </div>

        <div className="roadmap__actions">
          {currentUser && (
            <Link to="/portfolio" className="btn btn--sm">
              <User size={15} aria-hidden="true" /> My Portfolio
            </Link>
          )}
          <button className="btn btn--sm" onClick={copyLink}>
            <Copy size={15} aria-hidden="true" /> Copy link
          </button>
          <button className="btn btn--sm" onClick={handleDownloadNotes}>
            <Download size={15} aria-hidden="true" /> Download notes
          </button>
          <button className="btn btn--sm" onClick={onStartOver}>
            <RotateCcw size={15} aria-hidden="true" /> Start over
          </button>
        </div>

        <ProgressBar
          completed={completed.length}
          total={roadmap.steps.length}
          color={goal.color}
          filled={roadmap.steps.map(step => completed.includes(step.id))}
        />
      </header>

      {/* 1-on-1 Mentor Deep Dive Upsell Banner */}
      <div className="mentor-upsell-strip">
        <div className="mentor-upsell-content">
          <Calendar size={18} className="icon-gold" aria-hidden="true" />
          <span>
            <strong>1-on-1 Mentor Audit (₹299):</strong> Need a private 30-min code architecture review or resume critique with your lead mentor?
          </span>
        </div>
        <button
          type="button"
          className="btn btn--sm"
          onClick={handleBook1on1}
          disabled={isBookingMentor}
        >
          {isBookingMentor ? 'Booking Slot...' : 'Book 1-on-1 Session (₹299)'}
        </button>
      </div>

      {/* Enrollment Status Banners */}
      {!isPaid && !isDemoExpired && (
        <div className="enrollment-banner">
          <div className="enrollment-banner__content">
            <div className="enrollment-banner__icon">
              {isDemo ? <Clock size={20} /> : <Sparkles size={20} />}
            </div>
            <div>
              <h3>
                {isDemo
                  ? `⚡ Demo Active: ${formatRemainingDemo(enrollment.remainingMs)}`
                  : `Try this course with a free 3-day demo`}
              </h3>
              <p>
                {isDemo
                  ? `Stops 1 & 2 are unlocked. Upgrade to Paid (₹${COURSE_PRICE_INR}) for all 8 stops, study notes, live mentor sessions, certificate, and job opportunities.`
                  : `Experience the first 2 stops, live doubt sessions, code sandboxes, and study note previews. No credit card required.`}
              </p>
            </div>
          </div>
          <div className="enrollment-banner__actions">
            {!isDemo && !enrollment.demoStartedAt && (
              <button className="btn btn--sm" onClick={handleStartDemo}>
                Start 3-day demo
              </button>
            )}
            <button className="btn btn--primary btn--sm" onClick={() => setShowCheckout(true)}>
              Buy course ₹{COURSE_PRICE_INR}
            </button>
          </div>
        </div>
      )}

      {/* Certificate Celebration Banner if Paid & Completed */}
      {isPaid && isAllCompleted && certificate && (
        <aside className="certificate-banner" aria-label="Course completed celebration">
          <div className="certificate-banner__icon" aria-hidden="true">
            <Award size={28} />
          </div>
          <div className="certificate-banner__body">
            <h3>Course completed! Congratulations!</h3>
            <p>You have finished every stop of {goal.label}. Your verified completion certificate is ready.</p>
          </div>
          <Link to={`/certificate/${certificate.certId}`} className="btn btn--primary btn--sm">
            View Certificate
          </Link>
        </aside>
      )}

      {/* Demo Expired Full Lock Screen */}
      {isDemoExpired ? (
        <section className="demo-expired-screen" aria-labelledby="expired-heading">
          <div className="demo-expired-card">
            <div className="demo-expired-icon" aria-hidden="true">
              <Lock size={32} />
            </div>
            <h2 id="expired-heading">Your 3-day demo has ended</h2>
            <p className="demo-expired-lede">
              We hope you enjoyed the first 2 stops! Your ticks ({completed.length}/{roadmap.steps.length} stops)
              and notes have been safely preserved in your browser.
            </p>

            <div className="demo-expired-perks">
              <h3>Unlock full access for just ₹{COURSE_PRICE_INR}:</h3>
              <ul>
                <li><CheckCircle size={16} /> All 8 ordered stops unlocked immediately</li>
                <li><CheckCircle size={16} /> Complete structured study notes for every module</li>
                <li><CheckCircle size={16} /> Daily live mentor doubt sessions with real-time Q&A</li>
                <li><CheckCircle size={16} /> Verified Certificate of Completion with unique ID</li>
                <li><CheckCircle size={16} /> Eligibility for curated partner job offers and interviews</li>
              </ul>
            </div>

            <button
              className="btn btn--primary btn--lg btn--block"
              onClick={() => setShowCheckout(true)}
            >
              Buy this course for ₹{COURSE_PRICE_INR}
            </button>
            <p className="demo-expired-subnote">One-time payment • Lifetime access • Simulated demo checkout</p>
          </div>
        </section>
      ) : (
        <>
          {/* Today's Doubt Session Card */}
          <aside className="live-session-card" aria-label="Today's live doubt session">
            <div className="live-session-card__head">
              <div className="live-session-badge">
                <Radio size={14} className="live-pulse" aria-hidden="true" />
                <span>Daily Doubt Session</span>
              </div>
              <span className="live-time">{todaySession.timeString}</span>
            </div>

            <div className="live-session-card__body">
              <div>
                <h3>{todaySession.topic}</h3>
                <p className="live-mentor">Mentor: <strong>{todaySession.mentorName}</strong> ({todaySession.mentorTitle})</p>
              </div>

              <div className="live-session-card__actions">
                <a
                  href={todaySession.joinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary btn--sm"
                >
                  <Video size={15} aria-hidden="true" /> Join session
                </a>
              </div>
            </div>

            {/* Ask Doubt in Advance Form */}
            <form onSubmit={handleAskDoubt} className="live-doubt-form">
              <input
                type="text"
                value={doubtText}
                onChange={(e) => setDoubtText(e.target.value)}
                placeholder="Ask a question in advance for today's session..."
                aria-label="Ask a doubt in advance"
              />
              <button type="submit" className="btn btn--sm" disabled={!doubtText.trim()}>
                <Send size={14} aria-hidden="true" /> Ask mentor
              </button>
            </form>

            {doubtsList.length > 0 && (
              <div className="live-doubts-list">
                <span className="live-doubts-title">Questions lined up for today ({doubtsList.length}):</span>
                <ul>
                  {doubtsList.slice(0, 3).map(d => (
                    <li key={d.id}>“{d.text}” — <small>{d.askedBy}</small></li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {/* Ideas from your Mentor Section */}
          {mentorIdeas.length > 0 && (
            <section className="mentor-ideas-section" aria-labelledby="mentor-ideas-title">
              <div className="mentor-ideas-head">
                <Lightbulb size={20} className="icon-gold" aria-hidden="true" />
                <div>
                  <h2 id="mentor-ideas-title">Ideas from your mentor</h2>
                  <p>Practical portfolio projects recommended by industry mentors for this track.</p>
                </div>
              </div>

              <div className="mentor-ideas-grid">
                {mentorIdeas.map(idea => (
                  <article key={idea.id} className="mentor-idea-card">
                    <div className="mentor-idea-card__head">
                      <h3>{idea.title}</h3>
                      <span className={`difficulty-tag difficulty-${idea.difficulty.toLowerCase()}`}>
                        {idea.difficulty}
                      </span>
                    </div>
                    <p className="mentor-idea-card__desc">{idea.description}</p>
                    <p className="mentor-idea-card__author">Recommended by <strong>{idea.mentorName}</strong></p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Ordered Roadmap Stations */}
          <ol className="stations">
            {roadmap.steps.map((step, index) => {
              const isDone = completed.includes(step.id)
              const isKnown = knowsTopic(step.topic, knownSkills)
              const isNext = nextStop?.id === step.id
              const ideas = projectSuggestions[step.topic]
              const notes = notesFor(step.id)
              const studyNotes = getCourseNotes(goal.key, step.id, step.topic)

              // Access rules: first 2 stops always accessible; stop 3+ requires paid
              const isStopLocked = !isPaid && index >= 2

              const notesPanel = `notes-${step.id}`
              const studyPanel = `study-${step.id}`
              const articlesPanel = `articles-${step.id}`
              const roadyPanel = `roady-${step.id}`
              const codePanel = `code-${step.id}`
              const submitPanel = `submit-${step.id}`
              const forumPanel = `forum-${step.id}`

              return (
                <li
                  key={step.id}
                  className={`station ${isDone ? 'is-done' : ''} ${isNext ? 'is-next' : ''} ${isStopLocked ? 'is-locked' : ''}`}
                >
                  <button
                    className={`station__marker ${isStopLocked ? 'station__marker--locked' : ''}`}
                    onClick={() => toggleComplete(step, index)}
                    aria-pressed={isDone}
                    aria-label={
                      isStopLocked
                        ? `Stop ${index + 1} is locked. Unlock for ₹${COURSE_PRICE_INR}`
                        : isDone
                        ? `Mark ${step.topic} as not done`
                        : `Mark ${step.topic} as done`
                    }
                  >
                    {isStopLocked ? <Lock size={15} /> : isDone ? <Check size={16} strokeWidth={3} /> : index + 1}
                  </button>

                  <div className="station__body">
                    <div className="station__head">
                      <h2>{step.topic}</h2>
                      {isNext && (
                        <span className="badge badge--here">
                          <MapPin size={13} aria-hidden="true" /> You are here
                        </span>
                      )}
                      {isKnown && <span className="badge">You know this</span>}
                      {isStopLocked && (
                        <span className="badge badge--locked">
                          <Lock size={12} aria-hidden="true" /> Locked (Requires Paid)
                        </span>
                      )}
                    </div>

                    {/* If stop is locked in demo mode, show unlock prompt card */}
                    {isStopLocked ? (
                      <div className="stop-locked-callout">
                        <p>
                          This stop is part of the full curriculum. Unlock all {roadmap.steps.length} stops,
                          full study notes, verified certificate, code sandboxes, and mentor support.
                        </p>
                        <button
                          className="btn btn--primary btn--sm"
                          onClick={() => setShowCheckout(true)}
                        >
                          <Unlock size={14} aria-hidden="true" /> Unlock for ₹{COURSE_PRICE_INR}
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="station__resources">
                          {step.resources.map(resource => (
                            <ResourceCard key={resource.url} resource={resource} />
                          ))}
                        </div>

                        {ideas && (
                          <div className="station__ideas">
                            <h3>Practice projects</h3>
                            <ul>
                              {ideas.map(idea => <li key={idea}>{idea}</li>)}
                            </ul>
                          </div>
                        )}

                        <div className="station__tools">
                          <button
                            className={`tool-btn ${openPanel === studyPanel ? 'is-open' : ''}`}
                            onClick={() => togglePanel(studyPanel)}
                            aria-expanded={openPanel === studyPanel}
                          >
                            <Sparkles size={15} aria-hidden="true" /> Study Notes
                          </button>
                          <button
                            className={`tool-btn ${openPanel === codePanel ? 'is-open' : ''}`}
                            onClick={() => togglePanel(codePanel)}
                            aria-expanded={openPanel === codePanel}
                          >
                            <Terminal size={15} aria-hidden="true" /> Sandbox
                          </button>
                          <button
                            className={`tool-btn ${openPanel === roadyPanel ? 'is-open' : ''}`}
                            onClick={() => togglePanel(roadyPanel)}
                            aria-expanded={openPanel === roadyPanel}
                          >
                            <Bot size={15} aria-hidden="true" /> Roady AI
                          </button>
                          <button
                            className={`tool-btn ${openPanel === submitPanel ? 'is-open' : ''}`}
                            onClick={() => togglePanel(submitPanel)}
                            aria-expanded={openPanel === submitPanel}
                          >
                            <FolderGit2 size={15} aria-hidden="true" /> Submit Project
                          </button>
                          <button
                            className={`tool-btn ${openPanel === forumPanel ? 'is-open' : ''}`}
                            onClick={() => togglePanel(forumPanel)}
                            aria-expanded={openPanel === forumPanel}
                          >
                            <MessageSquare size={15} aria-hidden="true" /> Q&A Forum
                          </button>
                          <button
                            className={`tool-btn ${openPanel === notesPanel ? 'is-open' : ''}`}
                            onClick={() => togglePanel(notesPanel)}
                            aria-expanded={openPanel === notesPanel}
                          >
                            <StickyNote size={15} aria-hidden="true" /> My Notes
                            {notes.length > 0 && <span className="tool-btn__count">{notes.length}</span>}
                          </button>
                          <button
                            className={`tool-btn ${openPanel === articlesPanel ? 'is-open' : ''}`}
                            onClick={() => togglePanel(articlesPanel)}
                            aria-expanded={openPanel === articlesPanel}
                          >
                            <Newspaper size={15} aria-hidden="true" /> Articles
                          </button>
                        </div>

                        {/* Interactive Code Playground Panel */}
                        {openPanel === codePanel && (
                          <CodePlayground initialTopic={step.topic} />
                        )}

                        {/* 24/7 Roady AI Assistant Panel */}
                        {openPanel === roadyPanel && (
                          <RoadyAiAssistant stopTopic={step.topic} />
                        )}

                        {/* Project Submission for Mentor Review Panel */}
                        {openPanel === submitPanel && (
                          <StopProjectSubmission
                            trackKey={goal.key}
                            stepId={step.id}
                            stepTopic={step.topic}
                          />
                        )}

                        {/* Community Discussion Forum Panel */}
                        {openPanel === forumPanel && (
                          <StopCommunityForum
                            trackKey={goal.key}
                            stepId={step.id}
                            stepTopic={step.topic}
                          />
                        )}

                        {/* Structured Study Notes Panel */}
                        {openPanel === studyPanel && (
                          <div className="study-notes-panel" role="region" aria-label={`Study notes for ${step.topic}`}>
                            <div className="study-notes-panel__head">
                              <h4>Study Guide: {step.topic}</h4>
                              <p className="study-notes-summary">{studyNotes.summary}</p>
                            </div>

                            <div className="study-notes-sections">
                              {studyNotes.sections.map((section, sIdx) => (
                                <div key={sIdx} className="study-notes-section">
                                  <h5>{section.heading}</h5>
                                  <p>{section.content}</p>
                                </div>
                              ))}
                            </div>

                            <div className="study-notes-points">
                              <h5>Key Points to Remember:</h5>
                              <ul>
                                {studyNotes.keyPoints.map((pt, pIdx) => (
                                  <li key={pIdx}>{pt}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="study-notes-checklist">
                              <h5><HelpCircle size={15} /> Revision Checklist:</h5>
                              <ul>
                                {studyNotes.reviseChecklist.map((check, cIdx) => (
                                  <li key={cIdx}>
                                    <label className="checkbox-item">
                                      <input type="checkbox" />
                                      <span>{check}</span>
                                    </label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {openPanel === notesPanel && (
                          <StepNotes
                            notes={notes}
                            onAdd={(text) => addNote(step.id, text)}
                            onUpdate={(noteId, text) => updateNote(step.id, noteId, text)}
                            onDelete={(noteId) => deleteNote(step.id, noteId)}
                          />
                        )}
                        {openPanel === articlesPanel && <StepArticles tag={step.tag} />}
                      </>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </>
      )}

      {/* Mock Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          trackKey={goal.key}
          trackTitle={goal.label}
          trackColor={goal.color}
          studentEmail={currentUser ? currentUser.email : 'guest@road2code.dev'}
          onClose={() => setShowCheckout(false)}
          onSuccess={(paidEnrollment) => {
            setEnrollment(paidEnrollment)
            refreshEnrollment()
          }}
        />
      )}
    </article>
  )
}

export default Roadmap
