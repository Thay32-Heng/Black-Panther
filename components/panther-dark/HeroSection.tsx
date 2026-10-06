"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"

const VantaFog = dynamic(() => import("./effects/VantaFog"), { ssr: false })
const ParticleField = dynamic(() => import("./effects/ParticleField"), { ssr: false })

const PARTICLE_COUNT = 44

function canRenderWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    )
  } catch {
    return false
  }
}

let cachedEffectsCapability: boolean | null = null

const subscribeToCapability = () => () => {}

function getEffectsCapability() {
  if (cachedEffectsCapability === null) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    cachedEffectsCapability = !prefersReducedMotion && canRenderWebGL()
  }
  return cachedEffectsCapability
}

function getServerEffectsCapability() {
  return false
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  // Client-only capability read: false during SSR/hydration, resolved afterwards.
  const effectsEnabled = useSyncExternalStore(
    subscribeToCapability,
    getEffectsCapability,
    getServerEffectsCapability
  )
  const [inView, setInView] = useState(false)
  const [effectsReady, setEffectsReady] = useState(false)
  const [liveNodes, setLiveNodes] = useState(1)

  // Load effects when the hero approaches the viewport and release them when it
  // leaves, so nothing keeps rendering offscreen.
  useEffect(() => {
    const node = sectionRef.current
    if (!node || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "320px 0px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Keep the initial load light: wait for the window load event, then for idle
  // time before booting the WebGL/canvas effects.
  useEffect(() => {
    if (!effectsEnabled || effectsReady) return

    let idleId: number | undefined
    let timeoutId: number | undefined

    const start = () => setEffectsReady(true)
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 2000 })
      } else {
        timeoutId = window.setTimeout(start, 200)
      }
    }

    if (document.readyState === "complete") {
      schedule()
    } else {
      window.addEventListener("load", schedule, { once: true })
    }

    return () => {
      window.removeEventListener("load", schedule)
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [effectsEnabled, effectsReady])

  // Ambient "live nodes" readout — a light telemetry tick, paused when motion is reduced.
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motionQuery.matches) return

    const id = window.setInterval(() => {
      setLiveNodes((current) => (current >= PARTICLE_COUNT ? 1 : current + 1))
    }, 1800)

    return () => window.clearInterval(id)
  }, [])

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

  const showEffects = effectsEnabled && inView && effectsReady

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
      {showEffects && <VantaFog />}
      {showEffects && <ParticleField particleCount={PARTICLE_COUNT} />}

      {/* Local scrim: keeps the headline readable while fog and particles animate behind it. */}
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
            <span className="hud-value">{String(liveNodes).padStart(2, "0")}</span>
            Live nodes
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
              Data Scientist · Data Engineer
            </div>

            <h1
              id="hero-title"
              className="text-4xl md:text-6xl lg:text-[clamp(3rem,5vw,5.5rem)] lg:leading-[1.02]"
            >
              Transforming the <br className="hidden lg:block" />
              Unknown into <br className="hidden lg:block" />
              <em>Strategic Insights.</em>
            </h1>

            <p className="hero-description">
              I build stealthy data pipelines and clear predictive models. Let&apos;s
              uncover the signal in the fog.
            </p>

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
              <Image
                className="pointer-events-none h-auto w-full max-w-[560px] animate-[panther-signal_4.8s_ease-in-out_infinite] opacity-95 motion-reduce:animate-none lg:max-w-[940px]"
                src="/assets/panther-data-network.png"
                alt="Glowing orange wireframe panther formed from connected data nodes"
                width={1248}
                height={832}
                sizes="(min-width: 1024px) 700px, (min-width: 640px) 560px, calc(100vw - 48px)"
                quality={90}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
