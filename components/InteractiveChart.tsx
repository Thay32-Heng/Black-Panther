"use client"

import { useState } from "react"

const chartSeries = {
  "7 Days": [34, 42, 38, 55, 49, 68, 74, 66, 82, 78, 91, 96],
  "1 Month": [28, 35, 32, 44, 41, 52, 48, 63, 69, 65, 78, 86],
  "1 Year": [18, 23, 31, 28, 39, 47, 43, 57, 62, 71, 77, 89],
} as const

type ChartPeriod = keyof typeof chartSeries

function InteractiveChart() {
  const [period, setPeriod] = useState<ChartPeriod>("1 Month")
  const [activePoint, setActivePoint] = useState<number | null>(null)
  const values = chartSeries[period]
  const chartWidth = 820
  const chartHeight = 280
  const horizontalPadding = 18
  const verticalPadding = 22
  const maxValue = 100
  const points = values.map((value, index) => ({
    x:
      horizontalPadding +
      (index * (chartWidth - horizontalPadding * 2)) / (values.length - 1),
    y:
      chartHeight -
      verticalPadding -
      (value / maxValue) * (chartHeight - verticalPadding * 2),
    value,
  }))
  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ")
  const areaPoints = `${horizontalPadding},${chartHeight - verticalPadding} ${linePoints} ${
    chartWidth - horizontalPadding
  },${chartHeight - verticalPadding}`
  const change = values[values.length - 1] - values[0]

  return (
    <div className="dashboard">
      <div className="dashboard-toolbar">
        <div className="dashboard-id">
          <span className="live-indicator" />
          <div>
            <span>LIVE MODEL</span>
            <strong>Signal Extraction Index</strong>
          </div>
        </div>

        <div className="period-tabs" aria-label="Chart time range">
          {(Object.keys(chartSeries) as ChartPeriod[]).map((option) => (
            <button
              className={option === period ? "period-tab period-tab-active" : "period-tab"}
              type="button"
              aria-pressed={option === period}
              onClick={() => {
                setPeriod(option)
                setActivePoint(null)
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
          <span>MODEL CONFIDENCE</span>
          <strong>{values[values.length - 1]}.0%</strong>
          <small>+{change}.0 pts</small>
        </div>
        <div className="secondary-metrics">
          <div>
            <span>SAMPLES</span>
            <strong>{period === "7 Days" ? "18.4K" : period === "1 Month" ? "84.2K" : "1.02M"}</strong>
          </div>
          <div>
            <span>NOISE REDUCTION</span>
            <strong>{period === "1 Year" ? "71.8%" : "64.2%"}</strong>
          </div>
        </div>
      </div>

      <div className="chart-wrap">
        <div className="chart-y-labels" aria-hidden="true">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>

        <svg
          className="data-chart"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          role="img"
          aria-label={`${period} signal extraction trend, currently ${values[values.length - 1]} percent`}
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
            {[22, 81, 140, 199, 258].map((y) => (
              <line x1="18" x2="802" y1={y} y2={y} key={y} />
            ))}
            {[18, 214, 410, 606, 802].map((x) => (
              <line x1={x} x2={x} y1="22" y2="258" key={x} />
            ))}
          </g>

          <polygon className="chart-area" points={areaPoints} />
          <polyline className="chart-line" points={linePoints} />

          <g className="chart-points">
            {points.map((point, index) => (
              <g
                className="chart-point"
                role="button"
                tabIndex={0}
                aria-label={`Data point ${index + 1}: ${point.value} percent`}
                onMouseEnter={() => setActivePoint(index)}
                onMouseLeave={() => setActivePoint(null)}
                onFocus={() => setActivePoint(index)}
                onBlur={() => setActivePoint(null)}
                key={`${period}-${index}`}
              >
                <circle className="point-hit" cx={point.x} cy={point.y} r="14" />
                <circle
                  className={activePoint === index ? "point-dot point-dot-active" : "point-dot"}
                  cx={point.x}
                  cy={point.y}
                  r={activePoint === index ? 5 : 3}
                />
              </g>
            ))}
          </g>

          {activePoint !== null && (
            <g
              className="chart-tooltip"
              transform={`translate(${Math.min(Math.max(points[activePoint].x - 44, 4), 728)} ${
                Math.max(points[activePoint].y - 58, 4)
              })`}
            >
              <rect width="88" height="42" rx="2" />
              <text x="10" y="15">
                SIGNAL
              </text>
              <text className="tooltip-value" x="10" y="32">
                {points[activePoint].value}.0%
              </text>
            </g>
          )}
        </svg>

        <div className="chart-x-labels" aria-hidden="true">
          <span>START</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>NOW</span>
        </div>
      </div>

      <div className="dashboard-footer">
        <span>MODEL: SIGNAL_v4.8</span>
        <span>UPDATED IN REAL TIME</span>
      </div>
    </div>
  )
}

export { InteractiveChart }