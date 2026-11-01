import { forumThreadsKey, safeRead, safeWrite } from '../utils/storage'

const seedThreads = {
  'frontend-1': [
    {
      id: 'th-1',
      author: 'Karan Sharma',
      role: 'student',
      question: 'When should I use CSS Grid vs Flexbox for navbar items?',
      answer: 'Use Flexbox for 1-dimensional navbars where items align horizontally. Use CSS Grid when you have multi-row headers with dynamic spacing and sidebars.',
      answeredBy: 'Priya Sharma (Mentor)',
      upvotes: 8,
      createdAt: Date.now() - 86400000 * 3,
    },
    {
      id: 'th-2',
      author: 'Sneha Rao',
      role: 'student',
      question: 'Is box-sizing: border-box supported on all modern browsers?',
      answer: 'Yes, 100% of modern browsers support border-box. It is considered an industry universal reset.',
      answeredBy: 'Rohan Mehra',
      upvotes: 4,
      createdAt: Date.now() - 86400000 * 1,
    },
  ],
}

export function getForumThreads(trackKey, stepId) {
  const key = forumThreadsKey(trackKey, stepId)
  const defaultList = seedThreads[`${trackKey}-${stepId}`] || [
    {
      id: `th-${trackKey}-${stepId}`,
      author: 'Community Mentor',
      role: 'mentor',
      question: `Tips & common edge cases for Module ${stepId}`,
      answer: 'Make sure to inspect network requests and test screen reader accessibility before moving to the next stop.',
      answeredBy: 'Lead Instructor',
      upvotes: 3,
      createdAt: Date.now() - 86400000 * 2,
    },
  ]
  return safeRead(key, defaultList)
}

export function askQuestion(trackKey, stepId, authorName, questionText) {
  if (!questionText.trim()) return null
  const key = forumThreadsKey(trackKey, stepId)
  const threads = getForumThreads(trackKey, stepId)

  const newThread = {
    id: `th-${Date.now()}`,
    author: authorName,
    role: 'student',
    question: questionText.trim(),
    answer: null,
    answeredBy: null,
    upvotes: 1,
    createdAt: Date.now(),
  }

  const updated = [newThread, ...threads]
  safeWrite(key, updated)
  return newThread
}

export function answerQuestion(trackKey, stepId, threadId, answerText, mentorName) {
  if (!answerText.trim()) return null
  const key = forumThreadsKey(trackKey, stepId)
  const threads = getForumThreads(trackKey, stepId)

  const updated = threads.map(t => (
    t.id === threadId
      ? { ...t, answer: answerText.trim(), answeredBy: mentorName, answeredAt: Date.now() }
      : t
  ))
  safeWrite(key, updated)
  return updated
}

export function upvoteQuestion(trackKey, stepId, threadId) {
  const key = forumThreadsKey(trackKey, stepId)
  const threads = getForumThreads(trackKey, stepId)

  const updated = threads.map(t => (
    t.id === threadId ? { ...t, upvotes: t.upvotes + 1 } : t
  ))
  safeWrite(key, updated)
  return updated
}

export const forumService = {
  getForumThreads,
  askQuestion,
  answerQuestion,
  upvoteQuestion,
}

export default forumService

