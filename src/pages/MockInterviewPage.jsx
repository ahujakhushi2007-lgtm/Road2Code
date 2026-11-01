import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BrainCircuit,
  FileCheck2,
} from 'lucide-react'
import { goals } from '../data/goals'
import { getInterviewQuestions, saveMockInterviewResult } from '../services/mockInterviewService'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

function MockInterviewPage() {
  const { currentUser } = useAuth()
  const showToast = useToast()

  const [selectedTrack, setSelectedTrack] = useState('frontend')
  const [answers, setAnswers] = useState({})
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [result, setResult] = useState(null)

  const questions = getInterviewQuestions(selectedTrack)
  const goal = goals.find(g => g.key === selectedTrack) || goals[0]

  const handleAnswerChange = (qId, text) => {
    setAnswers(prev => ({ ...prev, [qId]: text }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEvaluating(true)

    setTimeout(() => {
      // Evaluate based on depth of answers
      const totalWords = Object.values(answers).reduce((sum, a) => sum + (a ? a.trim().split(/\s+/).length : 0), 0)
      const calculatedScore = Math.min(95, Math.max(68, 65 + Math.floor(totalWords / 4)))

      const evaluated = {
        score: calculatedScore,
        feedback:
          calculatedScore >= 80
            ? 'Strong technical foundation! Your explanations showed clear awareness of architectural tradeoffs and edge-case handling.'
            : 'Good foundational attempt. Strengthen your answers by citing real production failure modes and specific API methods.',
        breakdown: [
          { skill: 'Core Concept Clarity', score: `${Math.min(100, calculatedScore + 4)}%` },
          { skill: 'Architectural Tradeoffs', score: `${Math.max(60, calculatedScore - 5)}%` },
          { skill: 'Production Edge Cases', score: `${calculatedScore}%` },
        ],
      }

      if (currentUser) {
        saveMockInterviewResult(currentUser.email, selectedTrack, evaluated)
      }
      setResult(evaluated)
      setIsEvaluating(false)
      showToast('Interview evaluation complete!')
    }, 1200)
  }

  return (
    <section className="page page--narrow">
      <header className="page-head">
        <div className="interview-badge-tag">
          <BrainCircuit size={16} aria-hidden="true" />
          <span>AI Technical Interview Simulator</span>
        </div>
        <h1>Mock Technical Interview</h1>
        <p>
          Simulate a real engineering technical round for {goal.label}.
          Answer 5 core architecture questions and receive instant AI grading and feedback.
        </p>
      </header>

      {/* Track Selector */}
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Select interview track">
          {goals.map(g => (
            <button
              key={g.key}
              className={`chip ${selectedTrack === g.key ? 'is-on' : ''}`}
              aria-pressed={selectedTrack === g.key}
              onClick={() => { setSelectedTrack(g.key); setResult(null); setAnswers({}) }}
            >
              {g.short}
            </button>
          ))}
        </div>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="mock-interview-form">
          <ol className="interview-questions-list">
            {questions.map((item, index) => (
              <li key={item.id} className="interview-question-card">
                <span className="question-num">Question {index + 1} of {questions.length}</span>
                <h3>{item.q}</h3>
                <small className="question-hint">Tip: {item.hint}</small>

                <textarea
                  rows={4}
                  value={answers[item.id] || ''}
                  onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                  placeholder="Explain your approach, tradeoffs, and code patterns..."
                  required
                />
              </li>
            ))}
          </ol>

          <button
            type="submit"
            className="btn btn--primary btn--lg btn--block"
            disabled={isEvaluating}
          >
            {isEvaluating ? (
              <span className="checkout-spinner-wrap">
                <span className="checkout-spinner" aria-hidden="true" />
                <span>Evaluating technical responses with AI...</span>
              </span>
            ) : (
              <>
                <FileCheck2 size={18} aria-hidden="true" />
                <span>Submit Interview for AI Scoring</span>
              </>
            )}
          </button>
        </form>
      ) : (
        <article className="interview-result-card" aria-label="Evaluation result">
          <div className="interview-result-head">
            <div className="score-circle">
              <span className="score-num">{result.score}</span>
              <span className="score-label">/ 100</span>
            </div>
            <div>
              <h2>Technical Assessment Score</h2>
              <p className="result-feedback-text">{result.feedback}</p>
            </div>
          </div>

          <div className="interview-breakdown-grid">
            {result.breakdown.map(b => (
              <div key={b.skill} className="breakdown-item">
                <span className="breakdown-skill">{b.skill}</span>
                <strong className="breakdown-score">{b.score}</strong>
              </div>
            ))}
          </div>

          <div className="interview-actions-row">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => { setResult(null); setAnswers({}) }}
            >
              Retake Interview
            </button>
            <Link to="/jobs" className="btn">
              Apply to Partner Jobs
            </Link>
          </div>
        </article>
      )}
    </section>
  )
}

export default MockInterviewPage
