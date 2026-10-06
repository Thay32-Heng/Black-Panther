"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  opacityBase: number
  opacityAmplitude: number
  opacitySpeed: number
  opacityPhase: number
  color: string
  offsetX: number
  offsetY: number
  boostX: number
  boostY: number
}

const COLORS = ["#ff6b00", "#d7d7d2", "#777773"]
const LINK_DISTANCE = 155
const LINK_OPACITY = 0.24
const GRAB_DISTANCE = 185
const GRAB_OPACITY = 0.78
const REPULSE_DISTANCE = 82
const PUSH_RADIUS = 150
const MOVE_SPEED = 0.72
const FRAME_DELTA_CAP = 34

const random = (min: number, max: number) => min + Math.random() * (max - min)

export default function ParticleField({
  particleCount = 42,
}: {
  particleCount?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motionQuery.matches) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pointer = { x: -9999, y: -9999, active: false }
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let frameId = 0
    let lastTime = 0
    let onScreen = true
    let pageVisible = !document.hidden
    let destroyed = false

    function createParticle(): Particle {
      const angle = Math.random() * Math.PI * 2
      const speed = MOVE_SPEED * random(0.35, 1)
      const opacityBase = random(0.28, 0.72)
      return {
        x: random(0, width || 1),
        y: random(0, height || 1),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: random(1, 3.2),
        opacity: opacityBase,
        opacityBase,
        opacityAmplitude: random(0.06, 0.2),
        opacitySpeed: random(0.35, 0.9),
        opacityPhase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        offsetX: 0,
        offsetY: 0,
        boostX: 0,
        boostY: 0,
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      context!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const densityScale = Math.min(1.5, Math.max(0.55, (width * height) / (1440 * 720)))
      const count = Math.max(12, Math.round(particleCount * densityScale))
      particles = Array.from({ length: count }, createParticle)
    }

    function updatePointerTargets() {
      for (const particle of particles) {
        if (!pointer.active) {
          particle.offsetX *= 0.9
          particle.offsetY *= 0.9
          continue
        }

        const dx = particle.x - pointer.x
        const dy = particle.y - pointer.y
        const distance = Math.hypot(dx, dy)

        if (distance > 0 && distance < REPULSE_DISTANCE) {
          const influence = 1 - distance / REPULSE_DISTANCE
          particle.offsetX = (dx / distance) * influence * 22
          particle.offsetY = (dy / distance) * influence * 22
        } else {
          particle.offsetX *= 0.9
          particle.offsetY *= 0.9
        }
      }
    }

    function step(delta: number) {
      const factor = delta * 0.06

      for (const particle of particles) {
        particle.x += (particle.vx + particle.boostX) * factor
        particle.y += (particle.vy + particle.boostY) * factor
        particle.boostX *= 0.9
        particle.boostY *= 0.9

        if (particle.x < -24) particle.x = width + 24
        else if (particle.x > width + 24) particle.x = -24
        if (particle.y < -24) particle.y = height + 24
        else if (particle.y > height + 24) particle.y = -24
      }
    }

    function draw(seconds: number) {
      context!.clearRect(0, 0, width, height)

      const rendered = particles.map((particle) => {
        const opacity = Math.min(
          0.95,
          Math.max(
            0.15,
            particle.opacityBase +
              Math.sin(seconds * particle.opacitySpeed + particle.opacityPhase) *
                particle.opacityAmplitude
          )
        )
        return {
          x: particle.x + particle.offsetX,
          y: particle.y + particle.offsetY,
          radius: particle.radius,
          opacity,
          color: particle.color,
        }
      })

      const adjacency: number[][] = rendered.map(() => [])
      for (let i = 0; i < rendered.length; i++) {
        for (let j = i + 1; j < rendered.length; j++) {
          const dx = rendered[i].x - rendered[j].x
          const dy = rendered[i].y - rendered[j].y
          if (dx * dx + dy * dy < LINK_DISTANCE * LINK_DISTANCE) {
            adjacency[i].push(j)
            adjacency[j].push(i)
          }
        }
      }

      context!.lineWidth = 1
      context!.strokeStyle = "#ff6b00"

      for (let i = 0; i < rendered.length; i++) {
        const neighbors = adjacency[i]
        for (let n = 0; n < neighbors.length; n++) {
          const j = neighbors[n]
          if (j < i) continue
          const dx = rendered[i].x - rendered[j].x
          const dy = rendered[i].y - rendered[j].y
          const distance = Math.hypot(dx, dy)
          context!.globalAlpha = LINK_OPACITY * (1 - distance / LINK_DISTANCE)
          context!.beginPath()
          context!.moveTo(rendered[i].x, rendered[i].y)
          context!.lineTo(rendered[j].x, rendered[j].y)
          context!.stroke()
        }
      }

      context!.fillStyle = "#ff6b00"
      context!.globalAlpha = 0.018
      for (let i = 0; i < adjacency.length; i++) {
        const neighbors = adjacency[i]
        for (let a = 0; a < neighbors.length; a++) {
          const j = neighbors[a]
          for (let b = a + 1; b < neighbors.length; b++) {
            const k = neighbors[b]
            if (k < j || adjacency[j].indexOf(k) === -1) continue
            context!.beginPath()
            context!.moveTo(rendered[i].x, rendered[i].y)
            context!.lineTo(rendered[j].x, rendered[j].y)
            context!.lineTo(rendered[k].x, rendered[k].y)
            context!.closePath()
            context!.fill()
          }
        }
      }

      if (pointer.active) {
        for (const point of rendered) {
          const dx = point.x - pointer.x
          const dy = point.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance >= GRAB_DISTANCE) continue
          context!.globalAlpha = GRAB_OPACITY * (1 - distance / GRAB_DISTANCE)
          context!.beginPath()
          context!.moveTo(point.x, point.y)
          context!.lineTo(pointer.x, pointer.y)
          context!.stroke()
        }
      }

      for (const point of rendered) {
        context!.globalAlpha = point.opacity
        context!.fillStyle = point.color
        context!.beginPath()
        context!.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        context!.fill()
      }

      context!.globalAlpha = 1
    }

    function loop(time: number) {
      if (destroyed) return
      frameId = requestAnimationFrame(loop)
      if (!pageVisible || !onScreen) return

      const delta = lastTime ? Math.min(FRAME_DELTA_CAP, time - lastTime) : 16.7
      lastTime = time

      updatePointerTargets()
      step(delta)
      draw(time / 1000)
    }

    function start() {
      if (destroyed || frameId) return
      lastTime = 0
      frameId = requestAnimationFrame(loop)
    }

    function stop() {
      if (frameId) cancelAnimationFrame(frameId)
      frameId = 0
    }

    function handlePointerMove(event: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const inside =
        x >= -GRAB_DISTANCE &&
        x <= rect.width + GRAB_DISTANCE &&
        y >= -GRAB_DISTANCE &&
        y <= rect.height + GRAB_DISTANCE
      pointer.active = inside
      pointer.x = x
      pointer.y = y
    }

    function handlePointerLeave() {
      pointer.active = false
    }

    function handlePointerDown(event: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      for (const particle of particles) {
        const dx = particle.x - x
        const dy = particle.y - y
        const distance = Math.hypot(dx, dy)
        if (distance === 0 || distance > PUSH_RADIUS) continue
        const influence = 1 - distance / PUSH_RADIUS
        particle.boostX += (dx / distance) * influence * 2.4
        particle.boostY += (dy / distance) * influence * 2.4
      }
    }

    function handleVisibilityChange() {
      pageVisible = !document.hidden
      if (pageVisible) start()
      else stop()
    }

    function handleMotionChange(event: MediaQueryListEvent) {
      if (event.matches) {
        stop()
        context!.clearRect(0, 0, width, height)
      } else {
        start()
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
    })

    const intersectionObserver = new IntersectionObserver((entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting)
      if (onScreen && pageVisible) start()
      else stop()
    })

    resize()
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    window.addEventListener("mousemove", handlePointerMove, { passive: true })
    window.addEventListener("mousedown", handlePointerDown, { passive: true })
    document.addEventListener("mouseleave", handlePointerLeave)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    motionQuery.addEventListener("change", handleMotionChange)
    start()

    return () => {
      destroyed = true
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener("mousemove", handlePointerMove)
      window.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("mouseleave", handlePointerLeave)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      motionQuery.removeEventListener("change", handleMotionChange)
    }
  }, [particleCount])

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />
}
