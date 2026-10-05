import { logbookEntries } from "../data"

export default function LogbookSection() {
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
