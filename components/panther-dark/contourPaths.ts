/**
 * contours.ts — Phase A
 *
 * Generates topographic contour SVG paths, in the style seen on
 * rinlayheang.me. Pure and deterministic: same input always yields the
 * same paths, so renders are stable between server and client.
 *
 * Each "contour" is a closed loop whose radius is modulated by a couple of
 * sine/cosine harmonics, which is what gives the organic wobble instead of
 * perfect circles.
 */

/** One blob centre: x, y, and a radius scale factor. */
export interface ContourCentre {
  x: number;
  y: number;
  scale: number;
}

/** Tuning knobs, all optional. */
export interface ContourOptions {
  /** Viewport the paths are authored against. */
  viewBox?: { w: number; h: number };
  /** How many concentric loops per centre. */
  rings?: number;
  /** Points sampled around one loop. */
  points?: number;
  /** Base spacing between rings, in px. */
  step?: number;
  /** Centres to draw. */
  centres?: ContourCentre[];
}

/** Viewport the site hero is authored against. */
export const CONTOUR_VIEWBOX = { w: 1440, h: 900 } as const;

/**
 * Default layout: three overlapping blobs spread across the viewport, so the
 * contours overlap in the middle and thin out toward the edges.
 */
export const CONTOUR_CENTRES: ContourCentre[] = [
  { x: 260, y: 250, scale: 1 },
  { x: 1180, y: 190, scale: 0.8 },
  { x: 900, y: 760, scale: 1.15 },
];

/** Format a number to one decimal, trimming a pointless trailing ".0". */
function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

/**
 * Build one closed loop of SVG path commands.
 *
 * The radius wobble is `sin(3θ)` + `cos(5θ)`, phase-shifted per ring and per
 * centre so neighbouring rings never look like copies of each other.
 */
function loop(
  cx: number,
  cy: number,
  radius: number,
  points: number,
  phase: number,
): string {
  let d = "";

  for (let i = 0; i <= points; i += 1) {
    const theta = (i / points) * Math.PI * 2;
    const wobble =
      1 + 0.16 * Math.sin(theta * 3 + phase) + 0.08 * Math.cos(theta * 5 - phase);

    const x = cx + Math.cos(theta) * radius * wobble * 1.25;
    const y = cy + Math.sin(theta) * radius * wobble;

    d += `${i === 0 ? "M" : "L"}${fmt(x)} ${fmt(y)}`;
  }

  return `${d}Z`;
}

/**
 * Generate contour path strings for an SVG `<path>` element list.
 *
 * @returns array of `d` attributes, one per contour loop.
 */
export function generateContours(options: ContourOptions = {}): string[] {
  const {
    viewBox = CONTOUR_VIEWBOX,
    rings = 7,
    points = 64,
    step = 46,
    centres = CONTOUR_CENTRES,
  } = options;

  // Sanitise every numeric input up front. These come from callers, and a
  // non-finite or nonsensical value turns into "MNaN NaNZ" in the DOM, which
  // fails silently rather than loudly — the SVG just renders nothing.
  const positive = (value: number, fallback: number): number =>
    Number.isFinite(value) && value > 0 ? value : fallback;

  const safeW = positive(viewBox?.w, CONTOUR_VIEWBOX.w);
  const safeH = positive(viewBox?.h, CONTOUR_VIEWBOX.h);
  // `points` drives the loop divisor, so a value of 0 yields 0/0 = NaN. Floor
  // it and insist on at least 3 so a loop is actually closed.
  const safePoints = Math.max(3, Math.floor(positive(points, 64)));
  const safeStep = positive(step, 46);
  const safeRings = Math.max(1, Math.floor(positive(rings, 7)));

  // Rings are sized for the default viewport, so scale them with it. Without
  // this, a caller passing a wider viewBox would get contours bunched in the
  // middle with empty margins, and a narrower one would get rings hanging
  // outside the view.
  const safeFactor = positive(
    Math.min(safeW / CONTOUR_VIEWBOX.w, safeH / CONTOUR_VIEWBOX.h),
    1,
  );
  const scaledStep = safeStep * safeFactor;

  const paths: string[] = [];

  centres.forEach((centre, centreIndex) => {
    // Normalise against the reference viewport so centres keep their relative
    // position whatever viewBox the caller passes.
    const cx = (positive(centre?.x, 0) / CONTOUR_VIEWBOX.w) * safeW;
    const cy = (positive(centre?.y, 0) / CONTOUR_VIEWBOX.h) * safeH;

    for (let ring = 1; ring <= safeRings; ring += 1) {
      const radius = ring * scaledStep * positive(centre?.scale, 1);
      paths.push(loop(cx, cy, radius, safePoints, centreIndex * 2 + ring * 0.35));
    }
  });

  return paths;
}