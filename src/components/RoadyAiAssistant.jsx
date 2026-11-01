import { useState } from 'react'
import { Bot, Lightbulb, Send, Sparkles, User } from 'lucide-react'

const contextualKnowledge = {
  default: {
    summary: 'Mastering this topic requires understanding data flow and proper state encapsulation. Focus on separation of concerns.',
    example: 'Always validate boundary inputs and write clean, modular utility functions.',
    pitfall: 'Avoid mutating source objects directly; always return fresh references.',
  },
}

function RoadyAiAssistant({ stopTopic = 'Web Development' }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'roady',
      text: `Hi! I'm Roady, your 24/7 AI tutor for ${stopTopic}. Ask me to explain a concept, find a bug, or give an interview example.`,
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickPrompts = [
    `Explain ${stopTopic} simply`,
    `Common interview question on ${stopTopic}`,
    `Show a production code pattern`,
  ]

  const sendQuery = (queryText) => {
    const q = queryText.trim()
    if (!q) return

    const userMsg = { id: Date.now(), sender: 'user', text: q }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      let reply = `Here is key insight on "${stopTopic}":\n\n`
      if (q.toLowerCase().includes('interview')) {
        reply += `**Top Interview Question:** "What are the performance tradeoffs and lifecycle implications of ${stopTopic}?"\n\n*Key Tip:* Senior interviewers look for awareness of memory usage, asynchronous edge cases, and code modularity.`
      } else if (q.toLowerCase().includes('simply') || q.toLowerCase().includes('explain')) {
        reply += `Think of ${stopTopic} as a specialized contract in your system architecture. Rather than writing repetitive boilerplate, it organizes logic into predictable, testable units that scale reliably.`
      } else {
        reply += `${contextualKnowledge.default.summary}\n\n**Best Practice:** ${contextualKnowledge.default.example}\n\n**Watch out for:** ${contextualKnowledge.default.pitfall}`
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'roady', text: reply }])
      setIsTyping(false)
    }, 700)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendQuery(input)
  }

  return (
    <div className="roady-ai-panel" role="region" aria-label="Roady AI Assistant">
      <div className="roady-ai-head">
        <div className="roady-ai-brand">
          <div className="roady-avatar">
            <Bot size={18} aria-hidden="true" />
          </div>
          <div>
            <h4>Roady AI Tutor</h4>
            <span className="roady-status-tag">Online • 24/7 Knowledge Base</span>
          </div>
        </div>
      </div>

      <div className="roady-messages-box">
        {messages.map(m => (
          <div key={m.id} className={`roady-msg roady-msg--${m.sender}`}>
            <span className="roady-msg__icon" aria-hidden="true">
              {m.sender === 'roady' ? <Sparkles size={14} /> : <User size={14} />}
            </span>
            <div className="roady-msg__body">
              <p>{m.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="roady-typing-indicator" aria-label="Roady is typing">
            <span /><span /><span />
          </div>
        )}
      </div>

      <div className="roady-prompts-bar">
        <span className="roady-prompts-label"><Lightbulb size={13} /> Quick Ask:</span>
        <div className="roady-prompts-chips">
          {quickPrompts.map(p => (
            <button
              key={p}
              type="button"
              className="chip chip--sm"
              onClick={() => sendQuery(p)}
              disabled={isTyping}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="roady-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask a question about ${stopTopic}...`}
          aria-label="Ask Roady AI a question"
          disabled={isTyping}
        />
        <button type="submit" className="btn btn--sm btn--primary" disabled={!input.trim() || isTyping}>
          <Send size={14} aria-hidden="true" /> Ask AI
        </button>
      </form>
    </div>
  )
}

export default RoadyAiAssistant

