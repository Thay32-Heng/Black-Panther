// Row building and sorting for the project table.
//
// Kept free of React so the sort can be tested directly. Every number in a row
// is derived from the project data — stack depth is the real number of
// technologies listed, and the metric count is the real number documented.
// Nothing here invents a figure.

export type ProjectLike = {
  slug: string
  title: string
  status: string
  type: string
  stack: string
  metrics?: readonly { label: string; value: string }[]
}

export type Row = {
  slug: string
  title: string
  status: string
  type: string
  stack: string[]
  /** Number of technologies in the stack string. */
  stackDepth: number
  /** Number of documented metrics for the project. */
  metricCount: number
}

export type SortKey = "title" | "status" | "type" | "stackDepth" | "metricCount"
export type SortDirection = "asc" | "desc"

export const SORT_KEYS: readonly SortKey[] = [
  "title",
  "status",
  "type",
  "stackDepth",
  "metricCount",
]

export function buildRows(projects: readonly ProjectLike[]): Row[] {
  return projects.map((project) => {
    const stack = project.stack
      .split(" / ")
      .map((part) => part.trim())
      .filter((part) => part.length > 0)

    return {
      slug: project.slug,
      title: project.title,
      status: project.status,
      type: project.type,
      stack,
      stackDepth: stack.length,
      metricCount: project.metrics?.length ?? 0,
    }
  })
}

function compare(a: Row, b: Row, key: SortKey): number {
  if (key === "stackDepth" || key === "metricCount") {
    return a[key] - b[key]
  }
  return a[key].localeCompare(b[key], "en")
}

/**
 * Stable sort. Ties fall back to the title so two rows with the same status
 * never swap places between renders, which would look like a glitch.
 */
export function sortRows(
  rows: readonly Row[],
  key: SortKey,
  direction: SortDirection,
): Row[] {
  const factor = direction === "asc" ? 1 : -1
  return [...rows].sort((a, b) => {
    const primary = compare(a, b, key) * factor
    if (primary !== 0) return primary
    return a.title.localeCompare(b.title, "en")
  })
}

/** The key a header click should move to, starting from the current state. */
export function nextSort(
  current: { key: SortKey; direction: SortDirection },
  clicked: SortKey,
): { key: SortKey; direction: SortDirection } {
  if (current.key !== clicked) {
    return { key: clicked, direction: "asc" }
  }
  return {
    key: clicked,
    direction: current.direction === "asc" ? "desc" : "asc",
  }
}
