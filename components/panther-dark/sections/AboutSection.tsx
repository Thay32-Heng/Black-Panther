import Image from "next/image"
import { AboutIcon } from "../AboutIcon"
import MotionSection from "../MotionSection"

export default function AboutSection() {
  return (
          <MotionSection className="about" id="about" aria-labelledby="about-title">
        <div className="about-inner">
          <div className="about-visual">
            <div className="portrait-frame" aria-label="Holographic portrait of Heng Sengthay">
              <div className="portrait-grid" />
              <div className="portrait-index">
                <span>PORTRAIT / 01</span>
                <span>FOCUS: LOCKED</span>
              </div>
              <div className="portrait-hologram">
                <Image
                  className="portrait-hologram-image"
                  src="/images/my-portfolio.jpg"
                  alt="Holographic portrait of Heng Sengthay"
                  width={960}
                  height={1280}
                  sizes="(max-width: 520px) calc(100vw - 66px), 320px"
                  loading="lazy"
                  decoding="async"
                />
                <span className="portrait-hologram-base" aria-hidden="true" />
              </div>
              <p className="portrait-caption" aria-hidden="true">
                <span>FIELD PORTRAIT</span>
                <span>NATURAL LIGHT</span>
              </p>
              <div className="portrait-scanline" />
              <span className="portrait-corner portrait-corner-top" />
              <span className="portrait-corner portrait-corner-bottom" />
            </div>
          </div>

          <div className="about-copy">
            <p className="about-overline">/ About me</p>
            <h2 id="about-title">A student who likes getting the data clean.</h2>
            <p className="about-description">
              I am Heng Sengthay, a Year 3 Data Science and Engineering student at
              the Royal University of Phnom Penh. Most of what I build starts the
              same way: someone hands me a messy CSV and asks a question about it.
              I like that part — the cleaning, the checking, the moment a column
              finally means something.
            </p>

            <div className="about-strengths">
              <div className="strength">
                <span className="strength-icon">
                  <AboutIcon type="focus" />
                </span>
                <span>Project-Based Learning</span>
              </div>
              <div className="strength">
                <span className="strength-icon">
                  <AboutIcon type="architecture" />
                </span>
                <span>Dashboards & Data Cleaning</span>
              </div>
              <div className="strength">
                <span className="strength-icon">
                  <AboutIcon type="story" />
                </span>
                <span>Data Storytelling</span>
              </div>
            </div>

            <p className="about-quote">
            Complex data architectures is engineered quietly.
            allowing reliable insights to define success.
            </p>
          </div>
        </div>
      </MotionSection>
  )
}
