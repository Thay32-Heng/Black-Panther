"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Pointer-driven parallax: writes CSS variables for the stage tilt and spotlight.
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    let frame = 0

    const handleMove = (event: MouseEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const rect = node.getBoundingClientRect()
        const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
        const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1
        node.style.setProperty("--px", Math.max(-1, Math.min(1, nx)).toFixed(3))
        node.style.setProperty("--py", Math.max(-1, Math.min(1, ny)).toFixed(3))
        node.style.setProperty("--mx", `${event.clientX - rect.left}px`)
        node.style.setProperty("--my", `${event.clientY - rect.top}px`)
        node.dataset.pointer = "true"
      })
    }

    const handleLeave = () => {
      node.dataset.pointer = "false"
      node.style.setProperty("--px", "0")
      node.style.setProperty("--py", "0")
    }

    node.addEventListener("mousemove", handleMove, { passive: true })
    node.addEventListener("mouseleave", handleLeave)
    return () => {
      node.removeEventListener("mousemove", handleMove)
      node.removeEventListener("mouseleave", handleLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Fade the HUD once the hero has scrolled past, so it never lingers over the sections below.
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      node.dataset.hud = rect.bottom < 260 ? "hidden" : "visible"
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="content"
      tabIndex={-1}
      className="hero relative w-full overflow-hidden focus:outline-none"
      aria-labelledby="hero-title"
      data-pointer="false"
      data-hud="visible"
    >
      {/* Local scrim: keeps the headline readable while the 3D scene animates behind it. */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(0,0,0,0.74)_0%,rgba(0,0,0,0.36)_42%,rgba(0,0,0,0.08)_66%,transparent_84%)]"
        aria-hidden="true"
      />

      <div className="hero-spotlight" aria-hidden="true" />

      <div className="hero-hud" aria-hidden="true">
        <span className="hud-corner hud-corner-tl" />
        <span className="hud-corner hud-corner-tr" />
        <span className="hud-corner hud-corner-bl" />
        <span className="hud-corner hud-corner-br" />

        <div className="hud-label hud-label-tl">
          <span>
            <strong>DS — 001</strong> / Portfolio
          </span>
          <span>Modeling the unseen</span>
        </div>

        <div className="hud-label hud-label-tr">
          <span className="hud-live">
            <span className="hud-dot" />
            Portfolio
          </span>
          <span>Signal / active</span>
        </div>

        <div className="hud-label hud-label-bl">
          <span>Lat 11.5564 / Lon 104.9282</span>
          <span>Uptime stable</span>
        </div>

        <div className="hud-label hud-label-br">
          <span>Move cursor to probe</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-28 pt-20 lg:px-12 lg:pb-28 lg:pt-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:min-h-[62vh] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <div className="relative z-10 min-w-0">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              Data portfolio // RUPP Year 3
            </div>

            <h1
              id="hero-title"
              className="hero-title text-4xl md:text-6xl lg:text-[clamp(3rem,5vw,5.5rem)] lg:leading-[1.02]"
            >
              Heng
              <br className="hidden lg:block" />
              <em className="hero-title-em">Sengthay.</em>
            </h1>

            <p className="hero-description">
              Data Science &amp; Engineering student turning messy data into
              clear dashboards, practical tools, and useful insights.
            </p>

            <ul className="hero-chips" aria-label="Current status">
              <li>Royal University of Phnom Penh</li>
              <li>Open to internships</li>
              <li>Data · Analytics · ML</li>
            </ul>

            <div className="hero-actions">
              <a className="button button-primary w-full sm:w-auto" href="#projects">
                [ Explore My Data ]
              </a>
              <a
                className="button button-download w-full sm:w-auto"
                href="/resume.pdf"
                download
              >
                [ Download CV ]
              </a>
            </div>

            <div className="hero-index" aria-hidden="true">
              <span>[ 01 / 11 ]</span>
              <span>Scroll to explore ↓</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="hero-stage">
              <span className="hero-orbit" aria-hidden="true" />
              <div className="hero-emblem">
                <Image
                  className="hero-emblem-image"
                  src="/images/panther-emblem.png"
                  alt="Sharp glowing orange wireframe panther emblem"
                  width={674}
                  height={702}
                  sizes="(min-width: 1024px) 620px, (min-width: 640px) 520px, calc(100vw - 48px)"
                  quality={90}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <span className="hero-emblem-corner hero-emblem-corner-top" aria-hidden="true" />
                <span className="hero-emblem-corner hero-emblem-corner-bottom" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
