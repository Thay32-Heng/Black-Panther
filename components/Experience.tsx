const experienceTimeline = [
  {
    year: "2025",
    role: "Lead Data Architect",
    description:
      "Designing resilient, cloud-native data platforms that unify real-time intelligence and governed analytics.",
    focus: "SYSTEM DESIGN / STRATEGY",
  },
  {
    year: "2023",
    role: "Senior Data Engineer",
    description:
      "Scaled event-driven pipelines and transformed fragmented services into a dependable data ecosystem.",
    focus: "STREAMING / PLATFORM",
  },
  {
    year: "2021",
    role: "Machine Learning Engineer",
    description:
      "Moved predictive models beyond notebooks into observable, repeatable production workflows.",
    focus: "MLOPS / INFERENCE",
  },
  {
    year: "2019",
    role: "Data Scientist",
    description:
      "Translated ambiguous business questions into clear experiments, forecasts, and decision-ready stories.",
    focus: "MODELING / INSIGHT",
  },
  {
    year: "2017",
    role: "The First Script",
    description:
      "Automated a repetitive problem with Python and discovered the leverage hidden inside well-structured data.",
    focus: "PYTHON / CURIOSITY",
  },
] as const

export default function Experience() {
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