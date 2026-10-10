import { NextResponse } from "next/server"

const TIMEOUT_MS = 4000

const CHECKS = [
  { name: "GitHub API", url: "https://api.github.com/rate_limit" },
  { name: "Network", url: "https://www.gstatic.com/generate_204" },
]

type CheckResult = { name: string; ok: boolean; ms: number | null }

async function probe(name: string, url: string): Promise<CheckResult> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  const startedAt = Date.now()
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
      headers: { "User-Agent": "panther-telemetry" },
    })
    const ms = Date.now() - startedAt
    return { name, ok: res.ok, ms }
  } catch {
    return { name, ok: false, ms: null }
  } finally {
    clearTimeout(timer)
  }
}

export async function GET() {
  const checks = await Promise.all(CHECKS.map((check) => probe(check.name, check.url)))
  const up = checks.filter((check) => check.ok)
  const latencies = up.map((check) => check.ms).filter((ms): ms is number => ms !== null)
  const latencyMs =
    latencies.length > 0
      ? Math.round(latencies.reduce((sum, ms) => sum + ms, 0) / latencies.length)
      : null

  return NextResponse.json({
    ok: true,
    online: up.length > 0,
    status: up.length === checks.length ? "operational" : up.length > 0 ? "degraded" : "offline",
    latencyMs,
    services: { up: up.length, total: checks.length },
    checks: checks.map((check) => ({
      name: check.name,
      ok: check.ok,
      ms: check.ms,
    })),
    uptimeSeconds: Math.round(process.uptime()),
    checkedAt: new Date().toISOString(),
  })
}
