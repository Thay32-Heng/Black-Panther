import { pipelineStages, stackCategories } from "../data"
import { PipelineIcon } from "../PipelineIcon"
import MotionSection from "../MotionSection"

export default function ArchitectureSection() {
  return (
    <MotionSection
      id="architecture"
      tabIndex={-1}
      aria-labelledby="stack-title architecture-title"
    >
      <div className="stack">
        <div className="stack-inner">
          <header className="stack-heading">
            <p className="stack-overline">/ The Arsenal</p>
            <h2 id="stack-title">Weapons of Choice.</h2>
            <p className="stack-intro">
              Tools I have actually used in RUPP coursework, labs, and GitHub
              projects.
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
      </div>

      <div className="architecture">
        <div className="architecture-inner">
          <header className="architecture-heading">
            <p className="architecture-overline">/ The Blueprint</p>
            <h2 id="architecture-title">Systematic by Design.</h2>
            <p className="architecture-intro">
              I focus on clear, repeatable steps. Here is the workflow I practice
              on student and prototype data projects.
            </p>
          </header>

          <div className="pipeline-shell">
            <div className="pipeline-meta" aria-hidden="true">
              <span>ARCH / 001</span>
              <span>FLOW STATUS: ACTIVE</span>
            </div>

            <div className="pipeline">
              {pipelineStages.map((stage, index) => (
                <div className="pipeline-segment" key={stage.number}>
                  <article className="pipeline-node">
                    <div className="pipeline-node-top">
                      <span>{stage.label}</span>
                      <span>{stage.number}</span>
                    </div>
                    <span className="pipeline-icon">
                      <PipelineIcon type={stage.type} />
                    </span>
                    <h3>
                      <span>{stage.number}.</span> {stage.title}
                      {"suffix" in stage && (
                        <small>{stage.suffix}</small>
                      )}
                    </h3>
                    <p>{stage.detail}</p>
                    <span className="node-status" aria-hidden="true">
                      ONLINE
                    </span>
                  </article>

                  {index < pipelineStages.length - 1 && (
                    <div className="pipeline-connector" aria-hidden="true">
                      <span className="flow-pulse" />
                      <span className="flow-arrow" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pipeline-scale" aria-hidden="true">
              <span>00</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}
