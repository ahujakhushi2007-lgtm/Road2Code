import { referralsKey, safeRead, safeWrite } from '../utils/storage'

export function getStudentReferralData(studentEmail, studentName) {
  if (!studentEmail) {
    return { code: 'ROAD50', invitesCount: 0, earnings: 0 }
  }

  const prefix = (studentName || 'STUDENT').replace(/[^a-zA-Z]/g, '').slice(0, 5).toUpperCase()
  const defaultData = {
    code: `${prefix}50`,
    invitesCount: 2,
    earnings: 200,
    discountAmount: 50,
  }

  return safeRead(referralsKey(studentEmail), defaultData)
}

export function recordReferralUse(referrerEmail) {
  if (!referrerEmail) return
  const current = safeRead(referralsKey(referrerEmail), { invitesCount: 0, earnings: 0 })
  const updated = {
    ...current,
    invitesCount: (current.invitesCount || 0) + 1,
    earnings: (current.earnings || 0) + 100,
  }
  safeWrite(referralsKey(referrerEmail), updated)
  return updated
}

export const referralService = {
  getStudentReferralData,
  recordReferralUse,
}

export default referralService

