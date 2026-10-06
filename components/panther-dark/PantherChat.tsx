"use client"

import { useEffect, useRef, useState } from "react"
import type * as React from "react"
import PantherMark from "./PantherMark"

export default function PantherChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [showToggle, setShowToggle] = useState(false)
  const [query, setQuery] = useState("")
  const [userMessage, setUserMessage] = useState("Does he know Python and AWS?")
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateVisibility = () => {
      setShowToggle(window.scrollY > window.innerHeight * 0.6)
    }

    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })
    window.addEventListener("resize", updateVisibility)

    return () => {
      window.removeEventListener("scroll", updateVisibility)
      window.removeEventListener("resize", updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  function closeChat() {
    setIsOpen(false)
    toggleRef.current?.focus()
  }

  function submitQuery(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextQuery = query.trim()

    if (!nextQuery) return

    setUserMessage(nextQuery)
    setQuery("")
  }

  return (
    <aside
      className="panther-chat"
      data-visible={showToggle || isOpen ? "true" : "false"}
      aria-label="Panther AI assistant"
    >
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
              onClick={closeChat}
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
              <p>
                I am the digital shadow of the Architect. Ask me anything about
                his tech stack or experience.
              </p>
            </div>
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
          ref={toggleRef}
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

