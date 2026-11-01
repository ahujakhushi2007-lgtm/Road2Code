import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AuthModal from './components/AuthModal'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRoute from './components/RoleRoute'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import QuizPage from './pages/QuizPage'
import SearchPage from './pages/SearchPage'
import PrereqPage from './pages/PrereqPage'
import AboutPage from './pages/AboutPage'
import GeneratorPage from './pages/GeneratorPage'
import RoadmapPage from './pages/RoadmapPage'
import ProgressPage from './pages/ProgressPage'
import MyCoursesPage from './pages/MyCoursesPage'
import JobsPage from './pages/JobsPage'
import MentorPage from './pages/MentorPage'
import LivePage from './pages/LivePage'
import CertificatePage from './pages/CertificatePage'
import VerifyPage from './pages/VerifyPage'
import PortfolioPage from './pages/PortfolioPage'
import ResumeBuilderPage from './pages/ResumeBuilderPage'
import LeaderboardPage from './pages/LeaderboardPage'
import MockInterviewPage from './pages/MockInterviewPage'
import CampusPage from './pages/CampusPage'
import ReferralPage from './pages/ReferralPage'
import NotFoundPage from './pages/NotFoundPage'
import { useAuth } from './context/AuthContext'
import { useLocalStorage } from './hooks/useLocalStorage'
import './styles/App.css'

function App() {
  const { authMode } = useAuth()

  // Lifted state: these are set on one page and read on another,
  // so they live here in the closest common parent.
  const [pickedGoal, setPickedGoal] = useState(null)
  const [knownSkills, setKnownSkills] = useLocalStorage('road2code_known_skills', [])

  const handleStartOver = () => {
    setPickedGoal(null)
    setKnownSkills([])
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage onPickGoal={setPickedGoal} />} />
          <Route path="quiz" element={<QuizPage onPickGoal={setPickedGoal} />} />
          <Route path="search" element={<SearchPage onPickGoal={setPickedGoal} />} />
          <Route path="prerequisites" element={<PrereqPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="live" element={<LivePage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="campus" element={<CampusPage />} />
          <Route path="refer" element={<ReferralPage />} />
          <Route path="mock-interview" element={<MockInterviewPage />} />
          <Route path="mock-interview/:trackKey" element={<MockInterviewPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:studentEmail" element={<PortfolioPage />} />
          <Route path="resume" element={<ResumeBuilderPage />} />
          <Route
            path="generator"
            element={<GeneratorPage pickedGoal={pickedGoal} onGenerate={setKnownSkills} />}
          />
          <Route
            path="roadmap/:goalKey"
            element={<RoadmapPage knownSkills={knownSkills} onStartOver={handleStartOver} />}
          />
          <Route
            path="progress"
            element={
              <ProtectedRoute>
                <ProgressPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-courses"
            element={
              <RoleRoute allowedRoles={['student']}>
                <MyCoursesPage />
              </RoleRoute>
            }
          />
          <Route
            path="jobs"
            element={
              <RoleRoute allowedRoles={['student']}>
                <JobsPage />
              </RoleRoute>
            }
          />
          <Route
            path="mentor"
            element={
              <RoleRoute allowedRoles={['mentor']}>
                <MentorPage />
              </RoleRoute>
            }
          />
          <Route path="certificate/:certId" element={<CertificatePage />} />
          <Route path="verify" element={<VerifyPage />} />
          <Route path="verify/:certId" element={<VerifyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {authMode && <AuthModal />}
    </BrowserRouter>
  )
}

export default App
