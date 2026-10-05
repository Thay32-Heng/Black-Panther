"use client"

import { useEffect, useRef } from "react"

export default function FogBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const blobs = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 140 + Math.random() * 260,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: 0.08 + Math.random() * 0.12,
      warm: Math.random() > 0.5,
    }))

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      for (const b of blobs) {
        b.x += b.vx
        b.y += b.vy
        if (b.x < -b.r) b.x = width + b.r
        if (b.x > width + b.r) b.x = -b.r
        if (b.y < -b.r) b.y = height + b.r
        if (b.y > height + b.r) b.y = -b.r

        const gradient = ctx!.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        const color = b.warm ? "255, 107, 0" : "200, 200, 210"
        gradient.addColorStop(0, `rgba(${color}, ${b.alpha})`)
        gradient.addColorStop(1, `rgba(${color}, 0)`)
        ctx!.fillStyle = gradient
        ctx!.beginPath()
        ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx!.fill()
      }
      animationId = requestAnimationFrame(draw)
    }

    function onResize() {
      width = canvas!.width = canvas!.offsetWidth
      height = canvas!.height = canvas!.offsetHeight
    }

    draw()
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
