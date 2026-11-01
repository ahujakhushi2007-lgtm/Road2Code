import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'
import { navLinks } from '../data/navLinks'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__about">
          <Link to="/" className="brand">
            <BrandMark size={20} />
            <span>Road2Code</span>
          </Link>
          <p>A student project for Front End Engineering-II, built with React and React Router. No backend: your progress stays in your browser.</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default Footer
