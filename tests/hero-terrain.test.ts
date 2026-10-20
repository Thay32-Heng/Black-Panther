// Tests for the hero's 3D geometry.
//
// The hero claims to draw the real rainfall series, so the parts worth pinning
// down are: the grid is built from the data (not a generated shape), the
// projection maths behaves like a camera, and the crest really is the wet
// months rather than a decorative subset.
//
//   npm test

import assert from "node:assert/strict"
import test from "node:test"

import { MONTHLY_RAINFALL } from "../components/panther-dark/rainfall"
import {
  DEFAULT_GRID,
  buildTerrainGrid,
  frameTerrain,
  project,
  rotateX,
  rotateY,
  terrainPolylines,
} from "../components/panther-dark/hero-terrain"

const camera = { focal: 600, distance: 3.5, cx: 400, cy: 300 }

test("rotating a point never changes its distance from the origin", () => {
  const point = { x: 0.7, y: -1.2, z: 0.35 }
  const length = Math.hypot(point.x, point.y, point.z)
  const turned = rotateX(rotateY(point, 1.1), -0.4)
  assert.ok(Math.abs(Math.hypot(turned.x, turned.y, turned.z) - length) < 1e-12)
})

test("a full turn returns the original point", () => {
  const point = { x: 0.4, y: 0.2, z: -0.9 }
  const turned = rotateY(point, Math.PI * 2)
  assert.ok(Math.abs(turned.x - point.x) < 1e-12)
  assert.ok(Math.abs(turned.z - point.z) < 1e-12)
})

test("the camera centre projects to the middle of the screen", () => {
  const projected = project({ x: 0, y: 0, z: 0 }, camera)
  assert.equal(projected.x, camera.cx)
  assert.equal(projected.y, camera.cy)
})

test("nearer points project further from centre than far ones", () => {
  const near = project({ x: 1, y: 0, z: -1 }, camera)
  const far = project({ x: 1, y: 0, z: 1 }, camera)
  assert.ok(near.x - camera.cx > far.x - camera.cx)
  assert.ok(near.near > far.near)
})

test("the grid is built from the 132 real records", () => {
  const grid = buildTerrainGrid(MONTHLY_RAINFALL)
  assert.equal(grid.length, DEFAULT_GRID.cols * DEFAULT_GRID.rows)
  assert.equal(grid.length, MONTHLY_RAINFALL.length)
})

test("the first record sits at one corner and the last at the other", () => {
  const grid = buildTerrainGrid(MONTHLY_RAINFALL)
  const first = grid[0]
  const last = grid[grid.length - 1]
  assert.equal(first.x, -DEFAULT_GRID.width)
  assert.equal(first.z, -DEFAULT_GRID.depth)
  assert.equal(last.x, DEFAULT_GRID.width)
  assert.equal(last.z, DEFAULT_GRID.depth)
})

test("height is the rainfall, with the wettest month on top", () => {
  const flat = { ...DEFAULT_GRID, gamma: 1 }
  const grid = buildTerrainGrid(MONTHLY_RAINFALL, flat)
  const peak = Math.max(...MONTHLY_RAINFALL)
  const peakIndex = MONTHLY_RAINFALL.indexOf(peak)
  const lowestIndex = MONTHLY_RAINFALL.indexOf(Math.min(...MONTHLY_RAINFALL))

  assert.ok(Math.abs(grid[peakIndex].y - flat.height) < 1e-9)
  assert.ok(grid[lowestIndex].y < grid[peakIndex].y)
  assert.ok(grid[lowestIndex].y >= 0)
})

test("a too-short series is rejected instead of drawn short", () => {
  assert.throws(() => buildTerrainGrid(MONTHLY_RAINFALL.slice(0, 100)), /terrain needs/)
})

test("the wireframe draws one ridge per year plus sparse month lines", () => {
  const lines = terrainPolylines(12, 11, 3)
  assert.equal(lines.length, 11 + Math.ceil(12 / 3))

  const rows = lines.slice(0, 11)
  const columns = lines.slice(11)
  for (const line of rows) assert.equal(line.length, 12)
  for (const line of columns) assert.equal(line.length, 11)

  for (const line of lines) {
    for (const index of line) {
      assert.ok(index >= 0 && index < 132, `index ${index} outside the grid`)
    }
  }

  // Every ridge is a contiguous run of months, in order.
  assert.deepEqual(rows[0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  // Month lines step through the years at a fixed stride.
  assert.deepEqual(columns[0].slice(0, 3), [0, 12, 24])

  assert.equal(terrainPolylines(12, 11, 1).length, 11 + 12)
})

test("the crest is the months above the threshold, and contains the record", () => {
  const frame = frameTerrain(MONTHLY_RAINFALL, { yaw: 0.3, pitch: -0.4, camera })
  const peak = Math.max(...MONTHLY_RAINFALL)
  const peakIndex = MONTHLY_RAINFALL.indexOf(peak)
  assert.ok(frame.crest.includes(peakIndex))
  assert.ok(frame.crest.length > 0)
  assert.ok(frame.crest.length < MONTHLY_RAINFALL.length)
  for (const index of frame.crest) {
    assert.ok(MONTHLY_RAINFALL[index] >= peak * 0.66)
  }
  assert.equal(frame.points.length, MONTHLY_RAINFALL.length)
  assert.equal(frame.ratios.length, MONTHLY_RAINFALL.length)
})

test("the same inputs always produce the same frame", () => {
  const a = frameTerrain(MONTHLY_RAINFALL, { yaw: 1.2, pitch: -0.3, camera })
  const b = frameTerrain(MONTHLY_RAINFALL, { yaw: 1.2, pitch: -0.3, camera })
  assert.deepEqual(a.points, b.points)
  assert.deepEqual(a.crest, b.crest)
})

test("a prebuilt grid produces exactly the same frame", () => {
  const options = { yaw: 0.4, pitch: -0.5, camera }
  const inline = frameTerrain(MONTHLY_RAINFALL, options)
  const grid = buildTerrainGrid(MONTHLY_RAINFALL, DEFAULT_GRID)
  const prebuilt = frameTerrain(MONTHLY_RAINFALL, { ...options, grid })

  assert.deepEqual(prebuilt.points, inline.points)
  assert.deepEqual(prebuilt.crest, inline.crest)
  assert.deepEqual(prebuilt.ratios, inline.ratios)
})

test("records beyond the grid never rescale heights or the crest", () => {
  const options = { yaw: 0.2, pitch: -0.4, camera }
  const base = frameTerrain(MONTHLY_RAINFALL, options)

  // A 133rd record far above every real month must be ignored: the surface only
  // holds cols x rows values, so the peak has to come from that same slice.
  const extended = [...MONTHLY_RAINFALL, 5000]
  const withExtra = frameTerrain(extended, options)

  assert.deepEqual(withExtra.points, base.points)
  assert.deepEqual(withExtra.crest, base.crest)
  assert.deepEqual(withExtra.ratios, base.ratios)
})
