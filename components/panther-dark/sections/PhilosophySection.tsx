import { engineeringPrinciples } from "../data"

export default function PhilosophySection() {
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
