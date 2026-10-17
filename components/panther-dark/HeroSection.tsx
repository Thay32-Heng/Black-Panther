"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { rainfallStats } from "./rainfall"

// Read from the dataset, not typed by hand, so these can never drift out of
// sync with the project they describe.
const HERO_FACTS = [
  { label: "Months of rainfall analysed", value: String(rainfallStats.observations) },
  { label: "Rain falling May-Oct", value: `${rainfallStats.wetSeasonShare}%` },
  // Four public repos in total; the three case studies above are the ones with
  // findings worth reading.
  { label: "Public repos", value: "04" },
] as const

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Two hero layers: the wireframe emblem (default) and Thay's portrait, swapped
  // by the hero-switch button. Modelled on the layered hero at rinlayheang.me —
  // a plain crossfade between two stacked images, no frame and no colour filter.
  const [revealed, setRevealed] = useState(false)
  const [warm, setWarm] = useState(false)

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
            <strong>PROJ / 04</strong> / Public Repos
          </span>
          <span>Data Analyst, RUPP Y3</span>
        </div>

        <div className="hud-label hud-label-tr">
          <span className="hud-live">
            <span className="hud-dot" />
            Available
          </span>
          <span>Internships, 2027</span>
        </div>

        <div className="hud-label hud-label-bl">
          <span>Lat 11.5564 / Lon 104.9282</span>
          <span>Phnom Penh, Cambodia</span>
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
              Data Science &amp; Engineering student at RUPP. I clean messy data,
              run time-series analysis in Python, and build dashboards people can
              actually read.
            </p>

            {/* Kept short on purpose: `.hero-chips li` is `white-space: nowrap`,
                so a long label cannot wrap — it widens the row and pushes the
                hero past the viewport, where `.site-shell { overflow: clip }`
                silently cuts it off. */}
            <ul className="hero-chips" aria-label="Current status">
              <li>RUPP · Data Science · Y3</li>
              <li>Open to internships</li>
              <li>Python · Pandas · Streamlit</li>
            </ul>

            {/* Three hard numbers pulled from the real projects. Styled with
                Tailwind utilities rather than a new rule in the hand-tuned
                stylesheet, which is read-only.
                Single column until `sm`, because `.site-shell` sets
                `overflow: clip` — anything we get too wide here is silently
                truncated rather than made scrollable, so the reader never
                finds out it was cut. */}
            <dl className="mt-[34px] grid min-w-0 grid-cols-1 gap-px border border-[#1c1c1c] bg-[#1c1c1c] sm:grid-cols-3">
              {HERO_FACTS.map((fact) => (
                <div className="min-w-0 bg-[#0b0b0b] px-[18px] py-4" key={fact.label}>
                  <dt className="font-[family-name:var(--font-dm-mono)] text-[9px] uppercase leading-[1.5] tracking-[0.14em] text-[#858582]">
                    {fact.label}
                  </dt>
                  <dd className="mt-[9px] text-[1.9rem] font-semibold leading-none tracking-[-0.04em] text-[#ff6b00]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

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
              <span>[ 11 Sections ]</span>
              <span>Scroll to explore ↓</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="hero-stage" data-layer={revealed ? "photo" : "emblem"}>
              <span className="hero-orbit" aria-hidden="true" />

              {/* Two layers in exactly the same box. A plain crossfade between
                  them — no frame, no border, no colour filter. Modelled on the
                  layered hero at rinlayheang.me. */}
              <div className="hero-emblem" data-layer="emblem">
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

              <div className="hero-portrait" data-layer="photo">
                {/* Mounted only on intent so a ~70KB photo never loads for
                    visitors who never press the switch. */}
                {revealed || warm ? (
                  <Image
                    className="hero-portrait-image"
                    src="/images/my-portfolio.jpg"
                    alt="Heng Sengthay standing outdoors"
                    width={960}
                    height={1280}
                    sizes="(min-width: 1024px) 620px, (min-width: 640px) 520px, calc(100vw - 48px)"
                    quality={90}
                    priority={revealed}
                    decoding="async"
                  />
                ) : null}
              </div>

              <button
                type="button"
                className="hero-switch"
                onClick={() => setRevealed((value) => !value)}
                onMouseEnter={() => setWarm(true)}
                onFocus={() => setWarm(true)}
                aria-pressed={revealed}
              >
                <span className="hero-switch-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 9V5h4M20 15v4h-4M20 9V5h-4M4 15v4h4" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="hero-switch-label">
                  <span className="hero-switch-title">
                    {revealed ? "Show Emblem" : "Raise the Panther"}
                  </span>
                  <span className="hero-switch-sub">
                    {revealed ? "Back to the wireframe" : "Reveal portrait"}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
