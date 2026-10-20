// Tests for the sortable project table.
//
// The section claims two things: the counts are derived from the project data,
// and the sort is stable. Both are testable without a DOM.
//
//   npm test

import assert from "node:assert/strict"
import test from "node:test"

import { featuredProjects } from "../components/panther-dark/data"
import {
  buildRows,
  nextSort,
  sortRows,
  type ProjectLike,
} from "../components/panther-dark/project-table"

const sample: ProjectLike[] = [
  {
    slug: "a",
    title: "Alpha",
    status: "ANALYSED",
    type: "forecast",
    stack: "PYTHON / PANDAS",
    metrics: [
      { label: "Rows", value: "1" },
      { label: "Cols", value: "2" },
    ],
  },
  {
    slug: "b",
    title: "Beta",
    status: "ACTIVE BUILD",
    type: "vault",
    stack: "TYPESCRIPT / REACT / VITE / PWA",
    metrics: [{ label: "Rows", value: "3" }],
  },
  {
    slug: "c",
    title: "Gamma",
    status: "ANALYSED",
    type: "anomaly",
    stack: "PYTHON",
    metrics: [],
  },
]

test("stack depth counts the technologies actually listed", () => {
  const rows = buildRows(sample)
  assert.equal(rows[0].stackDepth, 2)
  assert.equal(rows[1].stackDepth, 4)
  assert.equal(rows[2].stackDepth, 1)
  assert.deepEqual(rows[1].stack, ["TYPESCRIPT", "REACT", "VITE", "PWA"])
})

test("metric count matches the documented metrics", () => {
  const rows = buildRows(sample)
  assert.equal(rows[0].metricCount, 2)
  assert.equal(rows[1].metricCount, 1)
  assert.equal(rows[2].metricCount, 0)
})

test("a stack string with no separator still yields one technology", () => {
  const rows = buildRows([{ ...sample[2], stack: "PYTHON" }])
  assert.equal(rows[0].stackDepth, 1)
})

test("sorting by a number column works in both directions", () => {
  const rows = buildRows(sample)
  const asc = sortRows(rows, "stackDepth", "asc").map((row) => row.slug)
  const desc = sortRows(rows, "stackDepth", "desc").map((row) => row.slug)
  assert.deepEqual(asc, ["c", "a", "b"])
  assert.deepEqual(desc, ["b", "a", "c"])
})

test("sorting by a text column works in both directions", () => {
  const rows = buildRows(sample)
  const asc = sortRows(rows, "title", "asc").map((row) => row.title)
  const desc = sortRows(rows, "title", "desc").map((row) => row.title)
  assert.deepEqual(asc, ["Alpha", "Beta", "Gamma"])
  assert.deepEqual(desc, ["Gamma", "Beta", "Alpha"])
})

test("ties fall back to title, so equal rows never swap between renders", () => {
  const rows = buildRows(sample)
  // Alpha and Gamma share the status ANALYSED.
  const asc = sortRows(rows, "status", "asc").map((row) => row.title)
  const again = sortRows([...rows].reverse(), "status", "asc").map((row) => row.title)
  assert.deepEqual(asc, again)
})

test("sorting does not mutate the input", () => {
  const rows = buildRows(sample)
  const before = rows.map((row) => row.slug)
  sortRows(rows, "stackDepth", "desc")
  assert.deepEqual(rows.map((row) => row.slug), before)
})

test("clicking a new column starts ascending, clicking it again reverses", () => {
  const start = { key: "title" as const, direction: "asc" as const }
  const changed = nextSort(start, "stackDepth")
  assert.deepEqual(changed, { key: "stackDepth", direction: "asc" })
  const reversed = nextSort(changed, "stackDepth")
  assert.deepEqual(reversed, { key: "stackDepth", direction: "desc" })
  const back = nextSort(reversed, "stackDepth")
  assert.deepEqual(back, { key: "stackDepth", direction: "asc" })
})

test("the real project data yields eight clean rows", () => {
  const rows = buildRows(featuredProjects)
  assert.equal(rows.length, 8)
  for (const row of rows) {
    assert.ok(row.slug.length > 0, `empty slug for ${row.title}`)
    assert.ok(row.stackDepth > 0, `no stack for ${row.title}`)
    assert.ok(row.metricCount > 0, `no metrics for ${row.title}`)
  }
  // Slugs must be unique or two rows would share a React key and a URL.
  assert.equal(new Set(rows.map((row) => row.slug)).size, 8)
})
