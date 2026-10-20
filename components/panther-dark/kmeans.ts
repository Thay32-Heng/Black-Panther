// Pure, dependency-free k-means — the engine behind the Cluster Lab section.
//
// Everything here is deterministic: the point cloud comes from a seeded PRNG
// and the initial centroids come from a seeded k-means++ pick, so every
// visitor sees the same picture and the same convergence path. Nothing is
// invented at render time.
//
// The functions are pure so the tests can drive them without a DOM.

export type Point = readonly [number, number]

export type KMeansState = {
  centroids: Point[]
  labels: number[]
  /** How many points changed cluster on the last assignment pass. */
  moved: number
  /** Sum of squared distances from each point to its centroid. */
  inertia: number
}

/** Small, fast, seedable PRNG. Same seed always yields the same stream. */
export function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Box-Muller: turn two uniforms into one standard-normal sample. */
function gaussian(rng: () => number): number {
  let u = 0
  let v = 0
  while (u === 0) u = rng()
  while (v === 0) v = rng()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value
}

/**
 * Four latent groups. `k` in the UI runs from 3 to 6, so the demo always has
 * a true answer to find at k=4 and something to over-split above it.
 */
const LATENT_CENTERS: readonly Point[] = [
  [0.24, 0.26],
  [0.76, 0.20],
  [0.32, 0.78],
  [0.74, 0.70],
]

const LATENT_SPREAD = 0.072
const PER_CLUSTER = 60

function buildPoints(seed: number): Point[] {
  const rng = mulberry32(seed)
  const points: Point[] = []
  for (const [cx, cy] of LATENT_CENTERS) {
    for (let index = 0; index < PER_CLUSTER; index += 1) {
      points.push([
        clamp01(cx + gaussian(rng) * LATENT_SPREAD),
        clamp01(cy + gaussian(rng) * LATENT_SPREAD),
      ])
    }
  }
  return points
}

/** The benchmark cloud, fixed for every visitor. 240 points, 4 real groups. */
export const POINTS: readonly Point[] = buildPoints(20261020)

export const MIN_K = 3
export const MAX_K = 6
export const DEFAULT_K = 4

function distanceSquared(a: Point, b: Point): number {
  const dx = a[0] - b[0]
  const dy = a[1] - b[1]
  return dx * dx + dy * dy
}

/**
 * k-means++ seeding: pick the first centroid at random, then pick each next
 * one with probability proportional to its squared distance from the nearest
 * centroid already chosen. This is what stops a run from collapsing two
 * centroids onto the same blob.
 */
export function kmeansPlusPlus(
  points: readonly Point[],
  k: number,
  seed = 1,
): Point[] {
  if (points.length === 0 || k <= 0) return []
  const rng = mulberry32(seed)
  const centroids: Point[] = [points[Math.floor(rng() * points.length)]]

  while (centroids.length < k) {
    const weights = points.map((point) =>
      Math.min(...centroids.map((centroid) => distanceSquared(point, centroid))),
    )
    const total = weights.reduce((sum, weight) => sum + weight, 0)

    if (total === 0) {
      // Every point already sits on a centroid; top up with distinct points.
      for (const point of points) {
        if (centroids.length >= k) break
        const taken = centroids.some(
          (centroid) => centroid[0] === point[0] && centroid[1] === point[1],
        )
        if (!taken) centroids.push(point)
      }
      break
    }

    let target = rng() * total
    let picked = points[points.length - 1]
    for (let index = 0; index < points.length; index += 1) {
      target -= weights[index]
      if (target <= 0) {
        picked = points[index]
        break
      }
    }
    centroids.push(picked)
  }

  return centroids
}

/** Assign every point to its nearest centroid. */
export function assignLabels(
  points: readonly Point[],
  centroids: readonly Point[],
): number[] {
  return points.map((point) => {
    let best = 0
    let bestDistance = Infinity
    for (let index = 0; index < centroids.length; index += 1) {
      const distance = distanceSquared(point, centroids[index])
      if (distance < bestDistance) {
        bestDistance = distance
        best = index
      }
    }
    return best
  })
}

/**
 * Move each centroid to the mean of its members. An empty cluster keeps its
 * previous position rather than jumping to the origin — the origin is a real
 * coordinate here, so moving there would quietly bias the next assignment.
 */
export function recentre(
  points: readonly Point[],
  labels: readonly number[],
  previous: readonly Point[],
): Point[] {
  const k = previous.length
  const sums = Array.from({ length: k }, () => [0, 0])
  const counts = new Array<number>(k).fill(0)

  labels.forEach((label, index) => {
    sums[label][0] += points[index][0]
    sums[label][1] += points[index][1]
    counts[label] += 1
  })

  return previous.map((centroid, index) =>
    counts[index] === 0
      ? centroid
      : [sums[index][0] / counts[index], sums[index][1] / counts[index]],
  )
}

/** Within-cluster sum of squares — the number the convergence check watches. */
export function inertia(
  points: readonly Point[],
  labels: readonly number[],
  centroids: readonly Point[],
): number {
  return points.reduce((sum, point, index) => {
    const centroid = centroids[labels[index]]
    return centroid ? sum + distanceSquared(point, centroid) : sum
  }, 0)
}

/** One full Lloyd iteration: assign, then recentre. */
export function step(
  points: readonly Point[],
  centroids: readonly Point[],
  previousLabels: readonly number[] = [],
): KMeansState {
  const labels = assignLabels(points, centroids)
  const moved =
    previousLabels.length === 0
      ? labels.length
      : labels.reduce(
          (count, label, index) =>
            count + (label === previousLabels[index] ? 0 : 1),
          0,
        )
  const next = recentre(points, labels, centroids)
  return {
    centroids: next,
    labels,
    moved,
    inertia: inertia(points, labels, next),
  }
}

/** Run until no point changes cluster, or the iteration cap is hit. */
export function runToConvergence(
  points: readonly Point[],
  k: number,
  seed = 1,
  maxIterations = 60,
): { state: KMeansState; iterations: number } {
  let centroids = kmeansPlusPlus(points, k, seed)
  let labels: number[] = []
  let state = step(points, centroids, labels)
  let iterations = 1

  while (state.moved > 0 && iterations < maxIterations) {
    centroids = state.centroids
    labels = state.labels
    state = step(points, centroids, labels)
    iterations += 1
  }

  return { state, iterations }
}
