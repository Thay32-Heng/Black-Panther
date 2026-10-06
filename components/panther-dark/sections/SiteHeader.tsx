"use client"

import { useEffect, useRef, useState } from "react"
import type * as React from "react"

const NAV_ITEMS = [
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
      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id)
        if (section && section.getBoundingClientRect().top <= 160) {
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

      <a className="brand" href="#content" aria-label="Portfolio home">
        <span className="brand-mark">D/</span>
        <span className="brand-name">DATA SYSTEMS</span>
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
        Available for select projects
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
