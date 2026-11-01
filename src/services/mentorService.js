import { mentors } from '../data/mentors'
import { roadmaps } from '../data/roadmaps'
import { goals } from '../data/goals'
import {
  mentorIdeasKey,
  mentorRecommendationsKey,
  mentorFeedbackKey,
  progressKey,
  notesKey,
  safeRead,
  safeWrite,
} from '../utils/storage'
import { getAllEnrollments } from './enrollmentService'

const initialProjectIdeas = [
  {
    id: 'idea-1',
    mentorEmail: 'priya.sharma@road2code.dev',
    mentorName: 'Priya Sharma',
    track: 'frontend',
    title: 'Offline-First Kanban Board',
    description: 'Build a Trello clone with Drag & Drop, optimistic UI updates, localStorage persistence, and IndexedDB sync.',
    difficulty: 'Intermediate',
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'idea-2',
    mentorEmail: 'priya.sharma@road2code.dev',
    mentorName: 'Priya Sharma',
    track: 'frontend',
    title: 'Accessible Design System Component Library',
    description: 'Design a reusable component library with full keyboard navigation, ARIA attributes, and automatic contrast validation.',
    difficulty: 'Advanced',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'idea-3',
    mentorEmail: 'rajesh.verma@road2code.dev',
    mentorName: 'Dr. Rajesh Verma',
    track: 'aiml',
    title: 'Local Document Q&A with Embeddings',
    description: 'Build a private document search engine using sentence-transformers, FAISS vector indexing, and a lightweight web UI.',
    difficulty: 'Intermediate',
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'idea-4',
    mentorEmail: 'ananya.iyer@road2code.dev',
    mentorName: 'Ananya Iyer',
    track: 'devops',
    title: 'Zero-Downtime Blue/Green Deploy Script',
    description: 'Write an automated pipeline script with Docker, Nginx reverse proxy health-checks, and automatic rollback on failure.',
    difficulty: 'Advanced',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'idea-5',
    mentorEmail: 'ananya.iyer@road2code.dev',
    mentorName: 'Ananya Iyer',
    track: 'cloud',
    title: 'Serverless Event-Driven Image Resizer',
    description: 'Set up an AWS S3 bucket trigger connecting to an AWS Lambda function that processes uploaded images and creates thumbnails.',
    difficulty: 'Beginner',
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: 'idea-6',
    mentorEmail: 'priya.sharma@road2code.dev',
    mentorName: 'Priya Sharma',
    track: 'fullstack',
    title: 'Realtime Collaborative Markdown Editor',
    description: 'Create an editor with WebSocket synchronisation, live markdown preview, and conflict resolution.',
    difficulty: 'Advanced',
    createdAt: Date.now() - 86400000 * 1,
  },
]

export function getMentors() {
  return mentors
}

export function getMentorByEmail(email) {
  if (!email) return null
  return mentors.find(m => m.email.toLowerCase() === email.toLowerCase()) || null
}

export function getMentorByTrack(trackKey) {
  if (!trackKey) return mentors[0]
  const match = mentors.find(m => m.tracks.includes(trackKey))
  return match || mentors[0]
}

/**
 * Returns project ideas for a given track.
 */
export function getProjectIdeas(trackKey) {
  const allIdeas = safeRead(mentorIdeasKey(), initialProjectIdeas)
  if (!trackKey) return allIdeas
  return allIdeas.filter(idea => idea.track === trackKey)
}

/**
 * Adds a new mentor project idea.
 */
export function addProjectIdea(mentorEmail, mentorName, { track, title, description, difficulty }) {
  const allIdeas = safeRead(mentorIdeasKey(), initialProjectIdeas)
  const newIdea = {
    id: `idea-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    mentorEmail,
    mentorName,
    track,
    title: title.trim(),
    description: description.trim(),
    difficulty: difficulty || 'Intermediate',
    createdAt: Date.now(),
  }
  const updated = [newIdea, ...allIdeas]
  safeWrite(mentorIdeasKey(), updated)
  return newIdea
}

/**
 * Updates an existing project idea.
 */
export function updateProjectIdea(id, updates) {
  const allIdeas = safeRead(mentorIdeasKey(), initialProjectIdeas)
  const updated = allIdeas.map(idea => (idea.id === id ? { ...idea, ...updates, updatedAt: Date.now() } : idea))
  safeWrite(mentorIdeasKey(), updated)
  return updated.find(i => i.id === id)
}

/**
 * Deletes a project idea by id.
 */
export function deleteProjectIdea(id) {
  const allIdeas = safeRead(mentorIdeasKey(), initialProjectIdeas)
  const filtered = allIdeas.filter(idea => idea.id !== id)
  safeWrite(mentorIdeasKey(), filtered)
  return true
}

/**
 * Recommendations for interview: { `${studentEmail}_${trackKey}`: boolean }
 */
export function isStudentRecommended(studentEmail, trackKey) {
  if (!studentEmail || !trackKey) return false
  const map = safeRead(mentorRecommendationsKey(), {})
  return Boolean(map[`${studentEmail.toLowerCase()}_${trackKey}`])
}

export function recommendStudentForInterview(studentEmail, trackKey, recommended = true) {
  if (!studentEmail || !trackKey) return false
  const map = safeRead(mentorRecommendationsKey(), {})
  map[`${studentEmail.toLowerCase()}_${trackKey}`] = recommended
  safeWrite(mentorRecommendationsKey(), map)
  return true
}

/**
 * Mentor feedback notes for a student on a track.
 */
export function getStudentFeedback(studentEmail, trackKey) {
  if (!studentEmail || !trackKey) return []
  return safeRead(mentorFeedbackKey(studentEmail.toLowerCase(), trackKey), [])
}

export function addStudentFeedback(studentEmail, trackKey, mentorEmail, text) {
  if (!studentEmail || !trackKey || !text.trim()) return null
  const key = mentorFeedbackKey(studentEmail.toLowerCase(), trackKey)
  const list = safeRead(key, [])
  const mentor = getMentorByEmail(mentorEmail)
  const feedbackItem = {
    id: `fb-${Date.now()}`,
    mentorEmail,
    mentorName: mentor ? mentor.name : 'Mentor',
    text: text.trim(),
    createdAt: Date.now(),
  }
  const updated = [feedbackItem, ...list]
  safeWrite(key, updated)
  return feedbackItem
}

/**
 * Reads students enrolled in the mentor's tracks from localStorage.
 * Handles both actual localStorage students and sample seed students for rich demo display.
 */
export function getStudentsForMentor(mentorEmail) {
  const mentor = getMentorByEmail(mentorEmail)
  if (!mentor) return []

  const usersMap = safeRead('road2code_users', {})
  const registeredStudents = Object.values(usersMap).filter(u => u.role !== 'mentor')

  // Demo fallback students so mentor dashboard is never empty on first load
  const sampleStudents = [
    {
      name: 'Rohan Mehra',
      email: 'rohan.mehra@example.com',
      role: 'student',
      isSample: true,
      lastActive: Date.now() - 3600000 * 2,
    },
    {
      name: 'Simran Kaur',
      email: 'simran.kaur@example.com',
      role: 'student',
      isSample: true,
      lastActive: Date.now() - 86400000,
    },
  ]

  // Combine actual registered students with sample students (avoiding email collisions)
  const allStudentCandidates = [...registeredStudents]
  for (const sample of sampleStudents) {
    if (!allStudentCandidates.some(s => s.email.toLowerCase() === sample.email.toLowerCase())) {
      allStudentCandidates.push(sample)
    }
  }

  const results = []

  for (const student of allStudentCandidates) {
    const studentEnrollments = getAllEnrollments(student.email)

    for (const trackKey of mentor.tracks) {
      const enrollment = studentEnrollments[trackKey]
      const goal = goals.find(g => g.key === trackKey)
      const roadmap = roadmaps[trackKey]
      if (!goal || !roadmap) continue

      const rawProgress = safeRead(progressKey(student.email, trackKey), [])
      const completed = Array.isArray(rawProgress) ? rawProgress : []
      const notesMap = safeRead(notesKey(student.email, trackKey), {})
      const notesCount = Object.values(notesMap).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0)

      // An enrollment counts if user has an explicit enrollment or has started the track
      const isEnrolled = enrollment && enrollment.status !== 'none'
      const hasProgress = completed.length > 0

      // For sample students on mentor's first track, give realistic sample progress
      if (!isEnrolled && !hasProgress && student.isSample && trackKey === mentor.tracks[0]) {
        results.push({
          studentEmail: student.email,
          studentName: student.name,
          trackKey,
          trackTitle: goal.label,
          trackColor: goal.color,
          status: 'paid',
          stopsDone: Math.min(6, roadmap.steps.length),
          totalStops: roadmap.steps.length,
          completedSteps: [1, 2, 3, 4, 5, 6],
          lastActive: student.lastActive,
          notesCount: 4,
          isRecommended: isStudentRecommended(student.email, trackKey),
          feedbacks: getStudentFeedback(student.email, trackKey),
        })
        continue
      }

      if (isEnrolled || hasProgress) {
        results.push({
          studentEmail: student.email,
          studentName: student.name,
          trackKey,
          trackTitle: goal.label,
          trackColor: goal.color,
          status: enrollment?.status || (completed.length > 0 ? 'demo' : 'none'),
          stopsDone: completed.length,
          totalStops: roadmap.steps.length,
          completedSteps: completed,
          lastActive: student.lastActive || Date.now() - 3600000 * 5,
          notesCount,
          isRecommended: isStudentRecommended(student.email, trackKey),
          feedbacks: getStudentFeedback(student.email, trackKey),
        })
      }
    }
  }

  return results
}

export const mentorService = {
  getMentors,
  getMentorByEmail,
  getMentorByTrack,
  getProjectIdeas,
  addProjectIdea,
  updateProjectIdea,
  deleteProjectIdea,
  isStudentRecommended,
  recommendStudentForInterview,
  getStudentFeedback,
  addStudentFeedback,
  getStudentsForMentor,
}

export default mentorService
