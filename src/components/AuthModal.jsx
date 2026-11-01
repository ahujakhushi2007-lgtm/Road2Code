import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

// Login and signup popup. Every input is controlled: its value comes from state,
// and every keystroke updates that state through onChange.
function AuthModal() {
  const navigate = useNavigate()
  const location = useLocation()
  const { authMode, openAuth, closeAuth, login, signup } = useAuth()
  const showToast = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isSignup = authMode === 'signup'

  // Close on Escape. The cleanup removes the listener when the modal closes.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeAuth()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [closeAuth])

  const handleSubmit = (e) => {
    e.preventDefault() // stop the browser from reloading the page
    const result = isSignup ? signup(name, email, password) : login(email, password)

    if (result.ok) {
      const firstName = result.user.name.split(' ')[0]
      showToast(isSignup ? `Account created. Welcome, ${firstName}!` : `Welcome back, ${firstName}!`)
      closeAuth()

      // Guide the user to the right place after login/signup
      if (result.user.role === 'mentor') {
        navigate('/mentor')
      } else if (isSignup) {
        // If user signs up, take them straight to courses to start learning,
        // unless they were already on a specific course roadmap
        if (!location.pathname.startsWith('/roadmap/')) {
          navigate('/courses')
        }
      }
    } else {
      setError(result.error)
    }
  }

  const switchMode = () => {
    setError('')
    openAuth(isSignup ? 'login' : 'signup')
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) closeAuth() }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="icon-btn modal__close" onClick={closeAuth} aria-label="Close">
          <X size={18} />
        </button>

        <h2 id="auth-title">{isSignup ? 'Create your account' : 'Log in'}</h2>
        <p className="modal__sub">
          {isSignup
            ? 'Keep your routes, ticks and notes under your own name.'
            : 'Pick up your routes where you left off.'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <label className="field">
              <span>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                autoComplete="name"
                required
                autoFocus
              />
            </label>
          )}
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              autoFocus={!isSignup}
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 4 characters"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              minLength={4}
              required
            />
          </label>

          {error && <p className="field-error" role="alert">{error}</p>}

          <button type="submit" className="btn btn--primary btn--block">
            {isSignup ? 'Create account' : 'Log in'}
          </button>
        </form>

        <p className="modal__switch">
          {isSignup ? 'Already have an account?' : 'New here?'}{' '}
          <button type="button" className="text-btn" onClick={switchMode}>
            {isSignup ? 'Log in' : 'Create an account'}
          </button>
        </p>

        <p className="modal__note">Demo project: accounts are stored only in this browser.</p>
      </div>
    </div>
  )
}

export default AuthModal
