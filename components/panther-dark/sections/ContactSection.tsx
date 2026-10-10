import MotionSection from "../MotionSection"

export default function ContactSection() {
  return (
          <MotionSection className="contact" id="contact" tabIndex={-1} aria-labelledby="contact-title">
        <div className="contact-orbit contact-orbit-one" aria-hidden="true" />
        <div className="contact-orbit contact-orbit-two" aria-hidden="true" />

        <div className="contact-inner">
          <header className="contact-heading">
            <p className="contact-overline">/ Initiate Contact</p>
            <h2 id="contact-title">Ready to Clear the Fog?</h2>
            <p className="contact-intro">
              I am currently looking for internship opportunities in data science
              and data engineering. If you have a data problem—or a team that
              needs a curious builder—clear the fog and reach out.
            </p>
          </header>

          <div className="contact-actions">
            <a
              className="contact-button contact-button-secondary"
              href="mailto:sengthay32@gmail.com"
            >
              <svg className="contact-button-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zm2.36-.5L12 11l7.64-6H4.36zM20 7.3l-7.4 5.8a1 1 0 0 1-1.2 0L4 7.3V18.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V7.3z" /></svg>
              <span>Send an Email</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="contact-button contact-button-primary"
              href="https://github.com/Thay32-Heng?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="contact-button-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.94 10.94 0 0 1 5.77 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.12 3.05.73.81 1.17 1.84 1.17 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15v3.19c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" /></svg>
              <span>View Repositories</span>
              <span aria-hidden="true">→</span>
            </a>

          </div>

          <p className="contact-email">sengthay32@gmail.com</p>

          <div className="contact-status">
            <span className="contact-status-dot" />
            <span>INTERNSHIP READY / OPEN TO DATA ROLES</span>
          </div>
        </div>

        <footer className="site-footer">
          <span>© 2025 HENG SENGTHAY</span>
          <span>ENGINEERED WITH INTENT</span>
          <a href="#content">RETURN TO ORIGIN ↑</a>
        </footer>
      </MotionSection>
  )
}