import { createContext, useContext } from 'react'

export const ToastContext = createContext(() => {})

// Returns showToast(message, type) to any component inside <ToastProvider>.
export function useToast() {
  return useContext(ToastContext)
}
