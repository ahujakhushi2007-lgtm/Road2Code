// The logo: a short route from a start station (filled) to a destination (ring).
function BrandMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="brand-mark">
      <path d="M4 17h6l5-9h5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="17" r="2.6" fill="currentColor" />
      <circle cx="20" cy="8" r="2.6" fill="var(--bg)" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  )
}

export default BrandMark
