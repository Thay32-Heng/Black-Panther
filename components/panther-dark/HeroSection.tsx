"use client"

import VantaFog from "./effects/VantaFog"
import ParticleField from "./effects/ParticleField"

export default function HeroSection() {
  return (
    <section className="hero relative overflow-hidden" aria-labelledby="hero-title">
      <VantaFog />
      <ParticleField />

      <img
        className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[73%] -translate-x-1/2 w-[50%] max-w-[940px] h-auto opacity-95 pointer-events-none mix-blend-screen [animation:panther-signal_4.8s_ease-in-out_infinite]"
        src="/assets/panther-data-network.png"
        alt="Glowing orange wireframe panther formed from connected data nodes"
        width={1248}
        height={832}
      />

      <img
        className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(85vw,560px)] h-auto opacity-95 pointer-events-none mix-blend-screen"
        src="/assets/panther-data-network.png"
        alt="Glowing orange wireframe panther formed from connected data nodes"
        width={1248}
        height={832}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 lg:px-12 pt-20 lg:pt-28 pb-[70vw] lg:pb-28">
        <div className="grid grid-cols-1 gap-10 items-center lg:min-h-[62vh]">
          <div className="relative z-10 max-w-none">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              Data Scientist · Data Engineer
            </div>

            <h1 id="hero-title" className="text-4xl md:text-6xl lg:text-[5.75rem] lg:leading-[1.02]">
              Transforming the{" "}
              <br className="hidden lg:block" />{" "}
              Unknown into{" "}
              <br className="hidden lg:block" />{" "}
              <em>Strategic Insights.</em>
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
        </div>
      </div>
    </section>
  )
}
