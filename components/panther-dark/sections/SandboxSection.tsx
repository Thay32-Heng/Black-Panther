import InteractiveChart from "../InteractiveChart"

import MotionSection from "../MotionSection"
export default function SandboxSection() {
  return (
          <MotionSection className="sandbox" id="sandbox" tabIndex={-1} aria-labelledby="sandbox-title">
        <div className="sandbox-inner">
          <header className="sandbox-heading">
            <p className="sandbox-overline">/ Real data, not a mockup</p>
            <h2 id="sandbox-title">132 months of actual rainfall.</h2>
            <p className="sandbox-intro">
              This is the same dataset from my time-series project, plotted three
              ways: the full monthly series, the seasonal mean for each calendar
              month, and the yearly totals. Hover or tab any point to read it.
            </p>
          </header>

          <InteractiveChart />

          <p className="sandbox-hint">
            <span aria-hidden="true">+</span>
            Switch views to see the time plot, the seasonal cycle, and the year-on-year totals
          </p>
        </div>
      </MotionSection>
  )
}
