import { certifications } from "../data"
import { CertificationBadge } from "../CertificationBadge"

const commitBars = [2, 4, 3, 5, 7, 4, 6, 8, 5, 7, 9, 6, 8, 10]

export default function SignalsSection() {
  return (
    <section className="signals" id="signals" aria-labelledby="signals-title">
      <div className="signals-inner">
        <header className="signals-heading">
          <p className="signals-overline">/ Signals</p>
          <h2 id="signals-title">Proof of the Pulse.</h2>
          <p className="signals-intro">
            A compact snapshot of coding activity and formal credentials.
          </p>
        </header>

        <div className="signals-grid">
          <article
            className="signals-panel"
            id="telemetry"
            aria-labelledby="signals-telemetry-title"
          >
            <div className="signals-panel-top">
              <h3 id="signals-telemetry-title">Coding Activity</h3>
              <span className="signals-tag">Sample data</span>
            </div>

            <div className="signals-stats">
              <div>
                <strong>184</strong>
                <span>Commits / 30d</span>
              </div>
              <div>
                <strong>22</strong>
                <span>Active days</span>
              </div>
              <div>
                <strong>09</strong>
                <span>Longest streak</span>
              </div>
            </div>

            <div className="signals-bars" aria-hidden="true">
              {commitBars.map((height, index) => (
                <i style={{ height: `${height * 4}px` }} key={`${height}-${index}`} />
              ))}
            </div>
          </article>

          <article
            className="signals-panel"
            id="credentials"
            aria-labelledby="signals-credentials-title"
          >
            <div className="signals-panel-top">
              <h3 id="signals-credentials-title">Credentials</h3>
              <span className="signals-tag">04 items</span>
            </div>

            <ul className="signals-list">
              {certifications.map((certification) => (
                <li key={certification.title}>
                  <span className="signals-badge">
                    <CertificationBadge type={certification.type} />
                  </span>
                  <span className="signals-credential">
                    <strong>{certification.title}</strong>
                    <small>{certification.subtitle}</small>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
