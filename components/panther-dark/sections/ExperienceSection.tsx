import { experienceTimeline } from "../data"

export default function ExperienceSection() {
  return (
          <section className="experience" aria-labelledby="experience-title">
        <div className="experience-inner">
          <header className="experience-heading">
            <p className="experience-overline">/ The Evolution</p>
            <h2 id="experience-title">Tracing the Hunt.</h2>
            <p className="experience-intro">
              From writing the first script to architecting complex data
              ecosystems. Here is the path I’ve walked.
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
      </section>
  )
}
