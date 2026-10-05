"use client"

import { useState } from "react"

function PantherMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path className="panther-outline" d="m7 9 11 6h12L41 9l-3 19-14 12L10 28 7 9Z" />
      <path className="panther-planes" d="m10 14 10 8-5 10M38 14l-10 8 5 10M20 22h8l-4 17-4-17Z" />
      <path className="panther-eyes" d="m13 23 7 2-6 3M35 23l-7 2 6 3" />
      <path className="panther-nose" d="m20 33 4 2 4-2-4 6-4-6Z" />
    </svg>
  )
}

function PantherChat() {
  const [isOpen, setIsOpen] = useState(true)
  const [query, setQuery] = useState("")
  const [userMessage, setUserMessage] = useState("Does he know Python and AWS?")
  const [aiReply, setAiReply] = useState(
    "I am the digital shadow of the Architect. Ask me anything about his tech stack or experience.",
  )
  const [isThinking, setIsThinking] = useState(false)

  async function submitQuery(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextQuery = query.trim()

    if (!nextQuery) return

    setUserMessage(nextQuery)
    setQuery("")
    setIsThinking(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: nextQuery }),
      })
      const data = await res.json()
      setAiReply(data.reply ?? "The shadow stays silent.")
    } catch {
      setAiReply("Neural link failed. Try again.")
    } finally {
      setIsThinking(false)
    }
  }

  return (
    <aside className="panther-chat" aria-label="Panther AI assistant">
      {isOpen && (
        <div className="chat-window">
          <span className="chat-corner chat-corner-top" aria-hidden="true" />
          <span className="chat-corner chat-corner-bottom" aria-hidden="true" />

          <header className="chat-header">
            <div className="chat-identity">
              <span className="chat-avatar">
                <PantherMark />
              </span>
              <div>
                <strong>Panther AI</strong>
                <span>{"// Digital Shadow"}</span>
              </div>
            </div>
            <button
              className="chat-close"
              type="button"
              aria-label="Close Panther AI"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </header>

          <div className="chat-readout" aria-hidden="true">
            <span>NEURAL LINK / ACTIVE</span>
            <span>ENCRYPTED</span>
          </div>

          <div className="chat-messages" aria-live="polite">
            <div className="message-row message-row-ai">
              <span className="message-label">PANTHER_AI / 01</span>
              <p>{aiReply}</p>
            </div>
            {isThinking && (
              <div className="message-row message-row-ai">
                <span className="message-label">PANTHER_AI / ...</span>
                <p>Decoding signal...</p>
              </div>
            )}
            <div className="message-row message-row-user">
              <span className="message-label">YOU / QUERY</span>
              <p>{userMessage}</p>
            </div>
          </div>

          <form className="chat-input" onSubmit={submitQuery}>
            <label className="sr-only" htmlFor="panther-query">
              Type your query
            </label>
            <input
              id="panther-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type your query..."
              autoComplete="off"
            />
            <button type="submit" aria-label="Send query">
              <span aria-hidden="true">&gt;_</span>
            </button>
          </form>

          <div className="chat-footer">
            <span>MODEL / SHADOW-01</span>
            <span>24MS</span>
          </div>
        </div>
      )}

      <div className="chat-toggle-wrap">
        <span className="toggle-status">
          {isOpen ? "SHADOW ACTIVE" : "SUMMON SHADOW"}
        </span>
        <button
          className="chat-toggle"
          type="button"
          aria-label={isOpen ? "Close Panther AI" : "Open Panther AI"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="toggle-ring" aria-hidden="true" />
          <PantherMark />
        </button>
      </div>
    </aside>
  )
}

export default PantherChat