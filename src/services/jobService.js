import { jobs } from '../data/jobs'
import { roadmaps } from '../data/roadmaps'
import { goals } from '../data/goals'
import { getEnrollment } from './enrollmentService'
import { isStudentRecommended } from './mentorService'
import { jobApplicationsKey, progressKey, safeRead, safeWrite } from '../utils/storage'

/**
 * Checks a student's eligibility for job offers on a specific track.
 * Eligibility rules:
 * 1. Paid enrollment (status === 'paid')
 * 2. Course completed (all stops ticked)
 * 3. Mentor pressed "Recommend for interview"
 */
export function checkEligibility(studentEmail, trackKey) {
  if (!studentEmail || !trackKey) {
    return {
      isEligible: false,
      checks: [
        { id: 'paid', label: 'Full Course Enrolled (Paid)', passed: false },
        { id: 'completed', label: 'All Track Stops Completed', passed: false },
        { id: 'recommended', label: 'Mentor Interview Recommendation', passed: false },
      ],
    }
  }

  const enrollment = getEnrollment(studentEmail, trackKey)
  const isPaid = enrollment.status === 'paid'

  const raw = safeRead(progressKey(studentEmail, trackKey), [])
  const completed = Array.isArray(raw) ? raw : []
  const totalSteps = roadmaps[trackKey]?.steps?.length || 8
  const isCompleted = completed.length >= totalSteps

  const isRecommended = isStudentRecommended(studentEmail, trackKey)

  const checks = [
    {
      id: 'paid',
      label: 'Full Course Enrolled (₹499 Paid)',
      passed: isPaid,
      hint: isPaid ? 'Course bought' : 'Requires paid course access',
    },
    {
      id: 'completed',
      label: `All Track Stops Completed (${completed.length}/${totalSteps})`,
      passed: isCompleted,
      hint: isCompleted ? 'All stops done' : `${totalSteps - completed.length} stops remaining`,
    },
    {
      id: 'recommended',
      label: 'Mentor Interview Recommendation',
      passed: isRecommended,
      hint: isRecommended ? 'Recommended by mentor' : 'Awaiting mentor evaluation',
    },
  ]

  const isEligible = isPaid && isCompleted && isRecommended

  return { isEligible, checks }
}

export function getAllJobs() {
  return jobs
}

export function getJobsByTrack(trackKey) {
  if (!trackKey) return jobs
  return jobs.filter(job => job.track === trackKey)
}

/**
 * Gets applications submitted by a student.
 * Map: { [jobId]: { jobId, slot, acceptedAt, status: 'interview_accepted' } }
 */
export function getStudentApplications(studentEmail) {
  if (!studentEmail) return {}
  return safeRead(jobApplicationsKey(studentEmail), {})
}

/**
 * Returns offer status and remaining time for each job for this student.
 */
export function getStudentOffers(studentEmail) {
  if (!studentEmail) return []

  const applications = getStudentApplications(studentEmail)
  const offers = []

  // Check eligibility across tracks
  const eligibleTracks = new Set()
  for (const goal of goals) {
    const { isEligible } = checkEligibility(studentEmail, goal.key)
    if (isEligible) eligibleTracks.add(goal.key)
  }

  const now = Date.now()

  // Track offer timestamps in localStorage so countdowns don't reset on every render
  const offerTimestampsKey = `road2code_job_offer_timestamps_${studentEmail}`
  const offerTimestamps = safeRead(offerTimestampsKey, {})
  let timestampsChanged = false

  for (const job of jobs) {
    const isEligible = eligibleTracks.has(job.track)
    if (!isEligible) continue

    if (!offerTimestamps[job.id]) {
      offerTimestamps[job.id] = now
      timestampsChanged = true
    }

    const offeredAt = offerTimestamps[job.id]
    const deadlineMs = offeredAt + (job.deadlineHours || 48) * 3600 * 1000
    const remainingMs = Math.max(0, deadlineMs - now)
    const application = applications[job.id]

    let status = 'offered'
    if (application) {
      status = 'interview_accepted'
    } else if (remainingMs <= 0) {
      status = 'expired'
    }

    offers.push({
      ...job,
      offeredAt,
      deadlineMs,
      remainingMs,
      status,
      application: application || null,
    })
  }

  if (timestampsChanged) {
    safeWrite(offerTimestampsKey, offerTimestamps)
  }

  return offers
}

/**
 * Accepts an interview slot for a job offer before deadline.
 */
export function acceptInterviewSlot(studentEmail, jobId, slot) {
  if (!studentEmail || !jobId || !slot) return { ok: false, error: 'Missing parameters' }

  const offers = getStudentOffers(studentEmail)
  const offer = offers.find(o => o.id === jobId)
  if (!offer) {
    return { ok: false, error: 'Job offer not found or you are not currently eligible.' }
  }
  if (offer.status === 'expired') {
    return { ok: false, error: 'Interview deadline has expired for this offer.' }
  }

  const apps = getStudentApplications(studentEmail)
  const application = {
    jobId,
    slot,
    acceptedAt: Date.now(),
    status: 'interview_accepted',
    company: offer.company,
    role: offer.role,
  }

  apps[jobId] = application
  safeWrite(jobApplicationsKey(studentEmail), apps)

  return { ok: true, application }
}

/**
 * Formats countdown time e.g. "1d 14h 22m left to accept"
 */
export function formatRemainingOfferTime(ms) {
  if (ms <= 0) return 'Deadline expired'
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const days = Math.floor(hours / 24)
  const remHours = hours % 24

  if (days > 0) {
    return `${days}d ${remHours}h left to accept`
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m left to accept`
  }
  return `${minutes}m left to accept`
}

/**
 * Summary of a student's job status for a given track (used in Mentor dashboard).
 */
export function getStudentTrackJobStatus(studentEmail, trackKey) {
  const { isEligible } = checkEligibility(studentEmail, trackKey)
  if (!isEligible) return { label: 'Not yet eligible', status: 'ineligible' }

  const offers = getStudentOffers(studentEmail).filter(o => o.track === trackKey)
  const accepted = offers.find(o => o.status === 'interview_accepted')
  if (accepted) {
    return { label: `Interview scheduled (${accepted.company})`, status: 'scheduled', detail: accepted.application?.slot }
  }
  const pending = offers.find(o => o.status === 'offered')
  if (pending) {
    return { label: `Offer active (${pending.company})`, status: 'active' }
  }
  return { label: 'Eligible for offers', status: 'eligible' }
}

export const jobService = {
  checkEligibility,
  getAllJobs,
  getJobsByTrack,
  getStudentApplications,
  getStudentOffers,
  acceptInterviewSlot,
  formatRemainingOfferTime,
  getStudentTrackJobStatus,
}

export default jobService

