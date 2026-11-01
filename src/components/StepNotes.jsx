import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useToast } from '../context/ToastContext'

const MAX_LENGTH = 280

function validate(text) {
  if (text.trim() === '') return 'Write something before saving.'
  if (text.length > MAX_LENGTH) return `Keep notes under ${MAX_LENGTH} characters.`
  return ''
}

const formatDate = (time) => new Date(time).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

// Create, read, update and delete notes for one roadmap step.
// The notes themselves live in useNotes (in Roadmap); this component only shows the form and the list.
function StepNotes({ notes, onAdd, onUpdate, onDelete }) {
  const showToast = useToast()
  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [error, setError] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    const problem = validate(draft)
    if (problem) {
      setError(problem)
      return
    }
    onAdd(draft.trim())
    setDraft('')
    setError('')
    showToast('Note added')
  }

  const startEditing = (note) => {
    setEditingId(note.id)
    setEditText(note.text)
    setError('')
  }

  const handleSave = (noteId) => {
    const problem = validate(editText)
    if (problem) {
      setError(problem)
      return
    }
    onUpdate(noteId, editText.trim())
    setEditingId(null)
    setError('')
    showToast('Note updated')
  }

  const handleDelete = (noteId) => {
    onDelete(noteId)
    showToast('Note deleted')
  }

  return (
    <div className="notes">
      {notes.length === 0 && (
        <p className="panel-empty">No notes yet. Write down what clicked, or what to revise later.</p>
      )}

      {notes.length > 0 && (
        <ul className="notes__list">
          {notes.map(note => (
            <li key={note.id} className="note">
              {editingId === note.id ? (
                <div className="note__edit">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                    aria-label="Edit note"
                    autoFocus
                  />
                  <div className="note__edit-actions">
                    <button className="btn btn--sm btn--primary" onClick={() => handleSave(note.id)}>Save</button>
                    <button className="btn btn--sm" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="note__text">{note.text}</p>
                  <div className="note__meta">
                    <time dateTime={new Date(note.updatedAt).toISOString()}>{formatDate(note.updatedAt)}</time>
                    <button className="icon-btn icon-btn--sm" onClick={() => startEditing(note)} aria-label="Edit note">
                      <Pencil size={14} />
                    </button>
                    <button className="icon-btn icon-btn--sm" onClick={() => handleDelete(note.id)} aria-label="Delete note">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <form className="notes__form" onSubmit={handleAdd}>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a note about this stop"
          rows={2}
          aria-label="New note"
        />
        <div className="notes__form-row">
          <span className={`notes__count ${draft.length > MAX_LENGTH ? 'is-over' : ''}`}>
            {draft.length}/{MAX_LENGTH}
          </span>
          <button type="submit" className="btn btn--sm btn--primary">Add note</button>
        </div>
        {error && <p className="field-error" role="alert">{error}</p>}
      </form>
    </div>
  )
}

export default StepNotes
