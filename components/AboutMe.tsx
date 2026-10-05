function AboutIcon({ type }: { type: "focus" | "architecture" | "story" }) {
  if (type === "focus") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="8" />
        <circle cx="16" cy="16" r="2" />
        <path d="M16 3v4M16 25v4M3 16h4M25 16h4" />
      </svg>
    )
  }

  if (type === "architecture") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="5" width="9" height="8" />
        <rect x="19" y="19" width="9" height="8" />
        <path d="M13 9h7a4 4 0 0 1 4 4v6M8 13v7a3 3 0 0 0 3 3h8" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M5 25V15M12 25V9M19 25V18M26 25V5" />
      <path d="m5 12 7-6 7 8 7-12" />
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="6" r="1.5" />
      <circle cx="19" cy="14" r="1.5" />
      <circle cx="26" cy="2" r="1.5" />
    </svg>
  )
}

export default function AboutMe() {
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