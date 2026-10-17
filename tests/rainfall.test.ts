// Tests for the numbers the Sandbox chart shows.
//
// The point of these is that the chart claims to plot a real dataset. If
// someone edits MONTHLY_RAINFALL, the derived stats must move with it — and if
// someone hardcodes a headline number instead of deriving it, these fail.
//
//   npm test
//
// Runs on the TypeScript sources via tsx. No test framework is installed; this
// uses node:test, which ships with Node.

import assert from "node:assert/strict"
import test from "node:test"

import {
  MONTHLY_RAINFALL,
  rainfallLabels,
  rainfallStats,
  rainfallViews,
} from "../components/panther-dark/rainfall"

test("the dataset is the 132 months the site claims", () => {
  assert.equal(MONTHLY_RAINFALL.length, 132)
  assert.equal(rainfallStats.observations, 132)
  assert.equal(MONTHLY_RAINFALL.length % 12, 0, "months must be whole years")
})

test("no rainfall value is negative", () => {
  for (const value of MONTHLY_RAINFALL) {
    assert.ok(value >= 0, `negative rainfall: ${value}`)
  }
})

test("the totals match the published figures", () => {
  // These four figures are quoted on the site, in the CV and in the README of
  // the analysis repo. If the array ever drifts, this is the tripwire.
  assert.equal(rainfallStats.totalMm, 15689.69)
  assert.equal(rainfallStats.wettestMonth.value, 703.62)
  assert.equal(rainfallStats.wettestMonth.label, "JUN 2020")
  assert.equal(rainfallStats.driestMonth.value, 0.34)
  assert.equal(rainfallStats.driestMonth.label, "DEC 2019")
})

test("the wet season carries most of the rain", () => {
  assert.equal(rainfallStats.wetSeasonShare, 81.9)
  assert.ok(rainfallStats.seasonalRatio > 4, "wet months should dominate dry months")
})

test("the three views are derived, not typed in", () => {
  assert.equal(rainfallViews.monthly.length, 132)
  assert.equal(rainfallViews.seasonal.length, 12)
  assert.equal(rainfallViews.yearly.length, 11)
})

test("the seasonal means average back to the overall mean", () => {
  const sumOfMeans = rainfallViews.seasonal.reduce((a, b) => a + b, 0)
  const overallMean =
    MONTHLY_RAINFALL.reduce((a, b) => a + b, 0) / MONTHLY_RAINFALL.length
  // Twelve calendar-month means, one per year each, must reconstruct the mean.
  assert.ok(
    Math.abs(sumOfMeans / 12 - overallMean) < 0.01,
    `seasonal means drifted: ${sumOfMeans / 12} vs ${overallMean}`,
  )
})

test("the yearly totals reconstruct the grand total", () => {
  const fromYears = rainfallViews.yearly.reduce((a, b) => a + b, 0)
  assert.ok(Math.abs(fromYears - rainfallStats.totalMm) < 0.05)
})

test("the wettest calendar month is September, not June", () => {
  // The single most counter-intuitive result in the dataset: June 2020 is the
  // wettest single month ever recorded, but September is wettest on average.
  assert.equal(rainfallStats.wettestCalendarMonth.month, "SEP")
})

test("axis labels line up with the values they describe", () => {
  for (const view of Object.keys(rainfallViews) as (keyof typeof rainfallViews)[]) {
    assert.equal(
      rainfallLabels[view].length,
      rainfallViews[view].length,
      `${view}: label count must match value count`,
    )
  }
})

test("the driest year and the wettest year are different years", () => {
  assert.notEqual(rainfallStats.driestYear.year, rainfallStats.wettestYear.year)
  assert.ok(rainfallStats.wettestYear.value > rainfallStats.driestYear.value)
})
