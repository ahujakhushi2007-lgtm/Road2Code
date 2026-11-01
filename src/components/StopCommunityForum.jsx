import { useState } from 'react'
import { CheckCircle2, MessageSquare, Send, ThumbsUp } from 'lucide-react'
import { askQuestion, getForumThreads, upvoteQuestion } from '../services/forumService'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

function StopCommunityForum({ trackKey, stepId, stepTopic }) {
  const { currentUser, openAuth } = useAuth()
  const showToast = useToast()
  const [threads, setThreads] = useState(() => getForumThreads(trackKey, stepId))
  const [questionText, setQuestionText] = useState('')

  const handleAsk = (e) => {
    e.preventDefault()
    if (!questionText.trim()) return

    if (!currentUser) {
      openAuth('login')
      showToast('Please log in to participate in the community discussion.')
      return
    }

    const created = askQuestion(trackKey, stepId, currentUser.name, questionText)
    if (created) {
      setThreads(getForumThreads(trackKey, stepId))
      setQuestionText('')
      showToast('Discussion question posted!')
    }
  }

  const handleUpvote = (threadId) => {
    const updated = upvoteQuestion(trackKey, stepId, threadId)
    setThreads(updated)
    showToast('Upvoted!')
  }

  return (
    <div className="stop-forum-panel" role="region" aria-label={`Community discussion for ${stepTopic}`}>
      <div className="stop-forum-head">
        <h4><MessageSquare size={16} /> Community Discussions: {stepTopic}</h4>
        <p>Ask questions, review peer edge cases, and learn from mentor solutions.</p>
      </div>

      <form onSubmit={handleAsk} className="stop-forum-ask-form">
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Ask a community question about this stop..."
          aria-label="Ask a question"
        />
        <button type="submit" className="btn btn--sm btn--primary" disabled={!questionText.trim()}>
          <Send size={14} aria-hidden="true" /> Post Question
        </button>
      </form>

      <div className="stop-forum-threads-list">
        {threads.map(t => (
          <article key={t.id} className="forum-thread-card">
            <div className="forum-thread-head">
              <div className="forum-thread-author-wrap">
                <span className="avatar avatar--sm">{t.author.charAt(0)}</span>
                <div>
                  <strong>{t.author}</strong>
                  <span className="forum-thread-date">{new Date(t.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
              <button
                type="button"
                className="chip chip--sm forum-upvote-chip"
                onClick={() => handleUpvote(t.id)}
                title="Upvote helpful question"
              >
                <ThumbsUp size={13} aria-hidden="true" /> {t.upvotes}
              </button>
            </div>

            <p className="forum-question-text">{t.question}</p>

            {t.answer ? (
              <div className="forum-answer-box">
                <div className="forum-answer-author">
                  <CheckCircle2 size={15} className="icon-green" aria-hidden="true" />
                  <span>Verified Answer by <strong>{t.answeredBy}</strong></span>
                </div>
                <p className="forum-answer-text">{t.answer}</p>
              </div>
            ) : (
              <p className="forum-awaiting-answer">Awaiting instructor / peer response...</p>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

export default StopCommunityForum

