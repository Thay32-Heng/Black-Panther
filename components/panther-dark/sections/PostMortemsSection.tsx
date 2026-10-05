import { postMortems } from "../data"

export default function PostMortemsSection() {
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
