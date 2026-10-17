// RAW SOURCE DATA — do not hand-edit.
//
// 132 monthly precipitation records for Phnom Penh, Jan 2015 - Dec 2025,
// taken verbatim from the project that produced them:
//   github.com/Thay32-Heng/Phnom-Penh-Precipitation-Time-Series-Analysis
//   data/phnom_penh_monthly_precipitation_2015_2025_long.csv
//
// Every number the Sandbox chart shows is derived from this array by the
// functions below. Nothing on that chart is invented.

export const MONTH_LABELS = [
  "JAN", "FEB", "MAR", "APR",
  "MAY", "JUN", "JUL", "AUG",
  "SEP", "OCT", "NOV", "DEC",
] as const

/** Monthly rainfall in mm, oldest first. 132 values = 11 years x 12 months. */
export const MONTHLY_RAINFALL: readonly number[] = [
  3.26, 6.85, 6.79, 86.97, 46.84, 85.88, 41.22, 288.64,
  133.08, 134.41, 70.89, 13.06, 26.66, 4.83, 6.41, 7.81,
  117.14, 43.76, 25.41, 23.91, 138.20, 166.56, 137.19, 33.45,
  18.64, 16.04, 14.73, 29.46, 123.78, 62.85, 140.62, 175.00,
  213.37, 87.40, 93.56, 41.91, 75.61, 7.22, 80.34, 94.97,
  177.46, 338.51, 205.87, 41.17, 224.33, 155.88, 20.71, 39.95,
  19.07, 2.88, 25.55, 59.37, 236.16, 392.30, 223.72, 263.68,
  263.18, 93.11, 29.63, 0.34, 26.58, 2.14, 34.14, 146.86,
  92.30, 703.62, 166.68, 174.17, 280.88, 496.85, 98.60, 67.73,
  11.54, 10.80, 10.14, 111.31, 243.46, 121.11, 299.33, 261.06,
  329.28, 240.56, 213.00, 31.50, 5.36, 56.69, 128.22, 115.23,
  205.65, 262.05, 439.12, 276.57, 250.76, 185.50, 130.42, 26.53,
  30.18, 6.23, 1.08, 22.04, 108.30, 154.58, 177.06, 158.74,
  315.42, 266.52, 131.32, 30.82, 1.75, 0.80, 13.03, 2.15,
  146.80, 212.52, 271.85, 147.87, 207.61, 233.95, 50.78, 20.45,
  1.02, 19.62, 44.45, 48.73, 46.49, 69.32, 36.31, 291.32,
  146.00, 172.70, 91.83, 16.72,
]

// ---------------------------------------------------------------------------
// Everything below is computed from MONTHLY_RAINFALL at build time. If you
// change the array, the chart, the axis and the headline numbers all follow.
// ---------------------------------------------------------------------------

const START_YEAR = 2015

/** The three views of the same 132-month series, matching the lab write-up. */
export const rainfallViews = {
  /** Time plot: all 132 months in order, so the seasonal cycle is visible. */
  monthly: MONTHLY_RAINFALL,
  /** Seasonal plot: the mean rainfall of each calendar month, 2015-2025. */
  seasonal: MONTH_LABELS.map((_, index) =>
    mean(valuesAtCalendarMonth(index)),
  ),
  /** Seasonal subseries: the total rainfall of each year, 2015-2025. */
  yearly: Array.from({ length: 11 }, (_, year) =>
    MONTHLY_RAINFALL.slice(year * 12, year * 12 + 12).reduce(add, 0),
  ),
} as const

export type RainfallView = keyof typeof rainfallViews

/**
 * Axis labels for each view. Every view has exactly as many labels as it has
 * values, so `labels[i]` always describes `values[i]` — a shorter label array
 * silently mislabels the chart instead of failing.
 */
export const rainfallLabels: Record<RainfallView, readonly string[]> = {
  monthly: MONTHLY_RAINFALL.map((_, index) => {
    const year = START_YEAR + Math.floor(index / 12)
    return `${MONTH_LABELS[index % 12]} ${year}`
  }),
  seasonal: MONTH_LABELS,
  yearly: Array.from({ length: 11 }, (_, year) => `${START_YEAR + year}`),
}

function add(a: number, b: number): number {
  return a + b
}

function mean(values: readonly number[]): number {
  return values.reduce(add, 0) / values.length
}

/** The 11 observations of one calendar month (0 = January) across all years. */
function valuesAtCalendarMonth(calendarMonth: number): number[] {
  return Array.from(
    { length: 11 },
    (_, year) => MONTHLY_RAINFALL[year * 12 + calendarMonth],
  )
}

const totalRainfall = MONTHLY_RAINFALL.reduce(add, 0)
const yearTotals = rainfallViews.yearly

export const rainfallStats = {
  observations: MONTHLY_RAINFALL.length,
  totalMm: round(totalRainfall),
  wettestMonth: extreme(MONTHLY_RAINFALL, "max"),
  driestMonth: extreme(MONTHLY_RAINFALL, "min"),
  /** Share of total rainfall that falls between May and October. */
  wetSeasonShare: ratio(5, 10, totalRainfall),
  /** Mean of May-Oct against mean of Nov-Apr. The seasonal signal, as a ratio. */
  seasonalRatio: round(mean(monthsMayToOct()) / mean(monthsNovToApr())),
  /** The calendar month with the highest 11-year mean — September, not June. */
  wettestCalendarMonth: peakCalendarMonth(),
  wettestYear: yearExtreme(yearTotals, "max"),
  driestYear: yearExtreme(yearTotals, "min"),
} as const

/** The 11-year mean that is highest, and which calendar month it belongs to. */
function peakCalendarMonth() {
  const means = rainfallViews.seasonal
  const index = means.indexOf(Math.max(...means))
  return { month: MONTH_LABELS[index], meanMm: round(means[index]) }
}

/** Index into `yearTotals`, which starts at 2015. */
function yearExtreme(values: readonly number[], pick: "max" | "min") {
  const value = pick === "max" ? Math.max(...values) : Math.min(...values)
  return { value: round(value), year: START_YEAR + values.indexOf(value) }
}

/** Share of `total` that falls between calendar months `from` and `to` (1-12). */
function ratio(from: number, to: number, total: number): number {
  const inRange = MONTHLY_RAINFALL.filter((_, index) => {
    const month = (index % 12) + 1
    return month >= from && month <= to
  })
  return Math.round((inRange.reduce(add, 0) / total) * 1000) / 10
}

function monthsMayToOct(): number[] {
  return MONTHLY_RAINFALL.filter((_, index) => index % 12 >= 4 && index % 12 <= 9)
}

function monthsNovToApr(): number[] {
  return MONTHLY_RAINFALL.filter((_, index) => {
    const slot = index % 12
    return slot >= 10 || slot <= 3
  })
}

function extreme(values: readonly number[], pick: "max" | "min") {
  const value = pick === "max" ? Math.max(...values) : Math.min(...values)
  const index = values.indexOf(value)
  const year = START_YEAR + Math.floor(index / 12)
  const month = MONTH_LABELS[index % 12]
  return { value: round(value), label: `${month} ${year}` }
}

function round(value: number): number {
  return Math.round(value * 100) / 100
}
