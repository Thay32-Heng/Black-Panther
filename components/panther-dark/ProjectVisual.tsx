import type { featuredProjects } from "./data"

export function ProjectVisual({ type }: { type: (typeof featuredProjects)[number]["type"] }) {
  if (type === "anomaly") {
    return (
      <svg viewBox="0 0 540 320" aria-hidden="true">
        <g className="project-grid-lines">
          {[50, 105, 160, 215, 270].map((y) => (
            <line x1="30" x2="510" y1={y} y2={y} key={y} />
          ))}
          {[30, 126, 222, 318, 414, 510].map((x) => (
            <line x1={x} x2={x} y1="25" y2="295" key={x} />
          ))}
        </g>
        <path
          className="project-data-line"
          d="M30 230C70 226 83 208 121 215S171 242 207 210 254 180 284 196 327 217 353 184 386 74 411 105 449 205 510 145"
        />
        <path
          className="project-data-line project-data-line-muted"
          d="M30 256C81 235 118 249 154 228S220 246 259 221 321 243 359 228 431 239 510 216"
        />
        <circle className="project-alert-ring" cx="394" cy="93" r="21" />
        <circle className="project-alert" cx="394" cy="93" r="4" />
        <g className="project-chart-label">
          <rect x="415" y="55" width="86" height="27" />
          <text x="427" y="72">
            ANOMALY 0.94
          </text>
        </g>
      </svg>
    )
  }

  if (type === "forecast") {
    return (
      <svg viewBox="0 0 540 320" aria-hidden="true">
        <g className="project-grid-lines">
          {[50, 105, 160, 215, 270].map((y) => (
            <line x1="30" x2="510" y1={y} y2={y} key={y} />
          ))}
        </g>
        <path
          className="forecast-range"
          d="M30 245C91 226 128 229 182 196S267 171 319 133 401 95 510 46L510 126C421 141 369 175 314 185S232 218 179 235 95 264 30 273Z"
        />
        <path
          className="project-data-line"
          d="M30 258C91 244 130 243 182 215S270 194 319 159 406 123 510 83"
        />
        <path className="forecast-divider" d="M319 35V282" />
        <g className="forecast-dots">
          {[70, 118, 172, 222, 274].map((x, index) => (
            <circle cx={x} cy={[241, 235, 219, 203, 188][index]} r="3" key={x} />
          ))}
        </g>
        <text className="project-axis-copy" x="335" y="55">
          PREDICTED RANGE
        </text>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 540 320" aria-hidden="true">
      <g className="vault-links">
        <path d="M91 78 217 155 92 244M217 155l119-89M217 155l129 105M336 66l112 96M346 260l102-98" />
      </g>
      <g className="vault-nodes">
        <circle cx="91" cy="78" r="28" />
        <circle cx="92" cy="244" r="28" />
        <circle cx="217" cy="155" r="42" />
        <circle cx="336" cy="66" r="28" />
        <circle cx="346" cy="260" r="28" />
        <circle cx="448" cy="162" r="37" />
      </g>
      <g className="vault-centers">
        <circle cx="91" cy="78" r="4" />
        <circle cx="92" cy="244" r="4" />
        <circle className="vault-center-active" cx="217" cy="155" r="6" />
        <circle cx="336" cy="66" r="4" />
        <circle cx="346" cy="260" r="4" />
        <circle cx="448" cy="162" r="5" />
      </g>
      <g className="project-chart-label">
        <rect x="244" y="125" width="90" height="27" />
        <text x="255" y="142">
          IDENTITY MATCH
        </text>
      </g>
    </svg>
  )
}
