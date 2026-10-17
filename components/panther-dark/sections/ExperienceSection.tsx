import { experienceTimeline } from "../data"

import MotionSection from "../MotionSection"
export default function ExperienceSection() {
  return (
          <MotionSection className="experience" id="experience" tabIndex={-1} aria-labelledby="experience-title">
        <div className="experience-inner">
          <header className="experience-heading">
            <p className="experience-overline">/ What I have built so far</p>
            <h2 id="experience-title">From coursework to shipped projects.</h2>
            <p className="experience-intro">
              I am still early in my career, so this is a record of what I have
              actually completed and studied, not a list of job titles.
            </p>
          </header>

          <div className="timeline">
            <div className="timeline-line" aria-hidden="true">
              <span className="timeline-flow" />
            </div>

            {experienceTimeline.map((entry, index) => (
              <article
                className={
                  index % 2 === 0
                    ? "timeline-entry timeline-entry-left"
                    : "timeline-entry timeline-entry-right"
                }
                key={`${entry.year}-${entry.role}`}
              >
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span>{entry.focus}</span>
                    <span>0{experienceTimeline.length - index}</span>
                  </div>
                  <time>{entry.year}</time>
                  <h3>{entry.role}</h3>
                  <p>{entry.description}</p>
                </div>

                <div className="timeline-node" aria-hidden="true">
                  <span />
                </div>
              </article>
            ))}
          </div>

          <div className="timeline-origin" aria-hidden="true">
            <span>ORIGIN POINT</span>
          </div>
        </div>
      </MotionSection>
  )
}
