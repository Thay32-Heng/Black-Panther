import { learningSignals } from "../data"
import { CertificationBadge } from "../CertificationBadge"

import MotionSection from "../MotionSection"
export default function SignalsSection() {
  return (
    <MotionSection className="signals" id="signals" aria-labelledby="signals-title">
      <div className="signals-inner">
        <header className="signals-heading">
          <p className="signals-overline">/ Signals</p>
          <h2 id="signals-title">Learning Pulse.</h2>
          <p className="signals-intro">
            A current snapshot of academic progress. Formal certifications will
            be added after they are completed.
          </p>
        </header>

        <div className="signals-grid signals-grid--single">
          <article
            className="signals-panel"
            id="credentials"
            aria-labelledby="signals-credentials-title"
          >
            <div className="signals-panel-top">
              <h3 id="signals-credentials-title">Learning focus</h3>
              <span className="signals-tag">03 items</span>
            </div>

            <ul className="signals-list">
              {learningSignals.map((signal) => (
                <li key={signal.title}>
                  <span className="signals-badge">
                    <CertificationBadge />
                  </span>
                  <span className="signals-credential">
                    <strong>{signal.title}</strong>
                    <small>
                      {signal.rank} · {signal.subtitle}
                    </small>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </MotionSection>
  )
}
