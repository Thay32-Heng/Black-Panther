// 3D geometry for the hero terrain.
//
// The hero shows the 132 monthly rainfall records as a slowly rotating
// wireframe surface — 11 years deep, 12 months wide, height = millimetres.
// It is the same array the Sandbox chart draws, so the hero cannot show a
// shape the data does not have.
//
// Everything here is pure: no canvas, no DOM, no React. The renderer in
// HeroTerrain.tsx is a thin loop over these functions, which means the maths
// can be tested without a browser.

export type Vec3 = { x: number; y: number; z: number }

export type GridSpec = {
  cols: number
  rows: number
  /** Half-width of the surface in world units. */
  width: number
  /** Half-depth of the surface in world units. */
  depth: number
  /** Height of a value at the maximum. */
  height: number
  /**
   * 1 = linear. Below 1 lifts the low months so a mostly-dry year still has a
   * readable shape instead of collapsing to a flat sheet.
   */
  gamma: number
}

export const DEFAULT_GRID: GridSpec = {
  cols: 12,
  rows: 11,
  width: 1.55,
  depth: 0.72,
  height: 0.8,
  gamma: 0.62,
}

export function rotateX(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return { x: v.x, y: v.y * cos - v.z * sin, z: v.y * sin + v.z * cos }
}

export function rotateY(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return { x: v.x * cos + v.z * sin, y: v.y, z: -v.x * sin + v.z * cos }
}

export type Projection = {
  /** Focal length in pixels. */
  focal: number
  /** Camera distance from the origin, in world units. */
  distance: number
  /** Screen-space centre. */
  cx: number
  cy: number
}

/**
 * Perspective projection. Points nearer the camera come back larger and with a
 * higher `near` (1 = closest, 0 = furthest), which the renderer uses to fade
 * the far side of the grid instead of drawing it flat and confusing.
 */
export function project(
  v: Vec3,
  camera: Projection,
): { x: number; y: number; near: number } {
  const zc = Math.max(0.0001, camera.distance + v.z)
  const scale = camera.focal / zc
  return {
    x: camera.cx + v.x * scale,
    y: camera.cy - v.y * scale,
    near: 1 - Math.min(1, Math.max(0, (zc - camera.distance * 0.55) / (camera.distance * 1.9))),
  }
}

/**
 * Turn a flat series into a grid of world-space points.
 *
 * Row-major, oldest first: index 0 is the first month of the first year. The
 * series is split exactly the way the dataset is stored (12 per year), never by
 * guessing at a stride.
 */
export function buildTerrainGrid(
  values: readonly number[],
  spec: GridSpec = DEFAULT_GRID,
): Vec3[] {
  const { cols, rows, width, depth, height, gamma } = spec
  const expected = cols * rows
  if (values.length < expected) {
    throw new Error(
      `terrain needs ${expected} values (${cols} x ${rows}), got ${values.length}`,
    )
  }

  let max = 0
  for (let i = 0; i < expected; i += 1) {
    if (values[i] > max) max = values[i]
  }
  const peak = max > 0 ? max : 1

  const points: Vec3[] = []
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const value = values[row * cols + col]
      const ratio = Math.max(0, Math.min(1, value / peak))
      const lifted = Math.pow(ratio, gamma)
      const x = (col / (cols - 1)) * 2 - 1
      const z = (row / (rows - 1)) * 2 - 1
      points.push({
        x: x * width,
        y: lifted * height,
        z: z * depth,
      })
    }
  }
  return points
}

export type TerrainFrame = {
  points: { x: number; y: number; near: number }[]
  /** Indices of points at or above `peakThreshold`, for the glowing crest. */
  crest: number[]
  /** Height ratio per point, 0..1, useful for colouring. */
  ratios: number[]
}

/** Build, rotate and project one frame. The renderer calls this per rAF tick. */
export function frameTerrain(
  values: readonly number[],
  options: {
    yaw: number
    pitch: number
    camera: Projection
    spec?: GridSpec
    peakThreshold?: number
    /**
     * A grid the caller already built. The hero builds it once at module scope;
     * rebuilding 132 points inside the animation loop would be pure garbage.
     */
    grid?: readonly Vec3[]
  },
): TerrainFrame {
  const spec = options.spec ?? DEFAULT_GRID
  const expected = spec.cols * spec.rows
  const grid = options.grid ?? buildTerrainGrid(values, spec)

  // Peak over exactly the slice the grid was built from. Taking the max of the
  // whole array instead would silently rescale the crest and the ratios if a
  // 133rd record were ever appended.
  const counted = Math.min(values.length, expected)
  let peak = 0
  for (let i = 0; i < counted; i += 1) {
    if (values[i] > peak) peak = values[i]
  }
  const threshold = (options.peakThreshold ?? 0.66) * peak

  const points: TerrainFrame["points"] = []
  const ratios: number[] = []
  const crest: number[] = []

  for (let i = 0; i < grid.length; i += 1) {
    const rotated = rotateX(rotateY(grid[i], options.yaw), options.pitch)
    points.push(project(rotated, options.camera))
    ratios.push(peak > 0 ? values[i] / peak : 0)
    if (values[i] >= threshold) crest.push(i)
  }

  return { points, crest, ratios }
}

/**
 * The polylines the renderer actually strokes.
 *
 * A dense quad mesh at this scale reads as noise, especially behind the emblem.
 * Drawing one line per year (11 ridges receding into depth) plus a sparse set
 * of month lines keeps the shape legible: the eye follows ridges, not cells.
 */
export function terrainPolylines(
  cols: number,
  rows: number,
  columnStride = 3,
): number[][] {
  const lines: number[][] = []

  for (let row = 0; row < rows; row += 1) {
    const line: number[] = []
    for (let col = 0; col < cols; col += 1) line.push(row * cols + col)
    lines.push(line)
  }

  const stride = Math.max(1, Math.floor(columnStride))
  for (let col = 0; col < cols; col += stride) {
    const line: number[] = []
    for (let row = 0; row < rows; row += 1) line.push(row * cols + col)
    lines.push(line)
  }

  return lines
}
