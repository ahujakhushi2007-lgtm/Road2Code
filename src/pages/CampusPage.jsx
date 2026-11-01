import { useState } from 'react'
import {
  Building2,
  CheckCircle2,
  Download,
  Search,
} from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import { useToast } from '../context/ToastContext'

const collegeBatches = [
  {
    id: 'st-1',
    name: 'Aarav Sharma',
    rollNo: '22CS104',
    track: 'Frontend Developer',
    stopsDone: 8,
    totalStops: 8,
    certified: true,
    readiness: 'Placement Ready',
    cgpa: 8.8,
  },
  {
    id: 'st-2',
    name: 'Rohan Mehra',
    rollNo: '22CS119',
    track: 'Frontend Developer',
    stopsDone: 8,
    totalStops: 8,
    certified: true,
    readiness: 'Placement Ready',
    cgpa: 8.5,
  },
  {
    id: 'st-3',
    name: 'Simran Kaur',
    rollNo: '22IT045',
    track: 'Full-Stack Developer',
    stopsDone: 6,
    totalStops: 8,
    certified: false,
    readiness: 'In Progress (75%)',
    cgpa: 8.2,
  },
  {
    id: 'st-4',
    name: 'Kunal Verma',
    rollNo: '22CS088',
    track: 'DevOps Engineer',
    stopsDone: 5,
    totalStops: 8,
    certified: false,
    readiness: 'In Progress (62%)',
    cgpa: 7.9,
  },
  {
    id: 'st-5',
    name: 'Pooja Nair',
    rollNo: '22EC032',
    track: 'AI / ML Engineer',
    stopsDone: 8,
    totalStops: 8,
    certified: true,
    readiness: 'Placement Ready',
    cgpa: 9.1,
  },
]

function CampusPage() {
  const showToast = useToast()
  const [query, setQuery] = useState('')

  const filtered = collegeBatches.filter(
    s => s.name.toLowerCase().includes(query.toLowerCase()) || s.rollNo.toLowerCase().includes(query.toLowerCase())
  )

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Roll No,Name,Track,Stops Completed,Certified,Readiness,CGPA',
        ...collegeBatches.map(b => `${b.rollNo},"${b.name}","${b.track}",${b.stopsDone}/${b.totalStops},${b.certified ? 'YES' : 'NO'},"${b.readiness}",${b.cgpa}`)
      ].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'road2code_campus_placement_report.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Campus Placement Report exported to CSV!')
  }

  return (
    <section className="page">
      <header className="page-head page-head--wide">
        <div className="campus-header-badge">
          <Building2 size={16} aria-hidden="true" />
          <span>University & Campus Placement Portal</span>
        </div>
        <h1>Campus TPO Analytics Dashboard</h1>
        <p>
          Monitor cohort curriculum progress, verified student credentials, and placement readiness
          across engineering departments in real time.
        </p>
      </header>

      {/* College Stats Overview */}
      <dl className="stats">
        <div><dt>Batch Enrollment</dt><dd>184</dd></div>
        <div><dt>Average Progress</dt><dd>74%</dd></div>
        <div><dt>Verified Certified</dt><dd>62</dd></div>
        <div><dt>Placement Ready</dt><dd>48</dd></div>
      </dl>

      <div className="toolbar">
        <div className="search-bar">
          <Search size={16} aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by student name or roll number..."
            aria-label="Search student roster"
          />
        </div>

        <button type="button" className="btn btn--primary" onClick={handleExport}>
          <Download size={15} aria-hidden="true" /> Export TPO Report (CSV)
        </button>
      </div>

      <div className="campus-table-card">
        <table className="campus-table">
          <thead>
            <tr>
              <th scope="col">Roll No</th>
              <th scope="col">Student</th>
              <th scope="col">Enrolled Route</th>
              <th scope="col">Curriculum Progress</th>
              <th scope="col">Placement Readiness</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(student => (
              <tr key={student.id}>
                <td><code>{student.rollNo}</code></td>
                <td>
                  <strong>{student.name}</strong>
                  <span className="campus-cgpa">CGPA: {student.cgpa}</span>
                </td>
                <td>{student.track}</td>
                <td>
                  <ProgressBar
                    completed={student.stopsDone}
                    total={student.totalStops}
                    color="#6aa6ff"
                    filled={Array.from({ length: student.totalStops }, (_, i) => i < student.stopsDone)}
                  />
                  <small className="campus-progress-sub">{student.stopsDone} of {student.totalStops} stops</small>
                </td>
                <td>
                  <span className={`badge ${student.certified ? 'badge--ok' : 'badge--pending'}`}>
                    {student.certified ? <CheckCircle2 size={12} aria-hidden="true" /> : null}
                    {student.readiness}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CampusPage
