import { enrollmentsKey, safeRead, safeWrite } from '../utils/storage'

export const COURSE_PRICE_INR = 499
export const DEMO_DURATION_MS = 3 * 24 * 60 * 60 * 1000 // 3 days in milliseconds

/**
 * Formats milliseconds into human-friendly remaining time, e.g. "2 days 5 hours left"
 */
export function formatRemainingDemo(ms) {
  if (ms <= 0) return 'Demo expired'
  const totalHours = Math.floor(ms / (1000 * 60 * 60))
  const days = Math.floor(totalHours / 24)
  const hours = totalHours % 24
  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'}${hours > 0 ? ` ${hours} hr${hours === 1 ? '' : 's'}` : ''} left in your demo`
  }
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'}${minutes > 0 ? ` ${minutes} min` : ''} left in your demo`
  }
  return `${Math.max(1, minutes)} minute${minutes === 1 ? '' : 's'} left in your demo`
}

/**
 * Returns all enrollments for a given student email as a map: { [trackKey]: enrollment }
 */
export function getAllEnrollments(studentEmail) {
  if (!studentEmail) return {}
  const raw = safeRead(enrollmentsKey(studentEmail), {})
  const now = Date.now()
  const resolved = {}

  for (const [trackKey, item] of Object.entries(raw)) {
    if (!item) continue
    if (item.status === 'paid') {
      resolved[trackKey] = item
    } else if (item.status === 'demo') {
      const elapsed = now - (item.demoStartedAt || 0)
      if (elapsed >= DEMO_DURATION_MS) {
        resolved[trackKey] = {
          ...item,
          status: 'demo_expired',
          remainingMs: 0,
        }
      } else {
        resolved[trackKey] = {
          ...item,
          remainingMs: Math.max(0, DEMO_DURATION_MS - elapsed),
        }
      }
    } else {
      resolved[trackKey] = item
    }
  }

  return resolved
}

/**
 * Returns enrollment details for a specific track.
 * Status is 'none' | 'demo' | 'demo_expired' | 'paid'.
 */
export function getEnrollment(studentEmail, trackKey) {
  if (!studentEmail || !trackKey) {
    return {
      status: 'none',
      demoStartedAt: null,
      purchasedAt: null,
      remainingMs: 0,
    }
  }
  const all = getAllEnrollments(studentEmail)
  return all[trackKey] || {
    status: 'none',
    demoStartedAt: null,
    purchasedAt: null,
    remainingMs: 0,
  }
}

/**
 * Starts a 3-day demo for the student on the specified track.
 * Allowed only once per track per student.
 */
export function startDemo(studentEmail, trackKey) {
  if (!studentEmail || !trackKey) return { ok: false, error: 'Missing parameters' }
  const current = getEnrollment(studentEmail, trackKey)
  if (current.status === 'paid') {
    return { ok: false, error: 'Already purchased this course.' }
  }
  if (current.demoStartedAt) {
    return { ok: false, error: 'Demo has already been activated for this track.' }
  }

  const all = safeRead(enrollmentsKey(studentEmail), {})
  const newEnrollment = {
    trackKey,
    status: 'demo',
    demoStartedAt: Date.now(),
    purchasedAt: null,
  }
  all[trackKey] = newEnrollment
  safeWrite(enrollmentsKey(studentEmail), all)

  return { ok: true, enrollment: newEnrollment }
}

/**
 * Purchases a course for 499 INR.
 * Status becomes 'paid' with purchase metadata.
 */
export function purchaseCourse(studentEmail, trackKey, paymentDetails = {}) {
  if (!studentEmail || !trackKey) return { ok: false, error: 'Missing parameters' }

  const all = safeRead(enrollmentsKey(studentEmail), {})
  const existing = all[trackKey] || {}
  const orderId = `R2C-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`

  const paidEnrollment = {
    ...existing,
    trackKey,
    status: 'paid',
    purchasedAt: Date.now(),
    orderId,
    amount: COURSE_PRICE_INR,
    currency: 'INR',
    paymentMethod: paymentDetails.method || 'mock_upi',
  }

  all[trackKey] = paidEnrollment
  safeWrite(enrollmentsKey(studentEmail), all)

  return { ok: true, enrollment: paidEnrollment }
}

export const enrollmentService = {
  COURSE_PRICE_INR,
  DEMO_DURATION_MS,
  formatRemainingDemo,
  getAllEnrollments,
  getEnrollment,
  startDemo,
  purchaseCourse,
}

export default enrollmentService

