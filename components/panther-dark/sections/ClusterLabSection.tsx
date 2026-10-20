import ClusterLab from "../ClusterLab"
import ProjectTable from "../ProjectTable"
import MotionSection from "../MotionSection"

/**
 * Phase E — the interactive half of the site.
 *
 * Sits between the rainfall sandbox and the project grid: the sandbox proves a
 * real dataset can be plotted, this proves an algorithm can be driven. Both are
 * hand-built SVG so the section weighs nothing and copies nobody.
 */
export default function ClusterLabSection() {
  return (
    <MotionSection
      className="rin-lab-section rin-tone-ink"
      id="lab"
      tabIndex={-1}
      aria-labelledby="lab-title"
    >
      <div className="rin-lab-inner">
        <header className="rin-lab-heading">
          <p className="rin-lab-overline">/ Run it yourself</p>
          <h2 id="lab-title">
            K-means, with the lid off.
          </h2>
          <p className="rin-lab-intro">
            Most portfolios show a chart. This one runs an algorithm. Pick a
            value of k, step one Lloyd iteration at a time, and watch the
            centroids drift until nothing changes. The inertia readout is real —
            it is the within-cluster sum of squares from the run in front of you.
          </p>
        </header>

        <ClusterLab />

        <p className="rin-lab-hint">
          <span aria-hidden="true">+</span>
          Raise k past 4 and you are over-splitting a cloud that only has four
          real groups — inertia keeps dropping, which is exactly the trap
          accuracy alone will not catch.
        </p>

        <div className="rin-lab-table-block">
          <h3 className="rin-lab-subtitle">The same eight projects, as a table.</h3>
          <p className="rin-lab-subnote">
            A card reads well one at a time; a table lets you compare. Sort by
            any column — the counts are pulled from the project data, not typed
            in by hand.
          </p>
          <ProjectTable />
        </div>
      </div>
    </MotionSection>
  )
}
