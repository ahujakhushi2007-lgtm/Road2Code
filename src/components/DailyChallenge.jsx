import { useEffect, useState } from 'react'

function DailyChallenge() {
  const [challenge, setChallenge] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)

  // Fetches the question list from public/challenges.json and picks one using today's date.
  // `ignore` stops a late response from updating state after the component has unmounted.
  useEffect(() => {
    let ignore = false

    async function loadChallenge() {
      try {
        const response = await fetch('/challenges.json')
        if (!response.ok) throw new Error(`status ${response.status}`)
        const challenges = await response.json()
        if (!ignore) setChallenge(challenges[new Date().getDate() % challenges.length])
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadChallenge()
    return () => { ignore = true }
  }, [])

  const resetChallenge = () => {
    setSelected(null)
    setChecked(false)
  }

  const isRight = selected === challenge?.answer

  return (
    <section className="challenge" aria-labelledby="challenge-title">
      <div className="challenge__intro">
        <h2 id="challenge-title">Today's challenge</h2>
        <p>One small question a day. A new one appears tomorrow.</p>
      </div>

      <div className="challenge__card">
        {loading && <p className="panel-empty">Loading today's question…</p>}
        {error && <p className="field-error">Couldn't load today's question ({error}). Refresh the page to try again.</p>}

        {challenge && (
          <>
            <p className="challenge__topic">{challenge.topic}</p>
            <h3>{challenge.question}</h3>

            <div className="challenge__options" role="group" aria-label="Answer choices">
              {challenge.options.map((option, index) => {
                const isSelected = selected === index
                const isCorrect = checked && index === challenge.answer
                const isWrong = checked && isSelected && !isCorrect

                return (
                  <button
                    key={option}
                    type="button"
                    className={`option ${isSelected ? 'is-selected' : ''} ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                    onClick={() => { if (!checked) setSelected(index) }}
                    aria-pressed={isSelected}
                  >
                    <span className="option__key">{String.fromCharCode(65 + index)}</span>
                    {option}
                  </button>
                )
              })}
            </div>

            {checked && (
              <p className={`challenge__result ${isRight ? 'is-correct' : 'is-wrong'}`}>
                <strong>{isRight ? 'Correct.' : 'Not quite.'}</strong> {challenge.explanation}
              </p>
            )}

            <div className="challenge__actions">
              {checked ? (
                <button className="btn" onClick={resetChallenge}>Try again</button>
              ) : (
                <button className="btn btn--primary" onClick={() => setChecked(true)} disabled={selected === null}>
                  Check answer
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default DailyChallenge
