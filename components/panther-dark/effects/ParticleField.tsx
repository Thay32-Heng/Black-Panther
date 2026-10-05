"use client"

import Particles, { type ParticlesProps } from "react-tsparticles"
import { loadFull } from "tsparticles"

const initializeParticles: NonNullable<ParticlesProps["init"]> = async (engine) => {
  await loadFull(engine)
}

const particleOptions: ParticlesProps["options"] = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  detectRetina: true,
  fpsLimit: 60,
  particles: {
    color: {
      value: ["#ff6b00", "#d7d7d2", "#777773"],
    },
    links: {
      color: "#ff6b00",
      distance: 155,
      enable: true,
      opacity: 0.24,
      width: 1,
      triangles: {
        enable: true,
        color: "#ff6b00",
        opacity: 0.018,
      },
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      random: false,
      speed: 0.72,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 700,
      },
      value: 42,
    },
    opacity: {
      value: { min: 0.28, max: 0.82 },
      animation: {
        enable: true,
        speed: 0.35,
        minimumValue: 0.2,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3.2 },
      animation: {
        enable: true,
        speed: 1.2,
        minimumValue: 0.8,
        sync: false,
      },
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: true,
        mode: ["grab", "repulse"],
      },
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 185,
        links: {
          opacity: 0.78,
        },
      },
      repulse: {
        distance: 82,
        duration: 0.45,
      },
      push: {
        quantity: 3,
      },
    },
  },
}

export default function ParticleField() {
  return (
    <Particles
      id="hero-data-network"
      className="hero-particles"
      init={initializeParticles}
      options={particleOptions}
    />
  )
}
