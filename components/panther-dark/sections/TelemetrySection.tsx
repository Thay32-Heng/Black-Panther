"use client"

import { useEffect, useRef, useState } from "react"

import MotionSection from "../MotionSection"
type GithubData = {
  ok: boolean
  label?: string
  value?: number
  metric?: string
  activeDays?: number
  streak?: number
  series?: number[]
  source?: string
}

type StatusData = {
  ok: boolean
  online?: boolean
  status?: string
  latencyMs?: number | null
  services?: { up: number; total: number }
  checkedAt?: string
}

const BAR_MAX = 26

export default function TelemetrySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const [github, setGithub] = useState<GithubData | null>(null)
  const [status, setStatus] = useState<StatusData | null>(null)

  // Only reach for the network once the console approaches the viewport.
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { rootMargin: "240px 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let active = true

    async function load() {
      const [githubResult, statusResult] = await Promise.allSettled([
        fetch("/api/github").then((res) => res.json() as Promise<GithubData>),
        fetch("/api/status").then((res) => res.json() as Promise<StatusData>),
      ])

      if (!active) return
      if (githubResult.status === "fulfilled") setGithub(githubResult.value)
      if (statusResult.status === "fulfilled") setStatus(statusResult.value)
    }

    load()
    return () => {
      active = false
    }
  }, [started])

  const showGithub = github === null || github.ok
  const showStatus = status === null || status.ok
  const cardCount = (showGithub ? 1 : 0) + (showStatus ? 1 : 0)
  const connected = Boolean(github?.ok) || Boolean(status?.ok)
  const gridModifier =
    cardCount <= 1 ? "metrics-grid--1" : cardCount === 2 ? "metrics-grid--2" : ""

  const series = github?.series ?? []
  const seriesMax = Math.max(1, ...series)
  const activeFrom = series.length - 3

  const latency =
    status?.latencyMs === null || status?.latencyMs === undefined
      ? "—"
      : `${status.latencyMs}ms`

  return (
    <MotionSection className="telemetry" id="telemetry" aria-labelledby="telemetry-title" ref={sectionRef}>
      <div className="telemetry-inner">
        <header className="telemetry-heading">
          <p className="telemetry-overline">/ Live Telemetry</p>
          <h2 id="telemetry-title">The Pulse of the Engineer.</h2>
          <p className="telemetry-intro">
            A fresh GitHub and connectivity snapshot, loaded when this console
            scrolls into view.
          </p>
        </header>

        <div className="telemetry-console">
          <div className="console-bar">
            <div className="console-id">
              <span className="console-crosshair" aria-hidden="true" />
              <span>PERSONAL_OS / TELEMETRY</span>
            </div>
            <div className="console-status">
              <span>{connected ? "API CONNECTED" : "CONNECTING"}</span>
              <span>LOAD: ON VIEW</span>
            </div>
          </div>

          <div className={`metrics-grid ${gridModifier}`.trim()}>
            {showGithub && (
              <article className="metric-card commits-card">
                <div className="metric-topline">
                  <span>01 / GITHUB</span>
                  <span className="metric-signal" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <p className="metric-label">{github?.label ?? "GitHub Commits"}</p>
                <p className="metric-context">Last 30 Days</p>
                <div className="metric-value-row">
                  <strong>{github?.value ?? "—"}</strong>
                  <span>{github?.source === "graphql" ? "ALL REPOS" : "PUBLIC"}</span>
                </div>
                <div className="commit-summary">
                  <span>
                    Active days <strong>{github?.activeDays ?? "—"}</strong>
                  </span>
                  <span>
                    Longest streak{" "}
                    <strong>
                      {github?.streak === undefined
                        ? "—"
                        : String(github.streak).padStart(2, "0")}
                    </strong>
                  </span>
                </div>
                <div className="commit-graph" aria-hidden="true">
                  {series.length === 0
                    ? Array.from({ length: 14 }, (_, index) => (
                        <i className="commit-bar" style={{ height: "4px" }} key={index} />
                      ))
                    : series.map((value, index) => (
                        <i
                          className={
                            index >= activeFrom && value > 0
                              ? "commit-bar commit-bar-active"
                              : "commit-bar"
                          }
                          style={{
                            height: `${value <= 0 ? 3 : Math.max(5, Math.round((value / seriesMax) * BAR_MAX))}px`,
                          }}
                          key={index}
                        />
                      ))}
                </div>
              </article>
            )}

            {showStatus && (
              <article className="metric-card status-card">
                <div className="metric-topline">
                  <span>02 / INFRASTRUCTURE</span>
                  <span className="uptime">
                    {status?.status ? status.status.toUpperCase() : "CHECKING"}
                  </span>
                </div>
                <p className="metric-label">System Status</p>
                <div className="system-online">
                  <span className="online-orbit" aria-hidden="true">
                    <i />
                  </span>
                  <strong>{status?.online ? "Online" : status ? "Offline" : "—"}</strong>
                </div>
                <div className="system-stats">
                  <span>
                    Latency <strong>{latency}</strong>
                  </span>
                  <span>
                    Services{" "}
                    <strong>
                      {status?.services
                        ? `${String(status.services.up).padStart(2, "0")}/${String(status.services.total).padStart(2, "0")}`
                        : "—"}
                    </strong>
                  </span>
                </div>
              </article>
            )}
          </div>

          <div className="console-footer">
            <span>
              LAST SYNC:{" "}
              {status?.checkedAt
                ? new Date(status.checkedAt).toLocaleTimeString()
                : "—"}
            </span>
            <span>
              {status?.status === "operational"
                ? "ALL SYSTEMS NOMINAL"
                : connected
                  ? "MONITORING"
                  : "AWAITING SIGNAL"}
            </span>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}