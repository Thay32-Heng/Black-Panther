import { projectNotes } from "../data"

import MotionSection from "../MotionSection"
export default function WritingSection() {
  return (
    <MotionSection
      id="writing"
      tabIndex={-1}
      aria-labelledby="logbook-title"
    >
      <div className="logbook">
        <div className="logbook-inner">
          <header className="logbook-heading">
            <p className="logbook-overline">/ Project Notes</p>
            <h2 id="logbook-title">Learning in Public.</h2>
            <p className="logbook-intro">
              Short notes from public repositories. Each note links directly to
              the code behind it.
            </p>
          </header>

          <div className="journal-header" aria-hidden="true">
            <span>REPO NOTES / PUBLIC</span>
            <span>04 ENTRIES</span>
          </div>

          <div className="logbook-grid">
            {projectNotes.map((entry, index) => (
              <article className="logbook-entry" key={entry.title}>
                <p className="entry-category">
                  <span>0{index + 1}</span>
                  {entry.category}
                </p>
                <h3>{entry.title}</h3>
                <p className="entry-excerpt">{entry.excerpt}</p>
                <a
                  className="entry-link"
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Repository
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
      </div>
    </MotionSection>
  )
}
