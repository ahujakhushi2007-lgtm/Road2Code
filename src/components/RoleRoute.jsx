import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Shows the page only to users with the permitted role(s).
// Non-logged-in visitors or users with unauthorized roles are redirected to home.
function RoleRoute({ children, allowedRoles = ['student'] }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/" replace />
  }

  const role = currentUser.role || 'student'
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RoleRoute

