const pipelineStages = [
  {
    number: "01",
    title: "Raw Sources",
    label: "INPUT LAYER",
    detail: "APIs · Events · Databases",
    type: "sources",
  },
  {
    number: "02",
    title: "Ingestion & Processing",
    label: "COMPUTE LAYER",
    detail: "Stream · Batch · Transform",
    type: "processing",
  },
  {
    number: "03",
    title: "Data Vault",
    suffix: "(Warehouse)",
    label: "STORAGE LAYER",
    detail: "Modeled · Tested · Governed",
    type: "vault",
  },
  {
    number: "04",
    title: "Output & ML Models",
    label: "INTELLIGENCE LAYER",
    detail: "Predict · Visualize · Decide",
    type: "output",
  },
] as const

function PipelineIcon({ type }: { type: (typeof pipelineStages)[number]["type"] }) {
  if (type === "sources") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <ellipse cx="20" cy="9" rx="12" ry="5" />
        <path d="M8 9v10c0 2.8 5.4 5 12 5s12-2.2 12-5V9M8 19v11c0 2.8 5.4 5 12 5s12-2.2 12-5V19" />
        <path d="M8 14c0 2.8 5.4 5 12 5s12-2.2 12-5" />
      </svg>
    )
  }

  if (type === "processing") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <rect x="10" y="10" width="20" height="20" />
        <rect x="15" y="15" width="10" height="10" />
        <path d="M15 4v6M25 4v6M15 30v6M25 30v6M4 15h6M4 25h6M30 15h6M30 25h6" />
      </svg>
    )
  }

  if (type === "vault") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M6 13 20 6l14 7-14 7-14-7Z" />
        <path d="m6 20 14 7 14-7M6 27l14 7 14-7" />
        <path d="M6 13v14M34 13v14" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="8" cy="20" r="3" />
      <circle cx="31" cy="9" r="3" />
      <circle cx="31" cy="31" r="3" />
      <circle cx="20" cy="20" r="4" />
      <path d="m11 20 5 0M23 17l5-6M23 23l5 6" />
    </svg>
  )
}

export default function Architecture() {
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