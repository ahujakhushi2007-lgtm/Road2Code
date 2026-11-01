import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Shows the page only to logged-in users. Everyone else is redirected to the home page.
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
