import { logbookEntries, postMortems } from "../data"

export default function WritingSection() {
  return (
    <section
      id="writing"
      tabIndex={-1}
      aria-labelledby="logbook-title postmortems-title"
    >
      <div className="logbook">
        <div className="logbook-inner">
          <header className="logbook-heading">
            <p className="logbook-overline">/ The Logbook</p>
            <h2 id="logbook-title">Translating Complexity.</h2>
            <p className="logbook-intro">
              I speak Python to machines, but I translate it into strategy for
              humans. Here are a few thoughts from the field.
            </p>
          </header>

          <div className="journal-header" aria-hidden="true">
            <span>FIELD NOTES / 2025</span>
            <span>04 ENTRIES</span>
          </div>

          <div className="logbook-grid">
            {logbookEntries.map((entry, index) => (
              <article className="logbook-entry" key={entry.title}>
                <div className="entry-meta">
                  <time>{entry.date}</time>
                  <span>{entry.readTime}</span>
                </div>
                <p className="entry-category">
                  <span>0{index + 1}</span>
                  {entry.category}
                </p>
                <h3>{entry.title}</h3>
                <p className="entry-excerpt">{entry.excerpt}</p>
                <a className="entry-link" href="#logbook-title">
                  Read More
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>

          <div className="journal-footer">
            <span>END OF CURRENT LOG</span>
            <span aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="postmortems">
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
      </div>
    </section>
  )
}
