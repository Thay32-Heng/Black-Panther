import { pipelineStages } from "../data"
import { PipelineIcon } from "../PipelineIcon"

export default function ArchitectureSection() {
  return (
          <section className="architecture" aria-labelledby="architecture-title">
        <div className="architecture-inner">
          <header className="architecture-heading">
            <p className="architecture-overline">/ The Blueprint</p>
            <h2 id="architecture-title">Systematic by Design.</h2>
            <p className="architecture-intro">
              I don&apos;t just write code; I design scalable systems. Here is how
              I process chaotic data into actionable intelligence.
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
      </section>
  )
}
