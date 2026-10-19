import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTOUR_CENTRES,
  CONTOUR_VIEWBOX,
  generateContours,
} from "../components/panther-dark/contourPaths";

test("generates one path per ring per centre", () => {
  assert.equal(generateContours().length, CONTOUR_CENTRES.length * 7);
});

test("respects a custom ring count", () => {
  assert.equal(generateContours({ rings: 3 }).length, CONTOUR_CENTRES.length * 3);
});

test("every path is a closed loop of move and line commands", () => {
  for (const d of generateContours()) {
    assert.ok(d.startsWith("M"), "path should open with a move command");
    assert.ok(d.endsWith("Z"), "path should be closed");
    assert.ok(d.includes("L"), "path should contain line commands");
    assert.equal(d.match(/NaN/g), null, "path must not contain NaN");
  }
});

test("is deterministic, so server and client render the same markup", () => {
  assert.deepEqual(generateContours(), generateContours());
});

/** Largest x / y coordinate across a set of generated paths. */
function extent(paths: string[]): { maxX: number; maxY: number } {
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const d of paths) {
    for (const m of d.matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)) {
      maxX = Math.max(maxX, Number(m[1]));
      maxY = Math.max(maxY, Number(m[2]));
    }
  }

  return { maxX, maxY };
}

test("doubling the viewBox doubles the drawing extent", () => {
  // Asserts the ratio rather than an absolute window, so it actually detects a
  // regression in the scaling instead of passing for any plausible output.
  const base = extent(generateContours());
  const wide = extent(
    generateContours({
      viewBox: { w: CONTOUR_VIEWBOX.w * 2, h: CONTOUR_VIEWBOX.h * 2 },
    }),
  );

  assert.ok(base.maxX > 0 && base.maxY > 0, "baseline must have real extent");
  assert.ok(
    Math.abs(wide.maxX / base.maxX - 2) < 0.01,
    `expected maxX to double, got ${base.maxX} -> ${wide.maxX}`,
  );
  assert.ok(
    Math.abs(wide.maxY / base.maxY - 2) < 0.01,
    `expected maxY to double, got ${base.maxY} -> ${wide.maxY}`,
  );
});

test("degenerate options fall back instead of emitting NaN", () => {
  // points: 0 makes the loop divisor zero, so 0/0 = NaN. A NaN viewBox and a
  // non-finite centre scale must be caught the same way.
  const cases = [
    { viewBox: { w: 0, h: 0 } },
    { viewBox: { w: Number.NaN, h: 900 } },
    { viewBox: { w: -100, h: -100 } },
    { points: 0 },
    { points: -4 },
    { points: Number.NaN },
    { rings: 0 },
    { step: 0 },
  ];

  for (const options of cases) {
    const paths = generateContours(options);

    assert.equal(
      paths.length,
      CONTOUR_CENTRES.length * 7,
      `unexpected path count for ${JSON.stringify(options)}`,
    );

    for (const d of paths) {
      assert.equal(
        d.match(/NaN|Infinity/g),
        null,
        `${JSON.stringify(options)} produced invalid coordinates`,
      );
      assert.ok(d.startsWith("M") && d.endsWith("Z"));
      assert.ok(d.length > 4, "a loop must contain more than a bare close");
    }
  }
});

test("a fractional point count is floored to whole samples", () => {
  const paths = generateContours({ points: 3.7 });

  for (const d of paths) {
    assert.equal(d.match(/NaN/g), null);
    // 4 samples => M + 3 L commands + Z.
    assert.equal(d.split("L").length - 1, 3);
  }
});