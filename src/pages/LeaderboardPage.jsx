import { useState } from 'react'
import { Flame, Trophy, Zap } from 'lucide-react'
import { getCohortLeaderboard } from '../services/streakService'
import { goals } from '../data/goals'

function LeaderboardPage() {
  const [selectedTrack, setSelectedTrack] = useState('all')

  const leaderboard = getCohortLeaderboard(selectedTrack)

  return (
    <section className="page">
      <header className="page-head page-head--wide">
        <div className="leaderboard-badge-tag">
          <Trophy size={16} aria-hidden="true" />
          <span>Active Learning Cohort</span>
        </div>
        <h1>Cohort Leaderboard</h1>
        <p>
          Rankings updated in real time based on learning consistency, completed roadmap stops,
          daily streaks, and verified project submissions.
        </p>
      </header>

      {/* Filter by track */}
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filter leaderboard by track">
          <button
            className={`chip ${selectedTrack === 'all' ? 'is-on' : ''}`}
            aria-pressed={selectedTrack === 'all'}
            onClick={() => setSelectedTrack('all')}
          >
            All Tracks
          </button>
          {goals.map(g => (
            <button
              key={g.key}
              className={`chip ${selectedTrack === g.key ? 'is-on' : ''}`}
              aria-pressed={selectedTrack === g.key}
              onClick={() => setSelectedTrack(g.key)}
            >
              {g.short}
            </button>
          ))}
        </div>
      </div>

      <div className="leaderboard-table-card">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th scope="col" className="col-rank">Rank</th>
              <th scope="col">Student</th>
              <th scope="col">Daily Streak</th>
              <th scope="col">Total XP</th>
              <th scope="col">Cohort Honor</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(item => {
              const isTop3 = item.rank <= 3
              return (
                <tr key={item.email} className={`leaderboard-row ${isTop3 ? `is-top-${item.rank}` : ''}`}>
                  <td className="col-rank">
                    {item.rank === 1 ? (
                      <span className="rank-medal medal-gold">🥇 1</span>
                    ) : item.rank === 2 ? (
                      <span className="rank-medal medal-silver">🥈 2</span>
                    ) : item.rank === 3 ? (
                      <span className="rank-medal medal-bronze">🥉 3</span>
                    ) : (
                      <span className="rank-num">#{item.rank}</span>
                    )}
                  </td>
                  <td>
                    <div className="leaderboard-user-cell">
                      <span className="avatar avatar--sm">{item.name.charAt(0)}</span>
                      <div>
                        <strong>{item.name}</strong>
                        <span className="leaderboard-track-tag">{item.track}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="streak-pill">
                      <Flame size={13} className="icon-fire" aria-hidden="true" />
                      <span>{item.streak} days</span>
                    </span>
                  </td>
                  <td>
                    <span className="xp-pill">
                      <Zap size={13} className="icon-gold" aria-hidden="true" />
                      <span>{item.xp} XP</span>
                    </span>
                  </td>
                  <td>
                    <span className="badge badge--ok">{item.badge}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default LeaderboardPage
