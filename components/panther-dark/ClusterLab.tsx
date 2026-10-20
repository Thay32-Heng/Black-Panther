"use client"

// Cluster Lab — a live k-means run you can step through.
//
// The scatter plot is hand-built SVG, same as the rainfall chart: no chart
// library, no canvas, no dependency. Every number on the panel (iteration
// count, inertia, points moved) is read out of the real run in kmeans.ts.

import { useState } from "react"

import {
  DEFAULT_K,
  MAX_K,
  MIN_K,
  POINTS,
  assignLabels,
  kmeansPlusPlus,
  runToConvergence,
  step,
  type Point,
} from "./kmeans"

const SEED = 5
const SIZE = 620
const PAD = 26
const PLOT = SIZE - PAD * 2
const CLUSTER_KEYS = ["c0", "c1", "c2", "c3", "c4", "c5"] as const

type Run = {
  centroids: Point[]
  /** Labels from the pass that produced `centroids`, used to detect convergence. */
  labels: number[]
  iterations: number
  moved: number
  inertia: number
}

function firstRun(k: number): Run {
  const seeded = kmeansPlusPlus(POINTS, k, SEED)
  const next = step(POINTS, seeded, [])
  return {
    centroids: next.centroids,
    labels: next.labels,
    iterations: 1,
    moved: next.moved,
    inertia: next.inertia,
  }
}

function advance(run: Run): Run {
  const next = step(POINTS, run.centroids, run.labels)
  return {
    centroids: next.centroids,
    labels: next.labels,
    iterations: run.iterations + 1,
    moved: next.moved,
    inertia: next.inertia,
  }
}

function plotX(value: number): number {
  return PAD + value * PLOT
}

function plotY(value: number): number {
  return PAD + (1 - value) * PLOT
}

function formatInertia(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })
}

export default function ClusterLab() {
  const [k, setK] = useState(DEFAULT_K)
  const [run, setRun] = useState<Run>(() => firstRun(DEFAULT_K))

  // Colour from the centroids that are actually drawn, so a point never shows
  // one colour while sitting inside another cluster's shape.
  const labels = assignLabels(POINTS, run.centroids)
  const converged = run.moved === 0

  function chooseK(next: number) {
    setK(next)
    setRun(firstRun(next))
  }

  function runToEnd() {
    const { state, iterations } = runToConvergence(POINTS, k, SEED)
    setRun({
      centroids: state.centroids,
      labels: state.labels,
      iterations,
      moved: state.moved,
      inertia: state.inertia,
    })
  }

  const status = converged
    ? "Converged — no point changed cluster on the last pass."
    : `Iteration ${run.iterations}. ${run.moved} of ${POINTS.length} points changed cluster on the last pass.`

  return (
    <div className="rin-lab">
      <div className="rin-lab-bar">
        <div className="rin-lab-id">
          <span className="rin-lab-pulse" aria-hidden="true" />
          <span>LIVE ALGORITHM · K-MEANS</span>
        </div>
        <span className="rin-lab-source">240 points · seeded · deterministic</span>
      </div>

      <div className="rin-lab-body">
        <div className="rin-lab-plot">
          <svg
            className="rin-lab-svg"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            role="img"
            aria-label={`Scatter plot of 240 points in a square, coloured into ${k} k-means clusters. ${status}`}
          >
            <g className="rin-lab-grid" aria-hidden="true">
              {[0, 0.25, 0.5, 0.75, 1].map((fraction) => (
                <line
                  key={`h-${fraction}`}
                  x1={PAD}
                  x2={SIZE - PAD}
                  y1={PAD + fraction * PLOT}
                  y2={PAD + fraction * PLOT}
                />
              ))}
              {[0, 0.25, 0.5, 0.75, 1].map((fraction) => (
                <line
                  key={`v-${fraction}`}
                  x1={PAD + fraction * PLOT}
                  x2={PAD + fraction * PLOT}
                  y1={PAD}
                  y2={SIZE - PAD}
                />
              ))}
            </g>

            <g className="rin-lab-points">
              {POINTS.map(([x, y], index) => (
                <circle
                  key={index}
                  className={`rin-lab-point rin-lab-${CLUSTER_KEYS[labels[index] % CLUSTER_KEYS.length]}`}
                  cx={plotX(x)}
                  cy={plotY(y)}
                  r={3.4}
                />
              ))}
            </g>

            <g className="rin-lab-centroids">
              {run.centroids.map(([x, y], index) => (
                <g key={index} className="rin-lab-centroid">
                  <circle
                    className={`rin-lab-halo rin-lab-${CLUSTER_KEYS[index % CLUSTER_KEYS.length]}`}
                    cx={plotX(x)}
                    cy={plotY(y)}
                    r={14}
                  />
                  <circle
                    className={`rin-lab-core rin-lab-${CLUSTER_KEYS[index % CLUSTER_KEYS.length]}`}
                    cx={plotX(x)}
                    cy={plotY(y)}
                    r={4.5}
                  />
                  <text
                    className="rin-lab-index"
                    x={plotX(x)}
                    y={plotY(y) - 20}
                    textAnchor="middle"
                  >
                    {index + 1}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>

        <aside className="rin-lab-panel">
          <div className="rin-lab-control">
            <span className="rin-lab-label" id="rin-lab-k-label">
              Clusters (k)
            </span>
            <div
              className="rin-lab-k-row"
              role="group"
              aria-labelledby="rin-lab-k-label"
            >
              {Array.from({ length: MAX_K - MIN_K + 1 }, (_, index) => MIN_K + index).map(
                (option) => (
                  <button
                    key={option}
                    type="button"
                    className={
                      option === k ? "rin-lab-k rin-lab-k-active" : "rin-lab-k"
                    }
                    aria-pressed={option === k}
                    onClick={() => chooseK(option)}
                  >
                    {option}
                  </button>
                ),
              )}
            </div>
          </div>

          <dl className="rin-lab-stats">
            <div>
              <dt>Iteration</dt>
              <dd>{String(run.iterations).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Inertia</dt>
              <dd>{formatInertia(run.inertia)}</dd>
            </div>
            <div>
              <dt>Moved</dt>
              <dd>{run.moved}</dd>
            </div>
            <div>
              <dt>State</dt>
              <dd>{converged ? "Settled" : "Running"}</dd>
            </div>
          </dl>

          <div className="rin-lab-actions">
            <button
              type="button"
              className="rin-cut-btn"
              onClick={() => setRun(advance(run))}
              disabled={converged}
            >
              Step
            </button>
            <button
              type="button"
              className="rin-cut-btn rin-cut-btn-solid"
              onClick={runToEnd}
              disabled={converged}
            >
              Run
            </button>
            <button
              type="button"
              className="rin-cut-btn"
              onClick={() => setRun(firstRun(k))}
            >
              Reset
            </button>
          </div>

          <p className="rin-lab-status" aria-live="polite">
            {status}
          </p>

          <p className="rin-lab-note">
            Points are generated once from a seeded PRNG, then clustered by
            Lloyd&apos;s algorithm with k-means++ seeding. Inertia is the
            within-cluster sum of squares — it only ever falls, which is why the
            run has to stop.
          </p>
        </aside>
      </div>
    </div>
  )
}
