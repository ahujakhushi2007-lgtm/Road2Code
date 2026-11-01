// A progress bar split into one segment per item, like stations on a line.
// `filled` (optional) says which segments are done, e.g. [true, false, true];
// without it the first `completed` segments are filled, which suits a quiz.
function ProgressBar({ completed, total, unit = 'stops', color, filled }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="progress" style={color ? { '--track': color } : undefined}>
      <div
        className="progress__segments"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${completed} of ${total} ${unit}`}
      >
        {Array.from({ length: total }, (_, index) => {
          const isFilled = filled ? filled[index] : index < completed
          return <span key={index} className={isFilled ? 'is-filled' : undefined} />
        })}
      </div>
      <p className="progress__label">
        <span>{completed} of {total} {unit}</span>
        <span className="progress__percent">{percent}%</span>
      </p>
    </div>
  )
}

export default ProgressBar
