import { DataNetwork } from "./DataNetwork"
import FogBackground from "./FogBackground"

export default function HeroSection() {
  return (
      <section className="hero relative" aria-labelledby="hero-title">
        <FogBackground />
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
            <a className="button button-primary transition-all duration-300 hover:shadow-[0_0_20px_#FF6B00]" href="#work">
              Explore My Data
              <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-cv" href="/cv.pdf" download>
              [ Download CV ]
            </a>
            <a
              className="button button-secondary"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
          </div>

          <div className="hero-index" aria-hidden="true">
          </div>
        </div>

        <div className="hero-visual">
          <DataNetwork />
        </div>
      </section>
  )
}
