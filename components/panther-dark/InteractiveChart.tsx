"use client"

import { useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import {
  rainfallLabels,
  rainfallStats,
  rainfallViews,
  type RainfallView,
} from "./rainfall"

/** The three tabs are the three plots from the actual lab write-up. */
const VIEW_ORDER: readonly RainfallView[] = ["monthly", "seasonal", "yearly"]
const VIEW_TITLES: Record<RainfallView, string> = {
  monthly: "Monthly rainfall, 2015-2025",
  seasonal: "Mean rainfall by calendar month",
  yearly: "Total rainfall by year",
}

const CHART_WIDTH = 820
const CHART_HEIGHT = 280
const H_PADDING = 18
const V_PADDING = 22
const PLOT_WIDTH = CHART_WIDTH - H_PADDING * 2
const PLOT_HEIGHT = CHART_HEIGHT - V_PADDING * 2

/**
 * Round the axis maximum up to a readable step (1/2/2.5/5 x a power of ten).
 * A hardcoded ceiling would either clip the data or leave 80% of the chart
 * empty — both are ways of lying to the reader.
 */
function niceCeiling(value: number): number {
  if (value <= 0) return 1
  const magnitude = 10 ** Math.floor(Math.log10(value))
  for (const step of [1, 2, 2.5, 5, 10]) {
    const candidate = step * magnitude
    if (candidate >= value) return candidate
  }
  return 10 * magnitude
}

function formatMm(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: value < 10 ? 2 : 0,
    maximumFractionDigits: 2,
  })
}

/** Axis ticks are round numbers, so they never carry decimals. */
function formatTick(value: number): string {
  return Math.round(value).toLocaleString("en-US")
}

export default function InteractiveChart() {
  const [view, setView] = useState<RainfallView>("monthly")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  // Roving tabindex: the monthly view has 132 points, so making every one a tab
  // stop would bury the rest of the page under 132 Tab presses. One stop, and
  // the arrow keys walk the series.
  const [cursor, setCursor] = useState(0)
  const pointRefs = useRef<(SVGGElement | null)[]>([])

  const values = rainfallViews[view]
  const labels = rainfallLabels[view]
  const maxValue = niceCeiling(Math.max(...values))

  const points = values.map((value, index) => ({
    x: H_PADDING + (index * PLOT_WIDTH) / (values.length - 1),
    y: CHART_HEIGHT - V_PADDING - (value / maxValue) * PLOT_HEIGHT,
    value,
    label: labels[index],
  }))

  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ")
  const areaPoints = `${H_PADDING},${CHART_HEIGHT - V_PADDING} ${linePoints} ${
    CHART_WIDTH - H_PADDING
  },${CHART_HEIGHT - V_PADDING}`

  // Five gridlines, evenly spaced, at round fractions of the axis maximum.
  const ticks = [0, 1, 2, 3, 4].map(
    (step) => V_PADDING + (step * PLOT_HEIGHT) / 4,
  )
  const tickLabels = [4, 3, 2, 1, 0].map((step) => formatTick((step * maxValue) / 4))

  // With 132 points the old fixed r=22 hit areas would sit on top of each other
  // and steal each other's hover. Scale the target to the actual spacing.
  //
  // Set through `style`, not the `r` attribute: the stylesheet declares
  // `.point-hit { r: 30 }` inside a max-width:800px media query, and a CSS
  // declaration beats a presentation attribute. Inline style is what actually
  // wins there, so without this the mobile chart reports the wrong month.
  const hitRadius = Math.max(5, Math.min(22, (PLOT_WIDTH / values.length) * 0.75))

  const active = activeIndex === null ? null : points[activeIndex]
  const tooltipX = active
    ? Math.min(Math.max(active.x - 44, 4), CHART_WIDTH - 92)
    : 0

  /** Arrow keys walk the series; Home/End jump to the ends. */
  function handlePointKey(event: KeyboardEvent<SVGGElement>, index: number) {
    const last = points.length - 1
    let next: number
    switch (event.key) {
      case "ArrowRight":
        next = Math.min(index + 1, last)
        break
      case "ArrowLeft":
        next = Math.max(index - 1, 0)
        break
      case "Home":
        next = 0
        break
      case "End":
        next = last
        break
      case "Escape":
        event.currentTarget.blur()
        return
      default:
        return
    }
    event.preventDefault()
    setCursor(next)
    setActiveIndex(next)
    pointRefs.current[next]?.focus()
  }

  return (
    <div className="dashboard">
      <div className="dashboard-toolbar">
        <div className="dashboard-id">
          <span className="live-indicator" />
          <div>
            <span>REAL DATA · NOT A MOCKUP</span>
            <strong>Phnom Penh rainfall, 132 months</strong>
          </div>
        </div>

        <div className="period-tabs" aria-label="Chart view">
          {VIEW_ORDER.map((option) => (
            <button
              className={option === view ? "period-tab period-tab-active" : "period-tab"}
              type="button"
              aria-pressed={option === view}
              onClick={() => {
                setView(option)
                setActiveIndex(null)
                setCursor(0)
              }}
              key={option}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-metrics">
        <div className="primary-metric">
          <span>{METRIC_HEADINGS[view].primary.label}</span>
          <strong>{METRIC_HEADINGS[view].primary.value}</strong>
          <small>{METRIC_HEADINGS[view].primary.note}</small>
        </div>
        <div className="secondary-metrics">
          <div>
            <span>{METRIC_HEADINGS[view].secondary[0].label}</span>
            <strong>{METRIC_HEADINGS[view].secondary[0].value}</strong>
          </div>
          <div>
            <span>{METRIC_HEADINGS[view].secondary[1].label}</span>
            <strong>{METRIC_HEADINGS[view].secondary[1].value}</strong>
          </div>
        </div>
      </div>

      <div className="chart-wrap">
        <div className="chart-y-labels" aria-hidden="true">
          {tickLabels.map((label, index) => (
            <span key={label + index}>{label}</span>
          ))}
        </div>

        <div className="chart-scroll">
          <div className="chart-track">
            <svg
              className="data-chart"
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
              role="img"
              aria-label={`${VIEW_TITLES[view]}. ${points.length} values between 0 and ${maxValue} millimetres.`}
            >
              <defs>
                <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                </linearGradient>
                <filter id="lineGlow" x="-20%" y="-30%" width="140%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g className="chart-grid">
                {ticks.map((y) => (
                  <line x1={H_PADDING} x2={CHART_WIDTH - H_PADDING} y1={y} y2={y} key={y} />
                ))}
                {[0, 1, 2, 3, 4].map((step) => {
                  const x = H_PADDING + (step * PLOT_WIDTH) / 4
                  return <line x1={x} x2={x} y1={V_PADDING} y2={CHART_HEIGHT - V_PADDING} key={step} />
                })}
              </g>

              <polygon className="chart-area" points={areaPoints} />
              <polyline className="chart-line" points={linePoints} />

              <g className="chart-points">
                {points.map((point, index) => (
                  <g
                    className="chart-point"
                    role="img"
                    ref={(node) => {
                      pointRefs.current[index] = node
                    }}
                    tabIndex={cursor === index ? 0 : -1}
                    aria-label={`${point.label}: ${formatMm(point.value)} millimetres`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onFocus={() => {
                      setCursor(index)
                      setActiveIndex(index)
                    }}
                    onBlur={() => setActiveIndex(null)}
                    onKeyDown={(event) => handlePointKey(event, index)}
                    key={`${view}-${index}`}
                  >
                    <circle
                      className="point-hit"
                      cx={point.x}
                      cy={point.y}
                      style={{ r: hitRadius }}
                    />
                    <circle
                      className={activeIndex === index ? "point-dot point-dot-active" : "point-dot"}
                      cx={point.x}
                      cy={point.y}
                      r={activeIndex === index ? 5 : 3}
                    />
                  </g>
                ))}
              </g>

              {active && (
                <g className="chart-tooltip" transform={`translate(${tooltipX} ${Math.max(active.y - 58, 4)})`}>
                  <rect width="88" height="42" rx="2" />
                  <text x="10" y="15">
                    {active.label}
                  </text>
                  <text className="tooltip-value" x="10" y="32">
                    {formatMm(active.value)} mm
                  </text>
                </g>
              )}
            </svg>

            <div className="chart-x-labels" aria-hidden="true">
              {xAxisLabels(view, labels).map((label, index) => (
                <span key={label + index}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <span>SOURCE: GITHUB.COM/THAY32-HENG · PRECIPITATION ANALYSIS</span>
        <span>
          {points.length} VALUES · AXIS TO {formatTick(maxValue)} MM
        </span>
      </div>

      <p className="sr-only">
        {VIEW_TITLES[view]}. The series starts at {formatMm(values[0])} millimetres and
        ends at {formatMm(values[values.length - 1])} millimetres, with a peak of{" "}
        {formatMm(Math.max(...values))} millimetres. Focus the chart and use the left
        and right arrow keys to read each value.
      </p>
    </div>
  )
}

/** Five evenly spaced, real labels — no "START / 25% / NOW". */
function xAxisLabels(view: RainfallView, labels: readonly string[]): string[] {
  const picks = [0, 0.25, 0.5, 0.75, 1].map((fraction) =>
    Math.round(fraction * (labels.length - 1)),
  )
  return Array.from(new Set(picks)).map((index) => {
    const label = labels[index]
    // The seasonal axis is the only one keyed by calendar month.
    return view === "seasonal" ? titleCase(label) : label
  })
}

function titleCase(month: string): string {
  return month.charAt(0) + month.slice(1).toLowerCase()
}

/**
 * The headline numbers for each view. Every one is read from `rainfallStats`,
 * which is computed from the 132-value array — none of these are typed by hand.
 */
const METRIC_HEADINGS: Record<
  RainfallView,
  {
    primary: { label: string; value: string; note: string }
    secondary: readonly [{ label: string; value: string }, { label: string; value: string }]
  }
> = {
  monthly: {
    primary: {
      label: "TOTAL RAINFALL",
      value: `${formatMm(rainfallStats.totalMm)} mm`,
      note: `${rainfallStats.observations} months, 2015-2025`,
    },
    secondary: [
      {
        label: "WETTEST MONTH",
        value: `${formatMm(rainfallStats.wettestMonth.value)} mm`,
      },
      {
        label: "DRIEST MONTH",
        value: `${formatMm(rainfallStats.driestMonth.value)} mm`,
      },
    ],
  },
  seasonal: {
    primary: {
      label: "RAINFALL FROM MAY-OCT",
      value: `${rainfallStats.wetSeasonShare}%`,
      note: `wet months average ${rainfallStats.seasonalRatio}x the dry months`,
    },
    secondary: [
      {
        // Labelled as a mean on purpose: this is NOT the 703.62 mm record, it is
        // September's average across all eleven years.
        label: "WETTEST MONTH (11-YR MEAN)",
        value: `${formatMm(rainfallStats.wettestCalendarMonth.meanMm)} mm`,
      },
      {
        label: "PEAK CALENDAR MONTH",
        value: rainfallStats.wettestCalendarMonth.month,
      },
    ],
  },
  yearly: {
    primary: {
      label: "WETTEST YEAR",
      value: `${formatMm(rainfallStats.wettestYear.value)} mm`,
      note: `against ${formatMm(rainfallStats.driestYear.value)} mm in ${rainfallStats.driestYear.year}`,
    },
    secondary: [
      {
        label: "DRIEST YEAR",
        value: String(rainfallStats.driestYear.year),
      },
      {
        label: "11-YEAR TOTAL",
        value: `${formatMm(rainfallStats.totalMm)} mm`,
      },
    ],
  },
}
