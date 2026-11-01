import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

// Any component inside <AuthProvider> can call useAuth() instead of receiving auth data as props.
export function useAuth() {
  return useContext(AuthContext)
}
