"use client"

import { useEffect, useRef } from "react"
import FOG from "vanta/dist/vanta.fog.min"

type ThreeRuntime = {
  Color: new (...args: unknown[]) => unknown
}

declare global {
  interface Window {
    __PORTFOLIO_THREE__?: ThreeRuntime
    __THREE__?: string
    THREE?: ThreeRuntime
  }
}

type FogEffect = {
  destroy: () => void
}

type FogFactory = (options: {
  el: HTMLElement
  THREE: ThreeRuntime
  mouseControls: boolean
  touchControls: boolean
  gyroControls: boolean
  minHeight: number
  minWidth: number
  highlightColor: number
  midtoneColor: number
  lowlightColor: number
  baseColor: number
  blurFactor: number
  speed: number
  zoom: number
}) => FogEffect

const fogModule = FOG as unknown as FogFactory | { default: FogFactory }
const createFog: FogFactory =
  typeof fogModule === "function" ? fogModule : fogModule.default

export default function VantaFog() {
  const fogRef = useRef<HTMLDivElement>(null)
  const fogEffectRef = useRef<FogEffect | null>(null)
  const fogInitializationRef = useRef(0)

  useEffect(() => {
    const initialization = ++fogInitializationRef.current

    async function initializeFog() {
      let threeRuntime = window.__PORTFOLIO_THREE__

      if (!threeRuntime) {
        delete window.__THREE__

        const threeModule = await import("vanta/vendor/three.r134.min")
        const moduleRuntime = threeModule.default

        threeRuntime =
          typeof moduleRuntime?.Color === "function" ? moduleRuntime : window.THREE

        if (!threeRuntime || typeof threeRuntime.Color !== "function") {
          throw new Error("Vanta Three runtime failed to initialize")
        }

        window.__PORTFOLIO_THREE__ = threeRuntime
      }

      if (
        initialization !== fogInitializationRef.current ||
        !fogRef.current ||
        fogEffectRef.current
      ) {
        return
      }

      fogEffectRef.current = createFog({
        el: fogRef.current,
        THREE: threeRuntime,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0xff6b00,
        midtoneColor: 0x291005,
        lowlightColor: 0x070503,
        baseColor: 0x000000,
        blurFactor: 0.64,
        speed: 1.15,
        zoom: 0.82,
      })
    }

    // If the WebGL runtime fails, keep the static panther visible and stay silent.
    void initializeFog().catch(() => {
      fogEffectRef.current = null
    })

    return () => {
      fogInitializationRef.current += 1
      fogEffectRef.current?.destroy()
      fogEffectRef.current = null
    }
  }, [])

  return <div className="hero-vanta" ref={fogRef} aria-hidden="true" />
}
