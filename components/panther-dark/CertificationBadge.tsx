export function CertificationBadge() {
  return (
    <svg className="certification-badge" viewBox="0 0 180 210" aria-hidden="true">
      <path
        className="badge-outer"
        d="M90 8 157 32v68c0 48-27 80-67 101-40-21-67-53-67-101V32L90 8Z"
      />
      <path
        className="badge-inner"
        d="M90 22 144 42v57c0 38-20 65-54 84-34-19-54-46-54-84V42L90 22Z"
      />
      <path className="badge-top-mark" d="M74 35h32" />
      <g className="badge-glyph">
        <path d="m68 105 16 16 28-32" />
      </g>
      <circle className="badge-rivet" cx="90" cy="176" r="3" />
    </svg>
  )
}
