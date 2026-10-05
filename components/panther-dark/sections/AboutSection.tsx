import { AboutIcon } from "../AboutIcon"

export default function AboutSection() {
  return (
          <section className="about" id="about" aria-labelledby="about-title">
        <div className="about-inner">
          <div className="about-visual">
            <div className="portrait-frame" aria-label="Portrait image placeholder">
              <div className="portrait-grid" />
              <div className="portrait-index">
                <span>PORTRAIT / 01</span>
                <span>FOCUS: LOCKED</span>
              </div>
              <div className="portrait-silhouette">
                <div className="silhouette-head" />
                <div className="silhouette-body" />
              </div>
              <div className="portrait-scanline" />
              <span className="portrait-corner portrait-corner-top" />
              <span className="portrait-corner portrait-corner-bottom" />
            </div>
          </div>

          <div className="about-copy">
            <p className="about-overline">/ Who I am</p>
            <h2 id="about-title">The Architect Behind the Fog.</h2>
            <p className="about-description">
              People usually see a quiet, highly focused engineer. That’s by
              design. I use silence to cut through the noise, engineering
              scalable and clean data pipelines with absolute precision. But
              once the pipeline is built, the orange glow appears—I transform
              complex data into compelling, easy-to-understand stories that
              drive team decisions.
            </p>

            <div className="about-strengths">
              <div className="strength">
                <span className="strength-icon">
                  <AboutIcon type="focus" />
                </span>
                <span>Deep Work Focus</span>
              </div>
              <div className="strength">
                <span className="strength-icon">
                  <AboutIcon type="architecture" />
                </span>
                <span>Scalable Architecture</span>
              </div>
              <div className="strength">
                <span className="strength-icon">
                  <AboutIcon type="story" />
                </span>
                <span>Data Storytelling</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
