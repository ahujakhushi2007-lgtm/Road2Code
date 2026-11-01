import { Link } from 'react-router-dom'
import {
  Award,
  Briefcase,
  Command,
  Compass,
  GraduationCap,
  ListChecks,
  Radio,
  ShieldCheck,
  StickyNote,
} from 'lucide-react'
import { goals } from '../data/goals'
import { roadmaps } from '../data/roadmaps'
import { quizQuestions } from '../data/quiz'
import { COURSE_PRICE_INR } from '../services/enrollmentService'

const totalStops = Object.values(roadmaps).reduce((sum, track) => sum + track.steps.length, 0)
const stopsPerTrack = Math.round(totalStops / goals.length)

const features = [
  {
    icon: Compass,
    title: `Routes for ${goals.length} careers`,
    text: `Ordered routes of ${stopsPerTrack} stops from beginner fundamentals to job readiness, with known topics ticked for you.`,
  },
  {
    icon: GraduationCap,
    title: `3-Day Demo & ₹${COURSE_PRICE_INR} Pricing`,
    text: 'Test-drive any course with a 3-day demo covering the first 2 stops, or unlock full lifetime access for ₹499.',
  },
  {
    icon: StickyNote,
    title: 'Structured study notes',
    text: 'Comprehensive study guides, key takeaways, and revision checklists on every stop, downloadable as Markdown.',
  },
  {
    icon: Radio,
    title: 'Daily live doubt sessions',
    text: 'Scheduled 7:00 PM IST doubt-clearing sessions with specialized industry mentors, with advance question submission.',
  },
  {
    icon: Award,
    title: 'Verified certificates',
    text: 'Complete all stops of a paid course to receive a verified, tamper-evident certificate with a unique shareable ID.',
  },
  {
    icon: Briefcase,
    title: 'Partner job opportunities',
    text: 'Mentor-recommended students receive direct interview invitations with simulated top engineering partners.',
  },
  {
    icon: ListChecks,
    title: 'Progress that sticks',
    text: 'Tick stops as you finish them. Progress is saved safely in your browser, surviving refreshes and reboots.',
  },
  {
    icon: Command,
    title: 'Keyboard shortcuts',
    text: 'Press Ctrl+K (or ⌘K on a Mac) to jump to any course, roadmap, tool, or dashboard instantly.',
  },
]

const techStack = [
  { name: 'React 19', use: 'Function components, custom hooks, and Context for state' },
  { name: 'React Router 7', use: 'Nested layouts, dynamic route params, ProtectedRoute and RoleRoute' },
  { name: 'Architecture', use: 'Decoupled src/services/ layer (enrollmentService, mentorService, jobService)' },
  { name: 'Vite 8', use: 'Instant HMR development server and optimized production build' },
  { name: 'CSS & Design', use: 'Hand-written CSS with custom variables for dark/light themes' },
  { name: 'Accessibility', use: 'High-contrast palette, ARIA attributes, full keyboard navigation' },
]

function Feature({ icon: Icon, title, text }) {
  return (
    <li className="feature">
      <Icon size={20} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  )
}

function AboutPage() {
  return (
    <section className="page">
      <header className="page-head page-head--wide">
        <h1>Why we built Road2Code</h1>
        <p>
          There are thousands of tutorials and nobody tells you the order. Beginners lose weeks
          deciding what to learn next. Road2Code turns career goals into ordered routes with
          mentorship, verified credentials, and fast-track interview pipelines.
        </p>
      </header>

      {/* Demo Project Disclaimer */}
      <aside className="dev-notice-banner dev-notice-banner--accent" role="note">
        <ShieldCheck size={20} aria-hidden="true" />
        <div>
          <strong>Frontend Demonstration Disclaimer:</strong>
          <span>
            {' '}Road2Code is an educational front-end engineering platform demo. All payment gateways (₹{COURSE_PRICE_INR}),
            mentor credentials, live Google Meet sessions, and partner job opportunities are simulated in-browser
            demonstration fixtures. No real financial charges or formal employment contracts are executed.
          </span>
        </div>
      </aside>

      <dl className="stats">
        <div><dt>Career tracks</dt><dd>{goals.length}</dd></div>
        <div><dt>Stops to learn</dt><dd>{totalStops}</dd></div>
        <div><dt>Course price</dt><dd>₹{COURSE_PRICE_INR}</dd></div>
        <div><dt>Quiz questions</dt><dd>{quizQuestions.length}</dd></div>
      </dl>

      <h2 className="section-title">What you can do</h2>
      <ul className="features">
        {features.map(feature => (
          <Feature key={feature.title} {...feature} />
        ))}
      </ul>

      <h2 className="section-title">Built with</h2>
      <ul className="stack">
        {techStack.map(tech => (
          <li key={tech.name}>
            <strong>{tech.name}</strong>
            <span>{tech.use}</span>
          </li>
        ))}
      </ul>

      <div className="cta">
        <p>You don't need to know everything. Just the next stop.</p>
        <Link to="/generator" className="btn btn--primary btn--lg">Plan my route</Link>
      </div>
    </section>
  )
}

export default AboutPage
