// Draws a list of stops like a metro line: a coloured bar with one station per stop.
// `activeIndex` highlights one station. `compact` draws only the dots (used in lists).
function RouteLine({ stops, color, activeIndex = -1, compact = false }) {
  return (
    <ol
      className={`route-line ${compact ? 'route-line--compact' : ''}`}
      style={{ '--track': color, '--count': stops.length }}
    >
      {stops.map((stop, index) => (
        <li
          key={stop}
          className={`route-line__stop ${index === activeIndex ? 'is-active' : ''}`}
          style={{ '--i': index }}
        >
          <span className="route-line__dot" aria-hidden="true" />
          <span className={compact ? 'sr-only' : 'route-line__label'}>{stop}</span>
        </li>
      ))}
    </ol>
  )
}

export default RouteLine
