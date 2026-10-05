const logbookEntries = [
  {
    date: "MAY 18, 2025",
    readTime: "08 MIN",
    category: "DATA ARCHITECTURE",
    title: "The Cost of a Pipeline Nobody Understands",
    excerpt:
      "Why operational clarity matters more than clever abstractions when a data platform begins to scale across teams.",
  },
  {
    date: "APR 02, 2025",
    readTime: "06 MIN",
    category: "MACHINE LEARNING",
    title: "Your Model Is Not the Product",
    excerpt:
      "A field note on the systems, interfaces, and human decisions that turn a strong prediction into measurable value.",
  },
  {
    date: "FEB 21, 2025",
    readTime: "11 MIN",
    category: "DATA QUALITY",
    title: "Monitoring the Truth, Not Just the Job",
    excerpt:
      "Green dashboards can still deliver broken data. These are the invariants I monitor beyond pipeline uptime.",
  },
  {
    date: "JAN 09, 2025",
    readTime: "05 MIN",
    category: "ENGINEERING CULTURE",
    title: "Silence as a Technical Advantage",
    excerpt:
      "How deep work, deliberate communication, and fewer handoffs produce calmer systems and better engineering decisions.",
  },
] as const

export default function Logbook() {
  return (
      <section className="logbook" aria-labelledby="logbook-title">
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
      </section>
  )
}