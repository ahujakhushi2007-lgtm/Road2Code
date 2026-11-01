// The one place that decides where saved data lives in localStorage,
// so every page reads and writes the same keys.

export function progressKey(identity, goalKey) {
  return `road2code_progress_${identity}_${goalKey}`
}

export function notesKey(identity, goalKey) {
  return `road2code_notes_${identity}_${goalKey}`
}

export function enrollmentsKey(identity) {
  return `road2code_enrollments_${identity}`
}

export function mentorIdeasKey() {
  return 'road2code_mentor_project_ideas'
}

export function mentorRecommendationsKey() {
  return 'road2code_mentor_recommendations'
}

export function mentorFeedbackKey(studentEmail, trackKey) {
  return `road2code_mentor_feedback_${studentEmail}_${trackKey}`
}

export function certificatesKey() {
  return 'road2code_certificates'
}

export function jobApplicationsKey(studentEmail) {
  return `road2code_job_applications_${studentEmail}`
}

export function liveDoubtsKey(trackKey) {
  return `road2code_live_doubts_${trackKey}`
}

export function projectSubmissionsKey(studentEmail, trackKey) {
  return `road2code_submissions_${studentEmail}_${trackKey}`
}

export function allSubmissionsKey() {
  return 'road2code_all_submissions'
}

export function streakKey(studentEmail) {
  return `road2code_streak_${studentEmail}`
}

export function forumThreadsKey(trackKey, stepId) {
  return `road2code_forum_${trackKey}_${stepId}`
}

export function referralsKey(studentEmail) {
  return `road2code_referrals_${studentEmail}`
}

export function mentorBookingsKey(studentEmail) {
  return `road2code_mentor_bookings_${studentEmail}`
}

export function mockInterviewScoresKey(studentEmail, trackKey) {
  return `road2code_mock_scores_${studentEmail}_${trackKey}`
}

// Safely reads and parses JSON from localStorage. Falls back to fallback if corrupt or missing.
export function safeRead(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    if (saved === null) {
      return typeof fallback === 'function' ? fallback() : fallback
    }
    return JSON.parse(saved)
  } catch {
    return typeof fallback === 'function' ? fallback() : fallback
  }
}

// Safely stringifies and saves data to localStorage.
export function safeWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Gracefully handle storage quota or private-browsing restrictions
  }
}
