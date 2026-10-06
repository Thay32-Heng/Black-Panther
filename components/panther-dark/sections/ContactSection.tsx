export default function ContactSection() {
  return (
          <section className="contact" id="contact" tabIndex={-1} aria-labelledby="contact-title">
        <div className="contact-orbit contact-orbit-one" aria-hidden="true" />
        <div className="contact-orbit contact-orbit-two" aria-hidden="true" />

        <div className="contact-inner">
          <header className="contact-heading">
            <p className="contact-overline">/ Initiate Contact</p>
            <h2 id="contact-title">Ready to Clear the Fog?</h2>
            <p className="contact-intro">
              No messy contact forms. Just direct lines to my terminal. If you
              have a data problem, let’s build a solution.
            </p>
          </header>

          <div className="contact-actions">
            <a
              className="contact-button contact-button-secondary"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="contact-button contact-button-primary"
              href="mailto:hello@example.com"
            >
              <span>Send an Email</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              className="contact-button contact-button-secondary"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="contact-status">
            <span className="contact-status-dot" />
            <span>LINE OPEN / AVAILABLE FOR SELECT PROJECTS</span>
          </div>
        </div>

        <footer className="site-footer">
          <span>© 2025 DATA SYSTEMS</span>
          <span>ENGINEERED WITH INTENT</span>
          <a href="#content">RETURN TO ORIGIN ↑</a>
        </footer>
      </section>
  )
}
