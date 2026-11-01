# Road2Code

Road2Code is a modern career roadmap platform turned paid-course learning ecosystem with
structured study notes, daily live doubt mentorship sessions, verified certificates of completion,
and curated partner job interview pipelines.

Every course is ₹499 with a free 3-day demo. Progress is tracked per student in the browser,
and all data access is decoupled behind a dedicated `src/services/` layer ready to connect to
Firebase or Supabase.

---

## Run it

```bash
npm install
npm run dev      # start dev server, then open http://localhost:5173
npm run build    # production build in dist/
npm run lint     # check the code with oxlint (0 warnings, 0 errors)
```

---

## Routes & Pages

| Page | Route | Access | What it does |
| --- | --- | --- | --- |
| Home | `/` | Public | Interactive route preview cycling through 12 careers + daily coding challenge |
| Courses | `/courses` | Public | All career tracks, ₹499 pricing, "How it works" workflow strip, category filtering and sorting |
| Generator | `/generator` | Public | Choose a career track, tick what you already know, plan a custom route |
| Roadmap | `/roadmap/:goalKey` | Public / Students | 8-stop ordered route, 3-day demo banner, mock checkout modal, study notes, live session card, mentor ideas |
| Quiz | `/quiz` | Public | 6 questions that rank your 3 best-fit career paths |
| Search | `/search` | Public | Debounced search across all 96 curriculum stops with highlights and filters |
| Prereqs | `/prerequisites` | Public | Visual dependency map of what to learn before and after each technology |
| About | `/about` | Public | Platform mission, dynamic curriculum statistics, architecture breakdown, and demo disclaimer |
| Live Doubts | `/live` | Public | Daily 7:00 PM IST doubt schedule per track, mentor profiles, and advance doubt submission |
| My Progress | `/progress` | Students (Logged-in) | Completed stops, active tracks, and earned certificate badges |
| My Courses | `/my-courses` | Students (Logged-in) | Paid enrollments, active 3-day demos with countdowns, expired demos, and certificates |
| Jobs | `/jobs` | Students (Logged-in) | Eligibility checklist, partner job opportunities, slot selection, and acceptance countdowns |
| Portfolio | `/portfolio` & `/portfolio/:studentEmail` | Public / Students | Verified proof-of-work portfolio with live projects, code review badges, certificates, and mentor testimonials |
| ATS Resume Builder | `/resume` | Students (Logged-in) | 1-Click ATS-optimized resume generator with auto-populated coursework, projects, and print-to-PDF |
| Cohort Leaderboard | `/leaderboard` | Public / Students | Track-wise daily streak rankings, total XP points, and cohort badges |
| AI Mock Interview | `/mock-interview` | Students (Logged-in) | Track-specific AI technical interview simulator with automated scoring and feedback |
| Campus TPO Portal | `/campus` | Public / Institutional | College placement cell analytics dashboard with batch completion filters, job-readiness ratings, and CSV export |
| Refer & Earn | `/refer` | Students (Logged-in) | Student affiliate system with unique referral links and wallet bonus tracking |
| Mentor Dashboard | `/mentor` | Mentors only | Enrolled student rosters, per-stop inspection, interview recommendations, project code reviews, and project ideas |
| Certificate | `/certificate/:certId` | Public | A4 landscape completion credential with student name, mentor title, unique ID, and PDF download |
| Verify | `/verify` & `/verify/:certId` | Public | Public credential verification registry validating authentic certificate IDs |
| 404 | any other URL | Public | Graceful not-found recovery page |

---

## Platform Features & Roles

### 1. User Roles & Seed Mentor Accounts
- **Students**: Self-registered accounts via the Auth modal. Can start 3-day demos, enroll for ₹499, earn certificates, and interview for jobs.
- **Mentors**: Seeded industry experts configured in `src/data/mentors.js`. Mentors log in via the same Auth modal:
  - **Priya Sharma** (`priya.sharma@road2code.dev` / `mentor123`) — *Frontend & UI Specialist*
  - **Dr. Rajesh Verma** (`rajesh.verma@road2code.dev` / `mentor123`) — *Data Science & AI/ML Specialist*
  - **Ananya Iyer** (`ananya.iyer@road2code.dev` / `mentor123`) — *Cloud & DevOps Architect*

### 2. Pricing & 3-Day Demo (`COURSE_PRICE_INR = 499`)
- Each track has a status: `'none'` | `'demo'` | `'demo_expired'` | `'paid'`.
- **3-Day Demo**: Unlocks stops 1 & 2, notes preview, and 1 demo doubt session. The banner displays the remaining time computed strictly from `demoStartedAt` timestamps.
- **Demo Expired**: At 3 days, the roadmap transitions to a locked screen offering the full course for ₹499. All user progress and notes are kept intact.
- **Mock Checkout**: Dedicated `CheckoutModal` supporting UPI, Debit/Credit Card, and Netbanking with validation, simulated 1.5s gateway processing, and success toast confirmation.

### 3. Paid Perks
- **Structured Study Notes**: In-depth concepts, key points, and revision checklists for every stop (`src/data/courseNotes.js`). Includes one-click Markdown file download.
- **Daily Live Doubt Sessions**: Daily 7:00 PM IST doubt sessions per track (`src/data/liveSessions.js`), live Google Meet link placeholder, and advance doubt submission form.
- **Mentor Project Ideas**: Practical portfolio challenges posted by mentors appearing directly on student roadmaps.

### 4. Mentor Dashboard (`/mentor`)
- Protected by `RoleRoute`.
- View students enrolled across the mentor's tracks with progress bars, completion counts, last active timestamps, and notes count.
- Detailed student inspection with quick actions:
  - **"Recommend for interview"** (unlocks job offers for the student)
  - **"Add feedback note"** (persistent mentor feedback on student progress)
- Full CRUD project ideas form (create, edit, delete).

### 5. Certificates & Public Verification (`/certificate/:certId` & `/verify/:certId`)
- Unlocked when a **paid** student finishes all 8 stops of a track.
- Clean A4 landscape certificate with student name, track title, mentor signature block, issue date, and unique ID (`R2C-TRACK-YEAR-XXXXXX`).
- Print-to-PDF stylesheet support (`window.print()`) and public verification endpoint (`/verify/:certId`).

### 6. Job Opportunities (`/jobs`)
- **Eligibility criteria**: (1) Course enrolled & paid, (2) All stops finished, (3) Mentor interview recommendation.
- Live countdown to accept interview slots before the deadline expires.
- Instant notifications and badge indicators on the Navbar.

---

## Architecture & Services Layer

All localStorage access is decoupled into a small, modular service layer under `src/services/`:
```
src/
  services/
    enrollmentService.js        # manages COURSE_PRICE_INR, 3-day demo duration, purchases & remaining time
    mentorService.js            # queries mentors, student rosters, recommendations, feedback & project ideas
    jobService.js               # eligibility verification, partner job listings, slot bookings & offers
    certificateService.js       # generates unique IDs, issues credentials & checks public validity
    streakService.js            # daily learning streaks, XP gamification & cohort leaderboard rankings
    projectSubmissionService.js # student GitHub repo submissions, live demos & mentor code review grading
    forumService.js             # stop-level community Q&A discussion board with verified answers
    mockInterviewService.js     # AI technical question evaluations, scoring & feedback
    referralService.js          # student affiliate tracking, referral codes & invite earnings
  utils/
    storage.js             # single source of truth for localStorage keys, safeRead & safeWrite
  context/
    AuthContext.js         # authentication state
    AuthProvider.jsx       # login/signup logic supporting both student accounts and demo mentors
    ToastContext.js        # toast notification dispatch
    ToastProvider.jsx      # floating toast notification component
  components/
    CheckoutModal.jsx      # simulated checkout modal (UPI, Card, Netbanking)
    RoleRoute.jsx          # role-based route guard
    ProtectedRoute.jsx     # auth route guard
    Roadmap.jsx            # interactive roadmap stations, perks, banners & lock screens
    ...
  pages/
    MyCoursesPage.jsx      # /my-courses page
    MentorPage.jsx         # /mentor dashboard
    JobsPage.jsx           # /jobs opportunity board
    LivePage.jsx           # /live daily doubt schedule
    CertificatePage.jsx    # /certificate/:certId certificate view
    VerifyPage.jsx         # /verify/:certId verification page
    ...
  data/
    mentors.js             # demo mentor credentials and track assignments
    courseNotes.js         # structured study notes for curriculum stops
    liveSessions.js        # daily 7:00 PM IST session generation
    jobs.js                # fictional partner job opportunities
    roadmaps.js            # curriculum stops and learning resources
    goals.js               # 12 career tracks and color definitions
```

---

## React Concepts Used

| Concept | Implementation Location |
| --- | --- |
| Reusable Components | `ProgressBar`, `RouteLine`, `TrackIcon`, `BrandMark`, `CheckoutModal` |
| Custom Hooks | `useLocalStorage` (with `safeRead`), `useTheme`, `useNotes`, `useArticles`, `useAuth`, `useToast` |
| Context API | `AuthContext` (student/mentor sessions) and `ToastContext` (notifications) |
| Role-Based Routing | `RoleRoute` (enforces `'student'` vs `'mentor'` access) & `ProtectedRoute` |
| Timestamp-Driven Math | `enrollmentService` (3-day demo expiry) and `jobService` (offer acceptance countdowns) |
| Safe Storage Handlers | `safeRead` & `safeWrite` in `utils/storage.js` to prevent corrupt JSON crashes |
| Download & Print APIs | Blob-based `.md` export in `Roadmap.jsx` and `@media print` CSS in `CertificatePage.jsx` |
| Controlled Forms | `CheckoutModal` (tabs & validation), `StepNotes`, `AuthModal`, `MentorPage` |

---

## Demo Disclaimer

> **Notice:** Road2Code is an educational front-end engineering platform demo. All payment gateways (₹499 checkout), mentor accounts, live Google Meet sessions, and partner job opportunities are simulated in-browser demonstration fixtures. No real money is charged, and no real employment contracts are issued.
