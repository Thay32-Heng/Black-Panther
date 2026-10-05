const postMortems = [
  {
    id: "INC-042",
    title: "The Silent Schema Drift",
    date: "2024.08.17",
    system: "STREAM_PROCESSOR",
    crash:
      "A vendor changed a nested event field without notice. The pipeline stayed green while quietly dropping 18% of incoming records.",
    fix:
      "Quarantined malformed events, replayed the raw topic, and introduced contract validation at every ingestion boundary.",
    lesson:
      "A successful job is not the same as correct data. Monitor business invariants, not just infrastructure health.",
    terms: "SCHEMA REGISTRY / DLQ / REPLAY",
  },
  {
    id: "INC-057",
    title: "The Costly Cartesian Join",
    date: "2025.02.03",
    system: "FEATURE_PIPELINE",
    crash:
      "An overlooked many-to-many join multiplied a feature table beyond memory limits and brought the overnight model run to a halt.",
    fix:
      "Stopped the workflow, corrected the grain, added cardinality assertions, and backfilled only the affected partitions.",
    lesson:
      "Define data grain before writing the join. Scale magnifies assumptions faster than it magnifies value.",
    terms: "SPARK / ASSERTIONS / PARTITIONING",
  },
] as const

export default function PostMortems() {
  return (
      <section className="postmortems" aria-labelledby="postmortems-title">
        <div className="postmortems-inner">
          <header className="postmortems-heading">
            <p className="postmortems-overline">/ Post-Mortems</p>
            <h2 id="postmortems-title">Scars of the Hunt.</h2>
            <p className="postmortems-intro">
              Every engineer has crashed a pipeline. The difference is how we
              rebuild it. Here are my favorite failures and what they taught me.
            </p>
          </header>

          <div className="postmortem-grid">
            {postMortems.map((incident, index) => (
              <article className="postmortem-card" key={incident.id}>
                <div className="incident-header">
                  <div>
                    <span>{incident.id}</span>
                    <span>{incident.date}</span>
                  </div>
                  <span className="resolved-status">
                    <i aria-hidden="true" />
                    Resolved
                  </span>
                </div>

                <div className="incident-title-row">
                  <span className="incident-index">0{index + 1}</span>
                  <div>
                    <p>{incident.system}</p>
                    <h3>{incident.title}</h3>
                  </div>
                </div>

                <div className="incident-report">
                  <div className="incident-phase crash-phase">
                    <div className="phase-label">
                      <span className="warning-icon" aria-hidden="true">
                        !
                      </span>
                      <h4>The Crash</h4>
                    </div>
                    <p>{incident.crash}</p>
                  </div>

                  <div className="incident-phase">
                    <div className="phase-label">
                      <span className="phase-marker" aria-hidden="true" />
                      <h4>The Fix</h4>
                    </div>
                    <p>{incident.fix}</p>
                  </div>

                  <div className="incident-phase lesson-phase">
                    <div className="phase-label">
                      <span className="phase-marker" aria-hidden="true" />
                      <h4>The Lesson</h4>
                    </div>
                    <p>{incident.lesson}</p>
                  </div>
                </div>

                <footer className="incident-footer">
                  <span>{incident.terms}</span>
                  <span>STATUS / CLOSED</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
  )
}