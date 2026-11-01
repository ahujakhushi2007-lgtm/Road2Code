import { useEffect, useState } from 'react'

// Returns `value` only after it has stopped changing for `delay` milliseconds.
// The search page uses it so results update when you pause typing, not on every key.
export function useDebounce(value, delay = 250) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timerId) // a new key press cancels the old timer
  }, [value, delay])

  return debounced
}
