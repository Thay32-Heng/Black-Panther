"use client"

// The hero's 3D layer: the 132 monthly rainfall records as a slowly swaying
// wireframe surface.
//
// Deliberately dependency-free. The alternative — three.js plus a bloom pass —
// is roughly a megabyte of JavaScript and a second renderer, and this machine
// already ran out of memory building the site once. A 132-point grid with
// perspective projection needs about 300 lines and adds nothing to the bundle.
//
// Behaviour that matters:
//   - prefers-reduced-motion: one static frame, no animation loop at all
//   - the loop stops when the hero scrolls away and when the tab is hidden,
//     and coming back to the tab does NOT wake it if the hero is off-screen
//   - device pixel ratio is capped at 2 so a 3x phone does not pay 9x the fill
//   - the pointer only tilts the surface; it never needs a listener per pixel

import { useEffect, useRef } from "react"

import { MONTHLY_RAINFALL } from "./rainfall"
import {
  DEFAULT_GRID,
  buildTerrainGrid,
  frameTerrain,
  terrainPolylines,
  type Projection,
} from "./hero-terrain"

// Static data, so it is built once. Rebuilding the grid inside the animation
// loop would allocate 132 points per frame for no reason.
const GRID = buildTerrainGrid(MONTHLY_RAINFALL, DEFAULT_GRID)
const LINES = terrainPolylines(DEFAULT_GRID.cols, DEFAULT_GRID.rows, 3)
const ALPHA_STEPS = 7

const ORANGE = [255, 107, 0] as const
const GOLD = [255, 212, 59] as const

export default function HeroTerrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let dpr = 1
    let frameId = 0
    let running = false
    let startedAt = 0
    let inView = false
    let disposed = false

    // Pointer tilt, eased toward the target so the surface never snaps.
    let pointerX = 0
    let pointerY = 0
    let targetX = 0
    let targetY = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (elapsed: number) => {
      context.clearRect(0, 0, width, height)

      // A slow sway, not a spin: rows stay close to horizontal, which is what
      // makes the shape read as a landscape instead of a rotating object.
      const yaw = 0.16 + Math.sin(elapsed * 0.00007) * 0.16
      const pitch = -0.5 + Math.sin(elapsed * 0.00021) * 0.02 + pointerY * 0.06

      const camera: Projection = {
        // Fit BOTH axes. Keying the zoom to the short side alone over-zooms a
        // tall narrow panel (a phone), pushing the 3.1-unit-wide grid off both
        // edges; the width term caps that.
        focal: Math.min(height * 1.85, width * 0.95),
        distance: 3.4,
        cx: width * 0.5 + pointerX * width * 0.02,
        cy: height * 0.54 + pointerY * height * 0.02,
      }

      // A soft ground glow gives the surface weight before a single line is
      // drawn; without it the wireframe floats on black and reads as scratches.
      const glow = context.createRadialGradient(
        camera.cx,
        height * 0.96,
        0,
        camera.cx,
        height * 0.96,
        width * 0.6,
      )
      glow.addColorStop(0, "rgba(255, 107, 0, 0.13)")
      glow.addColorStop(0.5, "rgba(255, 107, 0, 0.045)")
      glow.addColorStop(1, "rgba(255, 107, 0, 0)")
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)

      const frame = frameTerrain(MONTHLY_RAINFALL, {
        yaw,
        pitch,
        camera,
        grid: GRID,
      })

      // `near` is an absolute 0..1 against a fixed camera assumption; normalise
      // it over the range this frame actually spans, or only the top few depth
      // buckets are ever used and the far side is not faded at all.
      let nearest = 1
      let farthest = 0
      for (let i = 0; i < frame.points.length; i += 1) {
        const { near } = frame.points[i]
        if (near < nearest) nearest = near
        if (near > farthest) farthest = near
      }
      const span = Math.max(1e-6, farthest - nearest)

      // Bucket the segments by depth so the whole surface costs a handful of
      // stroke calls instead of one per line.
      const buckets: number[][] = Array.from({ length: ALPHA_STEPS }, () => [])

      for (let line = 0; line < LINES.length; line += 1) {
        const indices = LINES[line]
        for (let i = 0; i < indices.length - 1; i += 1) {
          const pa = frame.points[indices[i]]
          const pb = frame.points[indices[i + 1]]
          const depth = (Math.min(pa.near, pb.near) - nearest) / span
          const bucket = Math.min(
            ALPHA_STEPS - 1,
            Math.max(0, Math.round(depth * (ALPHA_STEPS - 1))),
          )
          buckets[bucket].push(pa.x, pa.y, pb.x, pb.y)
        }
      }

      for (let level = 0; level < ALPHA_STEPS; level += 1) {
        const segments = buckets[level]
        if (segments.length === 0) continue
        const strength = (level + 1) / ALPHA_STEPS
        // Nearer lines are both brighter and slightly thicker, which is what
        // sells the depth — uniform lines read as a flat diagram.
        context.lineWidth = 0.7 + strength * 1.1
        context.strokeStyle = `rgba(${ORANGE[0]}, ${ORANGE[1]}, ${ORANGE[2]}, ${0.07 + strength * 0.52})`
        context.beginPath()
        for (let i = 0; i < segments.length; i += 4) {
          context.moveTo(segments[i], segments[i + 1])
          context.lineTo(segments[i + 2], segments[i + 3])
        }
        context.stroke()
      }

      // The crest: months above two thirds of the wettest month on record.
      for (let i = 0; i < frame.crest.length; i += 1) {
        const point = frame.points[frame.crest[i]]
        const near = point.near
        const radius = 1.1 + near * 2.1

        context.fillStyle = `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, ${0.04 + near * 0.12})`
        context.beginPath()
        context.arc(point.x, point.y, radius * 2.7, 0, Math.PI * 2)
        context.fill()

        context.fillStyle = `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, ${0.22 + near * 0.55})`
        context.beginPath()
        context.arc(point.x, point.y, radius, 0, Math.PI * 2)
        context.fill()
      }
    }

    const tick = (now: number) => {
      if (disposed) return
      try {
        if (!startedAt) startedAt = now
        pointerX += (targetX - pointerX) * 0.045
        pointerY += (targetY - pointerY) * 0.045
        draw(now - startedAt)
      } finally {
        // Schedule in `finally`: if draw() ever throws, the loop must not die
        // while `running` stays true, which would make start() a no-op forever.
        if (!disposed) frameId = window.requestAnimationFrame(tick)
      }
    }

    const start = () => {
      if (running || disposed) return
      running = true
      frameId = window.requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      if (frameId) window.cancelAnimationFrame(frameId)
      frameId = 0
    }

    resize()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      // Animated path repaints on the next frame; the static path has no next
      // frame, so repaint here.
      if (!running) draw(reduced ? 0 : performance.now() - startedAt)
    })
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)

    if (reduced) {
      // One frame, fixed camera. No loop, no scroll or pointer listeners.
      draw(0)
      return () => {
        disposed = true
        resizeObserver.disconnect()
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1
      targetY = (event.clientY / window.innerHeight) * 2 - 1
    }
    const onPointerOut = (event: PointerEvent) => {
      // pointerout bubbles from every element boundary, so a window listener
      // fires constantly during ordinary movement. Only a real exit from the
      // document (no element being entered) should recentre the tilt.
      if (event.relatedTarget) return
      targetX = 0
      targetY = 0
    }

    // Only animate while the hero is actually on screen.
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting)
        if (inView && !document.hidden) start()
        else stop()
      },
      { rootMargin: "120px" },
    )
    intersectionObserver.observe(canvas)

    const onVisibility = () => {
      // Returning to the tab must not wake a hero that has been scrolled away:
      // no further intersection callback would arrive to stop it again.
      if (inView && !document.hidden) start()
      else stop()
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerout", onPointerOut)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      // Set before stop(): an observer entry already queued for delivery can
      // still fire after disconnect() and must not restart the loop.
      disposed = true
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerout", onPointerOut)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <div className="rin-hero-terrain" aria-hidden="true">
      <canvas ref={canvasRef} className="rin-hero-terrain-canvas" />
    </div>
  )
}
