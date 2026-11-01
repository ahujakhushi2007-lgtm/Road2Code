import { streakKey, progressKey, safeRead, safeWrite } from '../utils/storage'
import { goals } from '../data/goals'

/**
 * Gets or updates student's daily streak and XP.
 */
export function getStudentStreak(studentEmail) {
  if (!studentEmail) {
    return { streak: 0, lastActiveDate: null, xp: 0, level: 1 }
  }

  const key = streakKey(studentEmail)
  const data = safeRead(key, { streak: 1, lastActiveDate: null, bonusXp: 0 })
  const todayStr = new Date().toISOString().slice(0, 10)

  let streak = data.streak || 1
  if (data.lastActiveDate) {
    const lastDate = new Date(data.lastActiveDate)
    const today = new Date(todayStr)
    const diffDays = Math.round((today - lastDate) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      // consecutive day
      streak = data.streak + 1
      safeWrite(key, { ...data, streak, lastActiveDate: todayStr })
    } else if (diffDays > 1) {
      // missed a day
      streak = 1
      safeWrite(key, { ...data, streak: 1, lastActiveDate: todayStr })
    }
  } else {
    safeWrite(key, { ...data, streak: 1, lastActiveDate: todayStr })
  }

  // Calculate XP dynamically from completed stops across tracks
  let completedStopsCount = 0
  for (const goal of goals) {
    const raw = safeRead(progressKey(studentEmail, goal.key), [])
    if (Array.isArray(raw)) {
      completedStopsCount += raw.length
    }
  }

  const xpFromStops = completedStopsCount * 50
  const xpFromStreak = streak * 25
  const totalXp = xpFromStops + xpFromStreak + (data.bonusXp || 0)
  const level = Math.floor(totalXp / 250) + 1

  return {
    streak,
    lastActiveDate: todayStr,
    xp: totalXp,
    level,
    completedStopsCount,
  }
}

/**
 * Returns cohort leaderboard combining real users and cohort learners.
 */
export function getCohortLeaderboard(trackKey = 'all') {
  const baseLearners = [
    { rank: 1, name: 'Siddharth Nair', email: 'sid@example.com', streak: 14, xp: 1420, track: 'frontend', badge: 'Route Legend' },
    { rank: 2, name: 'Meera Iyer', email: 'meera@example.com', streak: 11, xp: 1250, track: 'fullstack', badge: 'Code Ninja' },
    { rank: 3, name: 'Aman Saxena', email: 'aman@example.com', streak: 9, xp: 980, track: 'devops', badge: 'Consistent Pro' },
    { rank: 4, name: 'Divya Reddy', email: 'divya@example.com', streak: 8, xp: 870, track: 'aiml', badge: 'Model Crafter' },
    { rank: 5, name: 'Kabir Patel', email: 'kabir@example.com', streak: 7, xp: 760, track: 'backend', badge: 'API Architect' },
    { rank: 6, name: 'Tanvi Joshi', email: 'tanvi@example.com', streak: 6, xp: 640, track: 'uiux', badge: 'Design Master' },
    { rank: 7, name: 'Arjun Desai', email: 'arjun@example.com', streak: 5, xp: 550, track: 'dsa', badge: 'Algo Solver' },
  ]

  // Add registered students from localStorage
  const usersMap = safeRead('road2code_users', {})
  const registered = Object.values(usersMap).filter(u => u.role !== 'mentor')

  for (const student of registered) {
    const sData = getStudentStreak(student.email)
    if (!baseLearners.some(l => l.email.toLowerCase() === student.email.toLowerCase())) {
      baseLearners.push({
        rank: 0,
        name: student.name,
        email: student.email,
        streak: sData.streak,
        xp: sData.xp,
        track: 'frontend',
        badge: sData.level >= 3 ? 'Senior Learner' : 'Rising Star',
      })
    }
  }

  // Sort by XP
  baseLearners.sort((a, b) => b.xp - a.xp)
  baseLearners.forEach((item, index) => {
    item.rank = index + 1
  })

  if (trackKey === 'all') return baseLearners
  return baseLearners.filter(l => l.track === trackKey)
}

export const streakService = {
  getStudentStreak,
  getCohortLeaderboard,
}

export default streakService

