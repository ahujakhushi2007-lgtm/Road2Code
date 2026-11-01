import { mockInterviewScoresKey, safeRead, safeWrite } from '../utils/storage'

export const interviewQuestions = {
  frontend: [
    {
      id: 1,
      q: 'How does the React Virtual DOM diffing algorithm optimize DOM updates, and what role do keys play in list reconciliation?',
      hint: 'Mention O(N) heuristic diffing, element types, and key stability.',
    },
    {
      id: 2,
      q: 'Explain the CSS Box Model and the difference between content-box and border-box.',
      hint: 'Include padding, border, margin calculations on dimensions.',
    },
    {
      id: 3,
      q: 'What is a JavaScript closure and how would you use one to build a debounce function?',
      hint: 'Lexical scope retention and timer clearance.',
    },
    {
      id: 4,
      q: 'How do you prevent unnecessary component re-renders in a large React 19 tree?',
      hint: 'React.memo, useCallback, useMemo, and proper state lifting.',
    },
    {
      id: 5,
      q: 'Describe how you ensure web accessibility (a11y) in a custom dropdown component.',
      hint: 'ARIA roles (combobox, listbox), keyboard navigation (arrows, escape), and focus trap.',
    },
  ],
  backend: [
    {
      id: 1,
      q: 'Explain ACID transactions in relational databases and how isolation levels prevent dirty reads.',
      hint: 'Atomicity, Consistency, Isolation, Durability with read committed / serializable.',
    },
    {
      id: 2,
      q: 'How does Node.js handle thousands of concurrent requests with a single execution thread?',
      hint: 'Event loop, libuv thread pool, and non-blocking asynchronous I/O.',
    },
    {
      id: 3,
      q: 'What is the N+1 query problem in database ORMs and how do you resolve it?',
      hint: 'Eager loading, joins, and batching.',
    },
    {
      id: 4,
      q: 'Differentiate between JWT tokens and stateful server sessions for microservices auth.',
      hint: 'Stateless verification vs central session store (Redis) revocation.',
    },
    {
      id: 5,
      q: 'How do you design an API rate limiter to protect backend services against DDoS attacks?',
      hint: 'Token bucket / leaky bucket algorithm with Redis sliding windows.',
    },
  ],
  devops: [
    {
      id: 1,
      q: 'What is the architectural difference between a Docker container and a Virtual Machine?',
      hint: 'Kernel namespaces & cgroups vs hypervisor guest OS emulation.',
    },
    {
      id: 2,
      q: 'Explain how Kubernetes handles Pod self-healing when a worker node fails.',
      hint: 'Kubelet, control plane controller manager, and replica sets.',
    },
    {
      id: 3,
      q: 'What are the principles of zero-downtime deployment (Blue/Green vs Canary)?',
      hint: 'Traffic shifting via load balancer / ingress and health check verification.',
    },
    {
      id: 4,
      q: 'How do you secure secrets in a CI/CD pipeline without committing them to Git?',
      hint: 'Environment secrets, Vault, sealed secrets, and ephemeral runner tokens.',
    },
    {
      id: 5,
      q: 'Describe how you would debug a high-latency 502 Bad Gateway error on an Nginx reverse proxy.',
      hint: 'Upstream connection timeouts, server sockets, and system resource limits.',
    },
  ],
}

export function getInterviewQuestions(trackKey) {
  return interviewQuestions[trackKey] || interviewQuestions.frontend
}

export function saveMockInterviewResult(studentEmail, trackKey, { score, feedback, breakdown }) {
  const key = mockInterviewScoresKey(studentEmail, trackKey)
  const result = {
    id: `mock-${Date.now()}`,
    trackKey,
    score,
    feedback,
    breakdown,
    completedAt: Date.now(),
  }
  safeWrite(key, result)
  return result
}

export function getMockInterviewResult(studentEmail, trackKey) {
  if (!studentEmail || !trackKey) return null
  return safeRead(mockInterviewScoresKey(studentEmail, trackKey), null)
}

export const mockInterviewService = {
  getInterviewQuestions,
  saveMockInterviewResult,
  getMockInterviewResult,
}

export default mockInterviewService

