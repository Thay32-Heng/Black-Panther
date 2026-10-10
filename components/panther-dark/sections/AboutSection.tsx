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
            <p className="about-overline">/ Who I am</p>
            <h2 id="about-title">The Student Behind the Fog.</h2>
            <p className="about-description">
              My work focuses on turning messy data into clear dashboards,
              practical tools, and useful insights. As a Year 3 student, I am
              looking for an internship where I can learn from a team,
              contribute to real data work, and keep building.
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
              “Stay quiet, keep building — let success speak.”
            </p>
          </div>
        </div>
      </MotionSection>
  )
}
