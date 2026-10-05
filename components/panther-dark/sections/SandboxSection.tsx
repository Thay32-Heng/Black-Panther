import InteractiveChart from "../InteractiveChart"

export default function SandboxSection() {
  return (
          <section className="sandbox" id="sandbox" aria-labelledby="sandbox-title">
        <div className="sandbox-inner">
          <header className="sandbox-heading">
            <p className="sandbox-overline">/ The Sandbox</p>
            <h2 id="sandbox-title">Data in Motion.</h2>
            <p className="sandbox-intro">
              Don&apos;t just take my word for it. Interact with the live data model
              below to see how I extract signals from the noise.
            </p>
          </header>

          <InteractiveChart />

          <p className="sandbox-hint">
            <span aria-hidden="true">+</span>
            Select a range and hover over the data points to inspect the model
          </p>
        </div>
      </section>
  )
}
