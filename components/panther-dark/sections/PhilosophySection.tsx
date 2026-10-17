import { engineeringPrinciples } from "../data"

import MotionSection from "../MotionSection"
export default function PhilosophySection() {
  return (
          <MotionSection className="philosophy" id="philosophy" aria-labelledby="philosophy-title">
        <div className="philosophy-inner">
          <header className="philosophy-heading">
            <p className="philosophy-overline">/ Working principles</p>
            <h2 id="philosophy-title">Three things I keep in mind.</h2>
            <p className="philosophy-intro">
              These are not slogans. They are the three decisions I keep making
              when a dataset fights back.
            </p>
          </header>

          <div className="principles-grid">
            {engineeringPrinciples.map((principle) => (
              <article className="principle-card" key={principle.number}>
                <div className="principle-top">
                  <span className="principle-number">{principle.number}</span>
                  <span className="principle-symbol" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </div>

                <div className="principle-copy">
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>

                <div className="principle-footer">
                  <span>{principle.code}</span>
                  <span aria-hidden="true">+</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>
  )
}
