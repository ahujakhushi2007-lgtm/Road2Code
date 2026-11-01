import { useState } from 'react'
import RouteLine from '../components/RouteLine'
import { skillOptions } from '../data/goals'
import { prerequisites, nextStep } from '../data/prerequisites'

function PrereqPage() {
  const [selected, setSelected] = useState(null)

  const before = selected ? prerequisites[selected] : []
  const after = selected ? nextStep[selected] : null
  // The chain drawn as a line: everything to learn first, the chosen skill, then what comes next.
  const chain = selected ? [...before, selected, ...(after ? [after] : [])] : []

  return (
    <section className="page page--narrow">
      <header className="page-head">
        <h1>What should I learn first?</h1>
        <p>Pick a technology to see what to learn before it and what comes after it.</p>
      </header>

      <div className="chips">
        {skillOptions.map(skill => (
          <button
            key={skill}
            className={`chip ${selected === skill ? 'is-on' : ''}`}
            aria-pressed={selected === skill}
            onClick={() => setSelected(skill)}
          >
            {skill}
          </button>
        ))}
      </div>

      {selected && (
        <div className="prereq-result" aria-live="polite">
          <RouteLine key={selected} stops={chain} color="var(--text-muted)" activeIndex={before.length} />
          <div className="prereq-result__text">
            {before.length === 0 ? (
              <p>No prerequisites. {selected} is a good place to start.</p>
            ) : (
              <p>Learn first: <strong>{before.join(', ')}</strong>.</p>
            )}
            {after ? <p>After {selected}, try <strong>{after}</strong>.</p> : <p>{selected} is the last stop on this chain.</p>}
          </div>
        </div>
      )}
    </section>
  )
}

export default PrereqPage
