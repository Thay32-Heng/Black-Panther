import type { pipelineStages } from "./data"

export function PipelineIcon({ type }: { type: (typeof pipelineStages)[number]["type"] }) {
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
