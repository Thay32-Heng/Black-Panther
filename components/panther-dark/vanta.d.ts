declare module "vanta/dist/vanta.fog.min" {
  interface VantaFogOptions {
    el: HTMLElement
    THREE: typeof import("three")
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    highlightColor?: number
    midtoneColor?: number
    lowlightColor?: number
    baseColor?: number
    blurFactor?: number
    speed?: number
    zoom?: number
  }

  interface VantaFogEffect {
    destroy: () => void
    resize: () => void
  }

  export default function FOG(options: VantaFogOptions): VantaFogEffect
}

declare module "vanta/vendor/three.r134.min" {
  const THREE: typeof import("three")
  export default THREE
}
