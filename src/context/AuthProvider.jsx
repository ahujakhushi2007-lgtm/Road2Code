import { useCallback, useState } from 'react'
import { AuthContext } from './AuthContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { mentors } from '../data/mentors'

// Base64 is encoding, not encryption. Fine for a browser-only demo, never for real passwords.
function encode(text) {
  return btoa(unescape(encodeURIComponent(text)))
}

function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('road2code_users', {})        // { email: { name, email, password, role } }
  const [session, setSession] = useLocalStorage('road2code_session', null) // email of the logged-in user
  const [authMode, setAuthMode] = useState(null)                           // null | 'login' | 'signup'

  // Resolve current user: check standard registered users first, then seeded demo mentors
  let currentUser = null
  if (session) {
    const rawUser = users[session]
    if (rawUser) {
      currentUser = {
        ...rawUser,
        role: rawUser.role || 'student',
      }
    } else {
      const seededMentor = mentors.find(m => m.email.toLowerCase() === session)
      if (seededMentor) {
        currentUser = seededMentor
      }
    }
  }

  const signup = (name, email, password) => {
    const key = email.trim().toLowerCase()

    if (!name.trim() || !key || !password) {
      return { ok: false, error: 'Fill in every field to continue.' }
    }
    // Check if user exists or if email is reserved by a demo mentor
    if (users[key] || mentors.some(m => m.email.toLowerCase() === key)) {
      return { ok: false, error: 'An account with that email already exists.' }
    }

    // Signup is strictly student-only
    const user = {
      name: name.trim(),
      email: key,
      password: encode(password),
      role: 'student',
    }
    setUsers({ ...users, [key]: user })
    setSession(key)
    return { ok: true, user }
  }

  const login = (email, password) => {
    const key = email.trim().toLowerCase()
    const user = users[key]

    // Check normal registered user
    if (user) {
      if (user.password !== encode(password)) {
        return { ok: false, error: 'Email or password is incorrect.' }
      }
      setSession(key)
      return { ok: true, user: { ...user, role: user.role || 'student' } }
    }

    // Check seeded demo mentors
    const mentor = mentors.find(m => m.email.toLowerCase() === key)
    if (mentor) {
      const matches = mentor.password === password || mentor.password === encode(password)
      if (!matches) {
        return { ok: false, error: 'Email or password is incorrect.' }
      }
      setSession(key)
      return { ok: true, user: mentor }
    }

    return { ok: false, error: 'Email or password is incorrect.' }
  }

  const logout = () => setSession(null)

  // useCallback keeps closeAuth the same function across renders, so the
  // Escape-key effect in AuthModal (which depends on it) only runs when the modal opens.
  const closeAuth = useCallback(() => setAuthMode(null), [])

  const value = { currentUser, signup, login, logout, authMode, openAuth: setAuthMode, closeAuth }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
