import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CommandPalette from './CommandPalette'

// The shell around every page. <Outlet /> renders whichever child route matches the URL.
function Layout() {
  const { pathname } = useLocation()
  const [paletteOpen, setPaletteOpen] = useState(false)

  // A new page should start at the top, not where the previous page was scrolled to.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  // Ctrl+K (Windows) or ⌘K (Mac) opens the command palette from any page.
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(open => !open)
      }
    }
    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [])

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
    </div>
  )
}

export default Layout
