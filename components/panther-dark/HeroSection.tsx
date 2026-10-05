"use client"

import { Component } from "react"
import Image from "next/image"
import VantaFog from "./effects/VantaFog"
import ParticleField from "./effects/ParticleField"

export default class HeroSection extends Component {
  render() {
    return (
      <section className="hero" aria-labelledby="hero-title">
        <VantaFog />
        <ParticleField />
        <Image
          className="panther-centerpiece"
          src="/assets/panther-data-network.png"
          alt="Glowing orange wireframe panther formed from connected data nodes"
          width={1248}
          height={832}
          priority
        />

        <div className="hero-content">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              Data Scientist · Data Engineer
            </div>

            <h1 id="hero-title">
              Transforming the Unknown into <em>Strategic Insights.</em>
            </h1>

            <p className="hero-description">
              I build stealthy data pipelines and clear predictive models. Let&apos;s
              uncover the signal in the fog.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                [ Explore My Data ]
              </a>
              <a className="button button-download" href="#about">
                [ Download CV ]
              </a>
            </div>

            <div className="hero-index" aria-hidden="true">
              <span>DS — 001</span>
              <span>MODELING THE UNSEEN</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Interactive data network">
            <div className="particle-readout particle-readout-top" aria-hidden="true">
              <span>01</span>
              <span>LIVE NODES</span>
            </div>
            <div
              className="particle-readout particle-readout-bottom"
              aria-hidden="true"
            >
              <span>02</span>
              <span>HOVER TO INTERACT</span>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
