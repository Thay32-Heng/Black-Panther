const stackCategories = [
  {
    number: "01",
    title: "Data Engineering",
    description: "Reliable systems built to move, transform, and serve data at scale.",
    tools: ["Python", "SQL", "Apache Spark", "Airflow", "Kafka", "dbt"],
  },
  {
    number: "02",
    title: "Data Science & ML",
    description: "Focused modeling workflows that turn uncertainty into clear outcomes.",
    tools: ["Pandas", "TensorFlow", "PyTorch", "scikit-learn", "NumPy", "MLflow"],
  },
  {
    number: "03",
    title: "Cloud & DevOps",
    description: "Production infrastructure designed for resilience and repeatable delivery.",
    tools: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux"],
  },
]

export default function TechStack() {
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
            {stackCategories.map((category) => (
              <article className="stack-card transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,107,0,0.35)] hover:border-[#FF6B00]" key={category.title}>
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
