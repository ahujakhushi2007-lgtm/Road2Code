import { certificatesKey, safeRead, safeWrite } from '../utils/storage'
import { roadmaps } from '../data/roadmaps'
import { goals } from '../data/goals'
import { getEnrollment } from './enrollmentService'
import { getMentorByTrack } from './mentorService'
import { progressKey } from '../utils/storage'

// Sample seeded certificate for instant testing and demo preview
const sampleCertId = 'R2C-FRONTEND-2026-DEMO01'
const initialCertificates = {
  [sampleCertId]: {
    certId: sampleCertId,
    studentName: 'Rohan Mehra',
    studentEmail: 'rohan.mehra@example.com',
    trackKey: 'frontend',
    trackTitle: 'Frontend Developer',
    trackColor: '#6aa6ff',
    totalStops: 8,
    mentorName: 'Priya Sharma',
    mentorTitle: 'Staff Frontend Engineer & React Specialist',
    issuedAt: Date.now() - 86400000 * 3,
    issuedDateString: '28 October 2026',
  },
}

/**
 * Returns all stored certificates across the application.
 * Map: { [certId]: certificateData }
 */
export function getAllCertificates() {
  return safeRead(certificatesKey(), initialCertificates)
}

/**
 * Retrieves a certificate by its unique certId.
 */
export function getCertificateById(certId) {
  if (!certId) return null
  const all = getAllCertificates()
  // Case-insensitive lookup
  const key = Object.keys(all).find(k => k.toLowerCase() === certId.trim().toLowerCase())
  return key ? all[key] : null
}

/**
 * Retrieves all certificates awarded to a specific student email.
 */
export function getCertificatesForUser(studentEmail) {
  if (!studentEmail) return []
  const all = getAllCertificates()
  return Object.values(all).filter(
    cert => cert.studentEmail.toLowerCase() === studentEmail.toLowerCase()
  )
}

/**
 * Formats a unique certificate ID, e.g. R2C-FRONTEND-2026-AB7X9Q
 */
function generateCertId(trackKey) {
  const year = new Date().getFullYear()
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `R2C-${trackKey.toUpperCase()}-${year}-${code}`
}

/**
 * Checks if a student is eligible for a certificate and issues one if not already issued.
 * Eligibility:
 * 1. Must be PAID enrollment (status === 'paid')
 * 2. Must have completed ALL stops for this track
 */
export function issueCertificateIfEligible(studentEmail, studentName, trackKey) {
  if (!studentEmail || !trackKey) return null

  // Check enrollment
  const enrollment = getEnrollment(studentEmail, trackKey)
  if (enrollment.status !== 'paid') return null

  // Check completions
  const raw = safeRead(progressKey(studentEmail, trackKey), [])
  const completed = Array.isArray(raw) ? raw : []
  const roadmap = roadmaps[trackKey]
  if (!roadmap || completed.length < roadmap.steps.length) return null

  // Check if certificate already exists
  const all = getAllCertificates()
  const existing = Object.values(all).find(
    c => c.studentEmail.toLowerCase() === studentEmail.toLowerCase() && c.trackKey === trackKey
  )
  if (existing) return existing

  // Issue new certificate
  const certId = generateCertId(trackKey)
  const goal = goals.find(g => g.key === trackKey)
  const mentor = getMentorByTrack(trackKey)
  const issuedAt = Date.now()

  const certificate = {
    certId,
    studentName: studentName || studentEmail.split('@')[0],
    studentEmail: studentEmail.toLowerCase(),
    trackKey,
    trackTitle: goal ? goal.label : roadmap.title,
    trackColor: goal ? goal.color : '#6aa6ff',
    totalStops: roadmap.steps.length,
    mentorName: mentor ? mentor.name : 'Lead Mentor',
    mentorTitle: mentor ? mentor.title : 'Course Director',
    issuedAt,
    issuedDateString: new Date(issuedAt).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  }

  all[certId] = certificate
  safeWrite(certificatesKey(), all)

  return certificate
}

export const certificateService = {
  getAllCertificates,
  getCertificateById,
  getCertificatesForUser,
  issueCertificateIfEligible,
}

export default certificateService
