import { goals } from './goals'
import { getMentorByTrack } from '../services/mentorService'

// Generates scheduled daily doubt sessions per track.
// Default daily doubt slot is 7:00 PM IST.
const topicRotations = {
  frontend: [
    'React 19 Hooks & Concurrent State Tuning',
    'CSS Grid, Subgrid & Complex Layouts Masterclass',
    'Next.js App Router Architecture & Server Actions',
    'Web Performance: Core Web Vitals & Bundle Auditing',
    'Building Accessible Component Libraries with ARIA',
    'TypeScript Generics & React Component Typings',
  ],
  backend: [
    'PostgreSQL Query Optimization & EXPLAIN ANALYZE',
    'Designing Scalable RESTful API Contracts',
    'Node.js Event Loop Debugging & Memory Leak Detection',
    'Distributed Auth: JWT vs Session Store Tradeoffs',
    'Database Migrations & Zero-Downtime Releases',
    'Message Queues with Redis & Background Worker Patterns',
  ],
  fullstack: [
    'Connecting React State with Express API Microservices',
    'End-to-End Type Safety from Database to Client',
    'Full-Stack File Uploads to Cloud Storage (S3)',
    'Real-time WebSockets with Socket.io in React & Node',
    'Full-Stack Authentication and Cookie Security',
    'Deploying Full-Stack Applications with Docker & CI/CD',
  ],
  aiml: [
    'PyTorch Tensor Operations & Autograd Backpropagation',
    'Fine-Tuning Transformer Models for Domain Q&A',
    'Feature Engineering & Data Pipeline Hygiene with Pandas',
    'Overfitting vs Underfitting: Regularization & Dropout',
    'Vector Databases & Semantic Embeddings Overview',
    'Deploying ML Inference APIs with FastAPI & Docker',
  ],
  datascience: [
    'Exploratory Data Analysis: Finding the Signal in the Noise',
    'Advanced SQL Window Functions for Business Intelligence',
    'Statistical Hypothesis Testing in Real-World Scenarios',
    'Interactive Dashboards & Data Visualization Storytelling',
    'Handling Skewed Data & Missing Value Imputation',
    'Machine Learning Pipelines with Scikit-Learn',
  ],
  devops: [
    'Troubleshooting Kubernetes Pod CrashLoopBackOffs',
    'Writing Production-Grade Multi-Stage Dockerfiles',
    'GitHub Actions CI/CD Secrets & Matrix Builds',
    'Linux System Performance Profiling (top, iotop, perf)',
    'Nginx Reverse Proxying, SSL/TLS, and Load Balancing',
    'Infrastructure as Code (Terraform) State Management',
  ],
  cloud: [
    'AWS VPC Architecture: Subnets, Route Tables & NAT',
    'Cost Optimization Strategies on AWS Compute & Storage',
    'Serverless APIs with AWS Lambda & API Gateway',
    'Securing Cloud Workloads with IAM Policies & Roles',
    'High Availability & Multi-AZ Disaster Recovery Planning',
    'Container Orchestration with AWS ECS and Fargate',
  ],
  cybersecurity: [
    'OWASP Top 10: Live Exploitation & Defense Deep Dive',
    'Analyzing Packet Captures with Wireshark',
    'Defending Against SQL Injection & Reflected XSS',
    'Linux Privilege Escalation Vectors & System Hardening',
    'Secure Secrets Management & Cryptographic Hygiene',
    'Network Penetration Testing Methodology & Nmap Probing',
  ],
  android: [
    'Jetpack Compose State Hoisting & Recomposition Debugging',
    'Kotlin Coroutines & Flow for Asynchronous Networking',
    'Room Database Setup with SQLite & Foreign Key Mappings',
    'Android Navigation Component with Deep Linking',
    'Dependency Injection with Hilt in Modern Android Apps',
    'Publishing & Preparing Android APKs for Google Play',
  ],
  uiux: [
    'Figma Auto Layout 5.0 & Responsive Component Variants',
    'Building Accessible Dark Mode Color Tokens',
    'Usability Testing: Formulating Actionable User Tasks',
    'Micro-Interactions & Prototyping Transitions in Figma',
    'Typography Hierarchy and Vertical Rhythm Rules',
    'Presenting Design Systems to Engineering Teams',
  ],
  gamedev: [
    'Game Loop Architecture & FixedUpdate Physics Optimization',
    'C# Event-Driven Architecture for Gameplay Mechanics',
    'Raycasting, LayerMasks & Hit Detection in 3D',
    'Object Pooling for Bullet Spawning and Particle Effects',
    'Shader Graph Basics & Custom Lighting in Unity',
    'State Machines for Enemy AI & Boss Behaviors',
  ],
  dsa: [
    'Two-Pointer & Sliding Window Masterclass on Arrays',
    'Binary Search Variations & Search Space Reduction',
    'Dynamic Programming: Memoization vs Tabulation Breakdown',
    'Graph Traversals: BFS vs DFS and Cycle Detection',
    'Tree Recursion & Lowest Common Ancestor (LCA)',
    'Backtracking Patterns: Subsets, Permutations & N-Queens',
  ],
}

/**
 * Returns today's scheduled live session for a given track.
 */
export function getTodaySession(trackKey) {
  const goal = goals.find(g => g.key === trackKey) || goals[0]
  const mentor = getMentorByTrack(trackKey)
  const topics = topicRotations[trackKey] || topicRotations.frontend

  // Deterministic daily topic based on day of year
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24))
  const topic = topics[dayOfYear % topics.length]

  // Scheduled at 7:00 PM IST today
  const sessionDate = new Date(now)
  sessionDate.setHours(19, 0, 0, 0) // 19:00 (7:00 PM)

  const isPast = now.getTime() > sessionDate.getTime() + 60 * 60 * 1000 // 1 hour duration
  const isHappeningNow = now.getTime() >= sessionDate.getTime() && now.getTime() <= sessionDate.getTime() + 60 * 60 * 1000

  return {
    id: `live-${trackKey}-${now.toISOString().slice(0, 10)}`,
    trackKey,
    trackLabel: goal.label,
    trackColor: goal.color,
    topic,
    mentorName: mentor.name,
    mentorTitle: mentor.title,
    mentorEmail: mentor.email,
    timeString: '7:00 PM – 8:00 PM IST',
    scheduledTime: sessionDate.getTime(),
    isPast,
    isHappeningNow,
    joinUrl: 'https://meet.google.com/demo-r2c-session', // Placeholder
    recordingStatus: isPast ? 'coming_soon' : null,
  }
}

/**
 * Returns scheduled sessions for all 12 tracks for today.
 */
export function getAllLiveSessions() {
  return goals.map(g => getTodaySession(g.key))
}

/**
 * Returns past mock sessions for a track.
 */
export function getPastLiveSessions(trackKey) {
  const goal = goals.find(g => g.key === trackKey) || goals[0]
  const mentor = getMentorByTrack(trackKey)
  const topics = topicRotations[trackKey] || topicRotations.frontend

  return [
    {
      id: `past-1-${trackKey}`,
      trackKey,
      trackLabel: goal.label,
      topic: topics[0],
      mentorName: mentor.name,
      dateString: 'Yesterday at 7:00 PM IST',
      recordingStatus: 'coming_soon',
    },
    {
      id: `past-2-${trackKey}`,
      trackKey,
      trackLabel: goal.label,
      topic: topics[1],
      mentorName: mentor.name,
      dateString: '2 days ago at 7:00 PM IST',
      recordingStatus: 'coming_soon',
    },
  ]
}

