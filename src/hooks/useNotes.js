import { useLocalStorage } from './useLocalStorage'

// Notes for every step of one roadmap, saved in localStorage.
// Shape: { [stepId]: [{ id, text, updatedAt }] }
// Every change builds a new object and a new array, so React sees the update.
export function useNotes(storageKey) {
  const [notes, setNotes] = useLocalStorage(storageKey, {})

  const notesFor = (stepId) => notes[stepId] ?? []

  const addNote = (stepId, text) => {
    const note = { id: Date.now(), text, updatedAt: Date.now() }
    setNotes(prev => ({ ...prev, [stepId]: [...(prev[stepId] ?? []), note] }))
  }

  const updateNote = (stepId, noteId, text) => {
    setNotes(prev => ({
      ...prev,
      [stepId]: prev[stepId].map(note => (note.id === noteId ? { ...note, text, updatedAt: Date.now() } : note)),
    }))
  }

  const deleteNote = (stepId, noteId) => {
    setNotes(prev => ({ ...prev, [stepId]: prev[stepId].filter(note => note.id !== noteId) }))
  }

  return { notesFor, addNote, updateNote, deleteNote }
}
