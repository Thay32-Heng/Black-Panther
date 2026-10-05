import { certifications } from "../data"
import { CertificationBadge } from "../CertificationBadge"

export default function TrophiesSection() {
  return (
          <section className="trophies" aria-labelledby="trophies-title">
        <div className="trophies-inner">
          <header className="trophies-heading">
            <p className="trophies-overline">/ Trophies &amp; Ranks</p>
            <h2 id="trophies-title">Certified in the Fog.</h2>
            <p className="trophies-intro">
              I don&apos;t just build pipelines in the dark. I validate my skills
              on global battlegrounds.
            </p>
          </header>

          <div className="trophy-room">
            <div className="trophy-room-meta" aria-hidden="true">
              <span>VERIFIED CREDENTIALS</span>
              <span>VAULT / 04</span>
            </div>

            <div className="badges-grid">
              {certifications.map((certification) => (
                <article className="badge-item" key={certification.title}>
                  <span className="badge-rank">{certification.rank}</span>
                  <div className="badge-mark">
                    <CertificationBadge type={certification.type} />
                  </div>
                  <h3>{certification.title}</h3>
                  <p>{certification.subtitle}</p>
                  <span className="badge-verified">
                    <i aria-hidden="true" />
                    Verified
                  </span>
                </article>
              ))}
            </div>

            <div className="trophy-plinth" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </section>
  )
}
