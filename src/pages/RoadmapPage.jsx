import { useNavigate, useParams } from 'react-router-dom'
import Roadmap from '../components/Roadmap'
import NotFoundPage from './NotFoundPage'
import { useAuth } from '../context/AuthContext'
import { goals } from '../data/goals'
import { roadmaps } from '../data/roadmaps'
import { notesKey, progressKey } from '../utils/storage'

function RoadmapPage({ knownSkills, onStartOver }) {
  const { goalKey } = useParams() // "/roadmap/frontend" gives goalKey = "frontend"
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const goal = goals.find(g => g.key === goalKey)
  if (!goal) return <NotFoundPage />

  // Logged-in users get their own saved progress. Everyone else shares a "guest" slot.
  const identity = currentUser ? currentUser.email : 'guest'

  const handleStartOver = () => {
    onStartOver()
    navigate('/generator')
  }

  return (
    <section className="page page--narrow">
      {/* A different key (new user or new track) re-mounts Roadmap, so it loads that progress fresh. */}
      <Roadmap
        key={`${identity}-${goalKey}`}
        goal={goal}
        roadmap={roadmaps[goalKey]}
        storageKey={progressKey(identity, goalKey)}
        notesStorageKey={notesKey(identity, goalKey)}
        isGuest={!currentUser}
        knownSkills={knownSkills}
        onStartOver={handleStartOver}
      />
    </section>
  )
}

export default RoadmapPage
