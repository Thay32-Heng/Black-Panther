const certifications = [
  {
    rank: "CERT / 01",
    title: "AWS Certified",
    subtitle: "Data Analytics — Specialty",
    type: "cloud",
  },
  {
    rank: "CERT / 02",
    title: "GCP Data Engineer",
    subtitle: "Professional Certification",
    type: "network",
  },
  {
    rank: "CERT / 03",
    title: "Databricks Engineer",
    subtitle: "Data Engineer — Professional",
    type: "lakehouse",
  },
  {
    rank: "RANK / 04",
    title: "Kaggle Silver",
    subtitle: "Competition Medalist",
    type: "competition",
  },
] as const

function CertificationBadge({
  type,
}: {
  type: (typeof certifications)[number]["type"]
}) {
  return (
    <svg className="certification-badge" viewBox="0 0 180 210" aria-hidden="true">
      <path
        className="badge-outer"
        d="M90 8 157 32v68c0 48-27 80-67 101-40-21-67-53-67-101V32L90 8Z"
      />
      <path
        className="badge-inner"
        d="M90 22 144 42v57c0 38-20 65-54 84-34-19-54-46-54-84V42L90 22Z"
      />
      <path className="badge-top-mark" d="M74 35h32" />

      {type === "cloud" && (
        <g className="badge-glyph">
          <path d="M58 108h63c10 0 18-8 18-18 0-9-7-17-16-18-4-18-20-31-39-31-21 0-38 16-40 37-9 2-16 10-16 20 0 11 9 20 20 20h10" />
          <path d="m71 105 19-19 19 19M90 86v45" />
        </g>
      )}

      {type === "network" && (
        <g className="badge-glyph">
          <circle cx="90" cy="84" r="13" />
          <circle cx="58" cy="122" r="9" />
          <circle cx="122" cy="122" r="9" />
          <path d="m81 94-18 20M99 94l18 20M67 122h46" />
          <path d="M82 84h16M90 76v16" />
        </g>
      )}

      {type === "lakehouse" && (
        <g className="badge-glyph">
          <path d="m90 49 42 21-42 21-42-21 42-21Z" />
          <path d="m48 88 42 21 42-21M48 106l42 21 42-21" />
          <path className="badge-accent-fill" d="m90 62 17 8-17 9-17-9 17-8Z" />
        </g>
      )}

      {type === "competition" && (
        <g className="badge-glyph">
          <path d="M61 55h58v48c0 16-13 29-29 29s-29-13-29-29V55Z" />
          <path d="M61 67H44v14c0 13 9 23 22 25M119 67h17v14c0 13-9 23-22 25M90 132v18M72 150h36" />
          <path className="badge-accent-fill" d="m90 68 5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1 5-11Z" />
        </g>
      )}

      <circle className="badge-rivet" cx="90" cy="176" r="3" />
    </svg>
  )
}

export default function Certifications() {
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