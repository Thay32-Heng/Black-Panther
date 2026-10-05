const engineeringPrinciples = [
  {
    number: "01",
    title: "Clean Data > Complex Models",
    description:
      "A sophisticated model cannot rescue a broken foundation. I prioritize observable, tested, and trustworthy data before adding complexity.",
    code: "QUALITY / CLARITY",
  },
  {
    number: "02",
    title: "Scalable Architecture",
    description:
      "Systems should grow without becoming fragile. I design modular foundations that remain clear under greater volume, velocity, and change.",
    code: "SCALE / RESILIENCE",
  },
  {
    number: "03",
    title: "Security in the Fog",
    description:
      "Trust is an architectural requirement, not an afterthought. Every pipeline should protect access, lineage, and sensitive information by design.",
    code: "TRUST / GOVERNANCE",
  },
] as const

export default function Philosophy() {
  return (
      <section className="philosophy" aria-labelledby="philosophy-title">
        <div className="philosophy-inner">
          <header className="philosophy-heading">
            <p className="philosophy-overline">/ The Philosophy</p>
            <h2 id="philosophy-title">Principles Over Syntax.</h2>
            <p className="philosophy-intro">
              Languages change. Frameworks die. But a solid engineering mindset
              scales forever. These are the laws I code by.
            </p>
          </header>

          <div className="principles-grid">
            {engineeringPrinciples.map((principle) => (
              <article className="principle-card" key={principle.number}>
                <div className="principle-top">
                  <span className="principle-number">{principle.number}</span>
                  <span className="principle-symbol" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </div>

                <div className="principle-copy">
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>

                <div className="principle-footer">
                  <span>{principle.code}</span>
                  <span aria-hidden="true">+</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
  )
}