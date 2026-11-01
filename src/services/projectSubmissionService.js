import { allSubmissionsKey, projectSubmissionsKey, safeRead, safeWrite } from '../utils/storage'

const initialSubmissions = [
  {
    id: 'sub-1',
    studentEmail: 'rohan.mehra@example.com',
    studentName: 'Rohan Mehra',
    trackKey: 'frontend',
    stepId: 3,
    title: 'React Task Planner with Drag & Drop',
    githubUrl: 'https://github.com/rohan-m/react-task-planner',
    liveDemoUrl: 'https://rohan-tasks.vercel.app',
    submittedAt: Date.now() - 86400000 * 2,
    rating: 5,
    mentorReview: 'Exceptional component structure and ARIA keyboard support. Ready for junior developer interviews!',
    reviewedBy: 'Priya Sharma',
    reviewedAt: Date.now() - 86400000,
  },
]

export function getStudentSubmissions(studentEmail, trackKey) {
  if (!studentEmail) return []
  const list = safeRead(projectSubmissionsKey(studentEmail, trackKey), [])
  if (list.length === 0 && studentEmail === 'rohan.mehra@example.com') {
    return initialSubmissions.filter(s => s.trackKey === trackKey)
  }
  return list
}

export function getAllSubmissions() {
  return safeRead(allSubmissionsKey(), initialSubmissions)
}

export function submitProject(studentEmail, studentName, { trackKey, stepId, title, githubUrl, liveDemoUrl }) {
  if (!studentEmail || !title || !githubUrl) return { ok: false, error: 'Title and GitHub URL are required.' }

  const newSub = {
    id: `sub-${Date.now()}`,
    studentEmail: studentEmail.toLowerCase(),
    studentName,
    trackKey,
    stepId: stepId || 1,
    title: title.trim(),
    githubUrl: githubUrl.trim(),
    liveDemoUrl: (liveDemoUrl || '').trim(),
    submittedAt: Date.now(),
    rating: null,
    mentorReview: null,
  }

  // Save to student-track key
  const studentKey = projectSubmissionsKey(studentEmail, trackKey)
  const studentSubs = safeRead(studentKey, [])
  safeWrite(studentKey, [newSub, ...studentSubs])

  // Save to global key for mentors
  const all = getAllSubmissions()
  safeWrite(allSubmissionsKey(), [newSub, ...all])

  return { ok: true, submission: newSub }
}

export function reviewProject(submissionId, { rating, mentorReview, mentorName }) {
  const all = getAllSubmissions()
  const subIndex = all.findIndex(s => s.id === submissionId)
  if (subIndex === -1) return { ok: false, error: 'Submission not found' }

  all[subIndex] = {
    ...all[subIndex],
    rating: Number(rating),
    mentorReview: mentorReview.trim(),
    reviewedBy: mentorName,
    reviewedAt: Date.now(),
  }
  safeWrite(allSubmissionsKey(), all)

  // Update in student's specific key as well
  const studentKey = projectSubmissionsKey(all[subIndex].studentEmail, all[subIndex].trackKey)
  const studentSubs = safeRead(studentKey, [])
  const sIdx = studentSubs.findIndex(s => s.id === submissionId)
  if (sIdx !== -1) {
    studentSubs[sIdx] = all[subIndex]
    safeWrite(studentKey, studentSubs)
  }

  return { ok: true, submission: all[subIndex] }
}

export const projectSubmissionService = {
  getStudentSubmissions,
  getAllSubmissions,
  submitProject,
  reviewProject,
}

export default projectSubmissionService

