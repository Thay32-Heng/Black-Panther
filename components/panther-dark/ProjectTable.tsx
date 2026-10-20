"use client"

// The eight projects as a sortable table.
//
// Same data the cards use, arranged so it can be compared instead of read.
// The sort is a plain click on a column header; every header is a real button
// so it is reachable by keyboard, and the current sort is announced through
// aria-sort on the header cell.

import { useMemo, useState } from "react"
import Link from "next/link"

import { featuredProjects } from "./data"
import {
  buildRows,
  nextSort,
  sortRows,
  type Row,
  type SortDirection,
  type SortKey,
} from "./project-table"

const COLUMNS: { key: SortKey; label: string; numeric: boolean }[] = [
  { key: "title", label: "Project", numeric: false },
  { key: "status", label: "Status", numeric: false },
  { key: "type", label: "Domain", numeric: false },
  { key: "stackDepth", label: "Stack", numeric: true },
  { key: "metricCount", label: "Metrics", numeric: true },
]

function ariaSort(
  active: boolean,
  direction: SortDirection,
): "ascending" | "descending" | "none" {
  if (!active) return "none"
  return direction === "asc" ? "ascending" : "descending"
}

export default function ProjectTable() {
  const rows = useMemo(() => buildRows(featuredProjects), [])
  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection }>({
    key: "title",
    direction: "asc",
  })

  const sorted = useMemo(
    () => sortRows(rows, sort.key, sort.direction),
    [rows, sort],
  )

  return (
    <div className="rin-table-wrap">
      {/* Kept outside the scroll container: a <caption> is part of the table,
          so on a phone it inherited the table's 720px width and its last words
          were cut off past the right edge. */}
      <p className="rin-table-note">
        Eight projects, sortable by any column. Stack is the number of
        technologies listed; Metrics is the number of figures documented in the
        case study.
      </p>
      <div
        className="rin-table-scroll"
        role="region"
        aria-label="Projects table, scrolls horizontally on narrow screens"
        tabIndex={0}
      >
        <table className="rin-table">
          <caption className="rin-table-visually-hidden">
            Eight projects, sortable by any column.
          </caption>
          <thead>
            <tr>
              {COLUMNS.map((column) => {
                const active = sort.key === column.key
                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={ariaSort(active, sort.direction)}
                    className={column.numeric ? "rin-table-num" : undefined}
                  >
                    <button
                      type="button"
                      className={active ? "rin-table-sort rin-table-sort-on" : "rin-table-sort"}
                      onClick={() => setSort((current) => nextSort(current, column.key))}
                    >
                      {column.label}
                      <span className="rin-table-arrow" aria-hidden="true">
                        {active ? (sort.direction === "asc" ? "↑" : "↓") : "↕"}
                      </span>
                    </button>
                  </th>
                )
              })}
              <th scope="col" className="rin-table-action">
                <span className="rin-table-visually-hidden">Case study</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row: Row) => (
              <tr key={row.slug}>
                <th scope="row" className="rin-table-name">
                  {row.title}
                </th>
                <td>
                  <span className="rin-table-status">{row.status}</span>
                </td>
                <td className="rin-table-domain">{row.type}</td>
                <td
                  className="rin-table-num"
                  title={row.stack.join(", ")}
                >
                  {row.stackDepth}
                </td>
                <td className="rin-table-num">{row.metricCount}</td>
                <td className="rin-table-action">
                  <Link href={`/project/${row.slug}`} className="rin-table-link">
                    Open
                    <span aria-hidden="true"> →</span>
                    <span className="rin-table-visually-hidden">
                      {` ${row.title} case study`}
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
