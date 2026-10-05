const dataNodes = [
  { cx: 188, cy: 87, r: 5 },
  { cx: 323, cy: 58, r: 4 },
  { cx: 426, cy: 137, r: 6 },
  { cx: 258, cy: 190, r: 5 },
  { cx: 98, cy: 220, r: 4 },
  { cx: 380, cy: 282, r: 4 },
  { cx: 210, cy: 338, r: 6 },
  { cx: 482, cy: 366, r: 5 },
  { cx: 315, cy: 448, r: 4 },
  { cx: 118, cy: 417, r: 5 },
]

function DataNetwork() {
  return (
    <div className="network-wrap" aria-hidden="true">
      <div className="network-orbit network-orbit-one" />
      <div className="network-orbit network-orbit-two" />

      <svg
        className="network-svg"
        viewBox="0 0 560 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="network-lines">
          <path d="M98 220L188 87L258 190L98 220Z" />
          <path d="M188 87L323 58L426 137L258 190L188 87Z" />
          <path d="M258 190L380 282L210 338L98 220L258 190Z" />
          <path d="M426 137L380 282L482 366L258 190" />
          <path d="M210 338L315 448L482 366L380 282L210 338Z" />
          <path d="M98 220L118 417L210 338" />
          <path d="M118 417L315 448" />
          <path d="M323 58L380 282" />
        </g>

        <g className="network-dashes">
          <path d="M188 87L380 282" />
          <path d="M426 137L210 338" />
          <path d="M258 190L315 448" />
        </g>

        <g className="network-faces">
          <path d="M188 87L258 190L380 282L323 58Z" />
          <path d="M98 220L210 338L258 190Z" />
          <path d="M210 338L315 448L380 282Z" />
        </g>

        <g className="network-points">
          {dataNodes.map((node, index) => (
            <g key={`${node.cx}-${node.cy}`}>
              <circle
                className={index === 3 ? "node-halo node-halo-active" : "node-halo"}
                cx={node.cx}
                cy={node.cy}
                r={node.r + 10}
              />
              <circle
                className={index === 3 ? "node node-active" : "node"}
                cx={node.cx}
                cy={node.cy}
                r={node.r}
              />
            </g>
          ))}
        </g>

        <g className="data-label">
          <rect x="281" y="167" width="102" height="35" rx="2" />
          <text x="297" y="188">
            SIGNAL 0.97
          </text>
        </g>

        <g className="axis-marks">
          <path d="M68 468H108M68 468V428" />
          <path d="M492 73H452M492 73V113" />
        </g>
      </svg>

      <div className="network-meta network-meta-top">
        <span>01</span>
        <span>INGEST</span>
      </div>
      <div className="network-meta network-meta-bottom">
        <span>02</span>
        <span>INFERENCE</span>
      </div>
    </div>
  )
}

export { DataNetwork }