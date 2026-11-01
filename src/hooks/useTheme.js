import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

// The data-theme attribute on <html> decides which set of CSS variables index.css uses.
export function useTheme() {
  const [theme, setTheme] = useLocalStorage('road2code_theme', 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return { theme, toggleTheme }
}
