"use client"

import { useEffect, useRef, useState } from "react"
import type * as React from "react"

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Architecture", id: "architecture" },
  { label: "Experience", id: "experience" },
  { label: "Writing", id: "writing" },
  { label: "Contact", id: "contact" },
] as const

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Sticky styling once the hero has scrolled away, plus the active-section spy.
  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const hero = document.getElementById("content")
      const stickyThreshold = hero
        ? hero.offsetTop + hero.offsetHeight - 108
        : 420

      setScrolled(window.scrollY > stickyThreshold)

      let current: string | null = null
      let closestTop = Number.NEGATIVE_INFINITY
      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id)
        if (!section) continue
        const top = section.getBoundingClientRect().top
        if (top <= 160 && top > closestTop) {
          closestTop = top
          current = item.id
        }
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Close the mobile menu on Escape and return focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (menuOpen) {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus()
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href") ?? ""
    const target = href.startsWith("#") ? document.getElementById(href.slice(1)) : null

    if (menuOpen) setMenuOpen(false)

    if (target) {
      event.preventDefault()
      target.focus({ preventScroll: true })
      target.scrollIntoView({ block: "start" })
      setActiveId(target.id)
    }
  }

  return (
    <header className="site-header" data-scrolled={scrolled} data-menu-open={menuOpen}>
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <a className="brand" href="#content" aria-label="Heng Sengthay portfolio home">
        <span className="brand-mark">HS/</span>
        <span className="brand-name">HENG SENGTHAY</span>
      </a>

      <nav className="site-nav" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            className="nav-link"
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "true" : undefined}
            onClick={handleLinkClick}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="availability">
        <span className="availability-dot" />
        Looking for internship opportunities
      </div>

      <div className="social-links" aria-label="Social links">
        <a
          className="social-link"
          href="mailto:sengthay32@gmail.com"
          aria-label="Send email"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zm2.36-.5L12 11l7.64-6H4.36zM20 7.3l-7.4 5.8a1 1 0 0 1-1.2 0L4 7.3V18.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V7.3z" />
          </svg>
        </a>
        <a
          className="social-link"
          href="https://github.com/Thay32-Heng"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.94 10.94 0 0 1 5.77 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.12 3.05.73.81 1.17 1.84 1.17 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15v3.19c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
        </a>
      </div>

      <button
        ref={toggleRef}
        className="nav-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
      >
        <span className="nav-toggle-bar" aria-hidden="true" />
        <span className="nav-toggle-bar" aria-hidden="true" />
      </button>

      {menuOpen && (
        <div ref={panelRef} className="mobile-nav" id="mobile-nav">
          <nav aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                className="mobile-nav-link"
                href={`#${item.id}`}
                aria-current={activeId === item.id ? "true" : undefined}
                onClick={handleLinkClick}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
