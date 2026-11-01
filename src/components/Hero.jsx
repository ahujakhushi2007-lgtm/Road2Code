import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RouteLine from './RouteLine'
import TrackIcon from './TrackIcon'
import { goals } from '../data/goals'
import { roadmaps } from '../data/roadmaps'

const SLIDE_MS = 5000

function Hero() {
  const [active, setActive] = useState(0) // index of the track shown on the map
  const [isPaused, setIsPaused] = useState(false)

  // Runs every time the track changes (by the timer or a click) and schedules the next one.
  // The cleanup cancels the old timer, so only one is ever running.
  useEffect(() => {
    if (isPaused) return

    const timerId = setTimeout(() => {
      setActive((active + 1) % goals.length)
    }, SLIDE_MS)

    return () => clearTimeout(timerId)
  }, [active, isPaused])

  const goal = goals[active]
  const stops = roadmaps[goal.key].steps.map(step => step.topic)

  return (
    <section className="hero">
      <div className="hero__intro">
        <h1>Learn to code one stop at a time.</h1>
        <p className="hero__lede">
          Pick a career track, mark what you already know, and follow an ordered route with a
          video and the docs for every stop.
        </p>
        <div className="hero__actions">
          <Link to="/courses" className="btn btn--primary btn--lg">Browse all {goals.length} tracks</Link>
          <Link to="/quiz" className="btn btn--lg">Find my track</Link>
        </div>
      </div>

      {/* The map stops changing while the mouse or keyboard focus is on it, so nothing moves while you read. */}
      <div
        className="hero__map"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div className="line-tabs" role="group" aria-label="Preview a track">
          {goals.map((g, index) => (
            <button
              key={g.key}
              aria-pressed={index === active}
              className={`line-tab ${index === active ? 'is-active' : ''}`}
              style={{ '--track': g.color }}
              onClick={() => setActive(index)}
            >
              <span className="line-tab__dot" aria-hidden="true" />
              {g.short}
            </button>
          ))}
        </div>

        <div className="hero__route">
          <div className="hero__route-head">
            <span className="track-chip" style={{ '--track': goal.color }}>
              <TrackIcon trackKey={goal.key} />
            </span>
            <div>
              <h2>{goal.label}</h2>
              <p>{goal.tagline}</p>
            </div>
          </div>

          {/* A new key re-mounts the line, which replays its drawing animation. */}
          <RouteLine key={goal.key} stops={stops} color={goal.color} />

          <div className="hero__route-foot">
            <span>{stops.length} stops, about {goal.weeks} weeks at an hour a day</span>
            <Link to={`/roadmap/${goal.key}`} className="text-link">Open this route</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
