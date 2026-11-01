import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TrackIcon from '../components/TrackIcon'
import { goals, skillOptions } from '../data/goals'
import { COURSE_PRICE_INR } from '../services/enrollmentService'

function GeneratorPage({ pickedGoal, onGenerate }) {
  const navigate = useNavigate()
  const [goalKey, setGoalKey] = useState(pickedGoal) // starts with the track picked on Courses, Quiz or Search
  const [selected, setSelected] = useState([])

  const goal = goals.find(g => g.key === goalKey)

  // Adds the skill if it isn't selected yet, removes it if it is. Always returns a new array.
  const toggleSkill = (skill) => {
    setSelected(prev => (prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]))
  }

  const handleGenerate = () => {
    onGenerate(selected)
    navigate(`/roadmap/${goalKey}`)
  }

  return (
    <section className="page">
      <header className="page-head">
        <h1>Plan your route</h1>
        <p>
          Choose where you want to end up, then tick what you already know.
          Every course is ₹{COURSE_PRICE_INR} with a free 3-day demo included.
        </p>
      </header>

      <ol className="wizard">
        <li className="wizard__step">
          <h2><span className="wizard__num">1</span> Choose a track</h2>
          <div className="track-picker" role="radiogroup" aria-label="Track">
            {goals.map(g => (
              <button
                key={g.key}
                role="radio"
                aria-checked={goalKey === g.key}
                className={`track-option ${goalKey === g.key ? 'is-on' : ''}`}
                style={{ '--track': g.color }}
                onClick={() => setGoalKey(g.key)}
              >
                <span className="track-chip"><TrackIcon trackKey={g.key} /></span>
                <span className="track-option__text">
                  <strong>{g.label}</strong>
                  <span>{g.category} • ₹{COURSE_PRICE_INR}</span>
                </span>
              </button>
            ))}
          </div>
        </li>

        <li className="wizard__step">
          <h2>
            <span className="wizard__num">2</span> What do you already know?
            <span className="wizard__optional">Optional</span>
          </h2>
          <div className="chips">
            {skillOptions.map(skill => (
              <button
                key={skill}
                className={`chip ${selected.includes(skill) ? 'is-on' : ''}`}
                aria-pressed={selected.includes(skill)}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </li>
      </ol>

      <div className="generate-bar">
        <p>
          {goal ? (
            <>
              Route to <strong>{goal.label}</strong> (₹{COURSE_PRICE_INR} • 3-day free demo)
              {selected.length > 0 && `, with ${selected.length} skill${selected.length === 1 ? '' : 's'} you already know`}
            </>
          ) : (
            'Choose a track to continue.'
          )}
        </p>
        <button className="btn btn--primary btn--lg" onClick={handleGenerate} disabled={!goalKey}>
          Generate route
        </button>
      </div>
    </section>
  )
}

export default GeneratorPage
