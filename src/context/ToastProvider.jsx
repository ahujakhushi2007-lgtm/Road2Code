import { useCallback, useEffect, useRef, useState } from 'react'
import { CircleAlert, CircleCheck, X } from 'lucide-react'
import { ToastContext } from './ToastContext'

const TOAST_MS = 3200

function Toast({ toast, onDismiss }) {
  // Each toast removes itself after a few seconds.
  // The cleanup cancels that timer if the toast is closed early.
  useEffect(() => {
    const timerId = setTimeout(() => onDismiss(toast.id), TOAST_MS)
    return () => clearTimeout(timerId)
  }, [toast.id, onDismiss])

  const Icon = toast.type === 'error' ? CircleAlert : CircleCheck

  return (
    <div className={`toast toast--${toast.type}`}>
      <Icon size={18} aria-hidden="true" />
      <p>{toast.message}</p>
      <button className="icon-btn icon-btn--sm" onClick={() => onDismiss(toast.id)} aria-label="Dismiss message">
        <X size={15} />
      </button>
    </div>
  )
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(1) // a counter that survives re-renders without causing one

  const dismiss = useCallback((id) => {
    setToasts(list => list.filter(toast => toast.id !== id))
  }, [])

  const showToast = useCallback((message, type = 'success') => {
    const id = nextId.current++
    setToasts(list => [...list, { id, message, type }].slice(-3)) // keep at most 3 on screen
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
