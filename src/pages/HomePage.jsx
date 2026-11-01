import Hero from '../components/Hero'
import DailyChallenge from '../components/DailyChallenge'
import { goals } from '../data/goals'

const getSteps = (trackCount) => [
  { title: 'Choose a track', text: `Pick one of ${trackCount} careers, or answer six questions and let the quiz suggest one.` },
  { title: 'Mark what you know', text: 'Skills you already have start ticked, so you never sit through the basics again.' },
  { title: 'Follow the route', text: 'Every stop has a video, the docs, practice projects, your notes, study guides and fresh articles.' },
]

function HomePage() {
  const steps = getSteps(goals.length)

  return (
    <>
      <Hero />

      <section className="how" aria-labelledby="how-title">
        <h2 id="how-title">How it works</h2>
        <ol className="how__steps">
          {steps.map((step, index) => (
            <li key={step.title} className="how__step">
              <span className="how__num">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <DailyChallenge />
    </>
  )
}

export default HomePage
