import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import TrackIcon from '../components/TrackIcon'
import { goals } from '../data/goals'
import { quizQuestions } from '../data/quiz'

// Starting scoreboard: { frontend: 0, backend: 0, aiml: 0, ... }
function buildInitialScores() {
  const scores = {}
  goals.forEach(goal => { scores[goal.key] = 0 })
  return scores
}

// The three tracks with the most points. Sorting is stable, so ties keep the order from goals.js.
function topMatches(scores) {
  return [...goals].sort((a, b) => scores[b.key] - scores[a.key]).slice(0, 3)
}

function QuizPage({ onPickGoal }) {
  const navigate = useNavigate()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [scores, setScores] = useState(buildInitialScores)

  const total = quizQuestions.length
  const finished = questionIndex === total // derived from state, so it needs no state of its own

  const handleAnswer = (option) => {
    const nextScores = { ...scores }
    option.goals.forEach(key => { nextScores[key] += 1 })
    setScores(nextScores)
    setQuestionIndex(questionIndex + 1)
  }

  const handleRetake = () => {
    setQuestionIndex(0)
    setScores(buildInitialScores())
  }

  const handlePick = (goalKey) => {
    onPickGoal(goalKey)
    navigate('/generator')
  }

  if (finished) {
    const matches = topMatches(scores)
    const best = matches[0]

    return (
      <section className="page page--narrow">
        <header className="page-head">
          <h1>Your best match is {best.label}</h1>
          <p>{best.blurb}</p>
        </header>

        <ol className="matches">
          {matches.map((goal, index) => {
            const percent = Math.round((scores[goal.key] / total) * 100)
            return (
              <li key={goal.key} className="match" style={{ '--track': goal.color }}>
                <span className="track-chip"><TrackIcon trackKey={goal.key} /></span>
                <div className="match__body">
                  <div className="match__head">
                    <h2>{goal.label}</h2>
                    <span className="match__percent">{percent}% match</span>
                  </div>
                  <div className="match__bar" aria-hidden="true"><span style={{ width: `${percent}%` }} /></div>
                  <p>{goal.tagline}</p>
                </div>
                <button className={`btn btn--sm ${index === 0 ? 'btn--primary' : ''}`} onClick={() => handlePick(goal.key)}>
                  Plan this route
                </button>
              </li>
            )
          })}
        </ol>

        <button className="btn" onClick={handleRetake}>Retake the quiz</button>
      </section>
    )
  }

  const question = quizQuestions[questionIndex]

  return (
    <section className="page page--narrow">
      <header className="page-head">
        <h1>Find your track</h1>
        <p>Answer {total} quick questions and we'll show the three tracks that suit you best.</p>
      </header>

      <ProgressBar completed={questionIndex} total={total} unit="questions answered" />

      <div className="quiz-card">
        <p className="quiz-card__count">Question {questionIndex + 1} of {total}</p>
        <h2>{question.prompt}</h2>
        <div className="quiz-card__options">
          {question.options.map((option, index) => (
            <button key={option.text} className="option" onClick={() => handleAnswer(option)}>
              <span className="option__key">{String.fromCharCode(65 + index)}</span>
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuizPage
