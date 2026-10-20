// Tests for the Cluster Lab.
//
// The section claims two things: the point cloud is deterministic, and the
// k-means run actually converges. These tests hold it to both — if the PRNG
// drifts, or if `recentre` quietly collapses a cluster, they fail.
//
//   npm test
//
// Runs on the TypeScript sources via tsx, using node:test.

import assert from "node:assert/strict"
import test from "node:test"

import {
  DEFAULT_K,
  MAX_K,
  MIN_K,
  POINTS,
  assignLabels,
  inertia,
  kmeansPlusPlus,
  mulberry32,
  recentre,
  runToConvergence,
  step,
} from "../components/panther-dark/kmeans"

test("the PRNG is reproducible and stays in [0, 1)", () => {
  const a = mulberry32(42)
  const b = mulberry32(42)
  for (let index = 0; index < 200; index += 1) {
    const value = a()
    assert.equal(value, b(), "same seed must yield the same stream")
    assert.ok(value >= 0 && value < 1, `out of range: ${value}`)
  }
})

test("the point cloud is fixed at 240 points across 4 real groups", () => {
  assert.equal(POINTS.length, 240)
  // Each group contributes 60 points; the four quadrants must all be occupied.
  const quadrants = new Set(
    POINTS.map(([x, y]) => `${x < 0.5 ? "L" : "R"}${y < 0.5 ? "T" : "B"}`),
  )
  assert.deepEqual([...quadrants].sort(), ["LB", "LT", "RB", "RT"])
})

test("every point sits inside the unit square", () => {
  for (const [x, y] of POINTS) {
    assert.ok(x >= 0 && x <= 1, `x out of range: ${x}`)
    assert.ok(y >= 0 && y <= 1, `y out of range: ${y}`)
  }
})

test("k-means++ returns k distinct, in-bounds centroids", () => {
  for (let k = MIN_K; k <= MAX_K; k += 1) {
    const centroids = kmeansPlusPlus(POINTS, k, 7)
    assert.equal(centroids.length, k)
    for (const [x, y] of centroids) {
      assert.ok(x >= 0 && x <= 1, `x out of range: ${x}`)
      assert.ok(y >= 0 && y <= 1, `y out of range: ${y}`)
    }
    // A duplicate centroid cannot happen when the weights are non-zero.
    const keys = new Set(centroids.map(([x, y]) => `${x.toFixed(6)},${y.toFixed(6)}`))
    assert.equal(keys.size, k, `k=${k} produced duplicate centroids`)
  }
})

test("seeding is deterministic for a fixed seed", () => {
  const first = kmeansPlusPlus(POINTS, DEFAULT_K, 11)
  const second = kmeansPlusPlus(POINTS, DEFAULT_K, 11)
  assert.deepEqual(first, second)
})

test("assignment gives every point the nearest centroid", () => {
  const centroids = [
    [0, 0],
    [1, 1],
  ] as const
  const points = [
    [0.1, 0.2],
    [0.9, 0.8],
    [0.4, 0.4],
  ] as const
  assert.deepEqual(assignLabels(points, centroids), [0, 1, 0])
})

test("recentre moves a centroid to the mean of its members", () => {
  const points = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ] as const
  const labels = [0, 0, 1, 1]
  const previous = [
    [9, 9],
    [9, 9],
  ] as const
  const next = recentre(points, labels, previous)
  assert.deepEqual(next[0], [0.5, 0])
  assert.deepEqual(next[1], [0.5, 1])
})

test("an empty cluster keeps its position instead of jumping to the origin", () => {
  const points = [
    [0.8, 0.8],
    [0.9, 0.9],
  ] as const
  const labels = [1, 1]
  const previous = [
    [0.2, 0.2],
    [0.85, 0.85],
  ] as const
  const next = recentre(points, labels, previous)
  assert.deepEqual(next[0], [0.2, 0.2], "empty cluster must not move")
})

test("inertia drops as the algorithm converges", () => {
  const k = DEFAULT_K
  let centroids = kmeansPlusPlus(POINTS, k, 3)
  const first = step(POINTS, centroids).inertia
  let state = step(POINTS, centroids)
  for (let index = 0; index < 10; index += 1) {
    centroids = state.centroids
    state = step(POINTS, centroids, state.labels)
  }
  assert.ok(
    state.inertia <= first,
    `inertia rose from ${first} to ${state.inertia}`,
  )
})

test("the default run converges and settles every point", () => {
  const { state, iterations } = runToConvergence(POINTS, DEFAULT_K, 5)
  assert.ok(iterations > 1, "a single pass is not convergence")
  assert.equal(state.moved, 0, "converged runs leave no point moving")
  assert.equal(state.labels.length, POINTS.length)
  assert.ok(state.inertia >= 0)
})

test("every k from MIN_K to MAX_K converges with all clusters occupied", () => {
  for (let k = MIN_K; k <= MAX_K; k += 1) {
    const { state } = runToConvergence(POINTS, k, 5)
    assert.equal(state.moved, 0, `k=${k} did not converge`)
    const used = new Set(state.labels)
    assert.equal(used.size, k, `k=${k} left an empty cluster`)
  }
})

test("four latent groups are recovered cleanly at k=4", () => {
  const { state } = runToConvergence(POINTS, 4, 5)
  const sizes = new Array(4).fill(0)
  for (const label of state.labels) sizes[label] += 1
  // 60 points per latent group; k-means should land within a few points of it.
  for (const size of sizes) {
    assert.ok(size >= 45 && size <= 75, `unexpected cluster size: ${size}`)
  }
})

test("inertia on the converged solution is the true minimum of the labels", () => {
  const { state } = runToConvergence(POINTS, DEFAULT_K, 5)
  assert.equal(state.inertia, inertia(POINTS, state.labels, state.centroids))
})
