import { useEffect, useState } from 'react'
import { safeRead, safeWrite } from '../utils/storage'

// Works like useState, but the value is also saved in localStorage under `key`,
// so it survives a page refresh. `initialValue` can be a value or a function.
// Safe against corrupt JSON and storage exceptions.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => safeRead(key, initialValue))

  useEffect(() => {
    safeWrite(key, value)
  }, [key, value])

  return [value, setValue]
}
