import { stackCategories } from "../data"

export default function StackSection() {
  return (
          <section className="stack" id="work" aria-labelledby="stack-title">
        <div className="stack-inner">
          <header className="stack-heading">
            <p className="stack-overline">/ The Arsenal</p>
            <h2 id="stack-title">Weapons of Choice.</h2>
            <p className="stack-intro">
              Precision tools I use to engineer pipelines, train models, and deploy
              scalable solutions.
            </p>
          </header>

          <div className="stack-grid">
            {stackCategories.map((category, index) => (
              <article
                className={
                  index === 0 ? "stack-card stack-card-highlight" : "stack-card"
                }
                key={category.title}
              >
                <div className="card-topline">
                  <span className="card-number">{category.number}</span>
                  <span className="card-mark" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="tool-list" aria-label={`${category.title} technologies`}>
                  {category.tools.map((tool) => (
                    <span className="tool-tag" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="interaction-note">
            <span className="interaction-symbol" aria-hidden="true">
              +
            </span>
            Hover over a technology to illuminate the stack
          </p>
        </div>
      </section>
  )
}
