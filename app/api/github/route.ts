import { NextResponse } from "next/server"

const USERNAME = process.env.GITHUB_USERNAME ?? "Thay32-Heng"

const WINDOW_DAYS = 30
const BAR_COUNT = 14

type ContributionDay = { date: string; contributionCount: number }

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        totalCommitContributions: number
        contributionCalendar: {
          weeks: { contributionDays: ContributionDay[] }[]
        }
      }
    } | null
  }
}

type GithubEvent = {
  type: string
  created_at: string
}

function pushCount(event: GithubEvent): number {
  return event.type === "PushEvent" ? 1 : 0
}

function isoDaysAgo(days: number): string {
  const date = new Date()
  date.setUTCHours(0, 0, 0, 0)
  date.setUTCDate(date.getUTCDate() - days)
  return date.toISOString()
}

function activeDaysOf(days: ContributionDay[]): number {
  return days.filter((day) => day.contributionCount > 0).length
}

function longestStreakOf(days: ContributionDay[]): number {
  let best = 0
  let current = 0
  for (const day of days) {
    if (day.contributionCount > 0) {
      current += 1
      best = Math.max(best, current)
    } else {
      current = 0
    }
  }
  return best
}

function bucketSeries(days: ContributionDay[], buckets: number): number[] {
  if (days.length === 0) return Array(buckets).fill(0)
  const series: number[] = []
  for (let index = 0; index < buckets; index += 1) {
    const start = Math.floor((index * days.length) / buckets)
    const end = Math.floor(((index + 1) * days.length) / buckets)
    let total = 0
    for (let cursor = start; cursor < Math.max(end, start + 1); cursor += 1) {
      total += days[cursor]?.contributionCount ?? 0
    }
    series.push(total)
  }
  return series
}

async function viaGraphql(token: string): Promise<ContributionDay[] | null> {
  const query = `query($login:String!,$from:DateTime!,$to:DateTime!){
    user(login:$login){
      contributionsCollection(from:$from,to:$to){
        totalCommitContributions
        contributionCalendar{ weeks{ contributionDays{ date contributionCount } } }
      }
    }
  }`

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "panther-telemetry",
    },
    body: JSON.stringify({
      query,
      variables: { login: USERNAME, from: isoDaysAgo(WINDOW_DAYS), to: new Date().toISOString() },
    }),
    next: { revalidate: 1800 },
  })

  if (!res.ok) return null

  const json = (await res.json()) as GraphQLResponse
  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) return null

  return calendar.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({ date: day.date, contributionCount: day.contributionCount }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

async function viaPublicEvents(): Promise<ContributionDay[] | null> {
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/events/public?per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "panther-telemetry",
      },
      next: { revalidate: 1800 },
    },
  )

  if (!res.ok) return null

  const events = (await res.json()) as GithubEvent[]
  const cutoff = new Date(isoDaysAgo(WINDOW_DAYS)).getTime()
  const perDay = new Map<string, number>()

  for (const event of events) {
    const created = new Date(event.created_at).getTime()
    if (created < cutoff) continue
    const count = pushCount(event)
    if (count === 0) continue
    const day = event.created_at.slice(0, 10)
    perDay.set(day, (perDay.get(day) ?? 0) + count)
  }

  return Array.from(perDay.entries())
    .map(([date, contributionCount]) => ({ date, contributionCount }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN

  try {
    const raw = token ? await viaGraphql(token) : await viaPublicEvents()

    if (!raw || raw.length === 0) {
      return NextResponse.json({ ok: false, reason: "no-data" })
    }

    const days: ContributionDay[] = []
    for (let offset = WINDOW_DAYS - 1; offset >= 0; offset -= 1) {
      const date = isoDaysAgo(offset).slice(0, 10)
      days.push({ date, contributionCount: 0 })
    }
    const index = new Map(days.map((day) => [day.date, day]))
    for (const point of raw) {
      const slot = index.get(point.date)
      if (slot) slot.contributionCount += point.contributionCount
    }

    const total = days.reduce((sum, day) => sum + day.contributionCount, 0)
    const metric = token ? "commits" : "pushes"

    return NextResponse.json({
      ok: true,
      username: USERNAME,
      metric,
      label: token ? "GitHub Commits" : "GitHub Pushes",
      value: total,
      activeDays: activeDaysOf(days),
      streak: longestStreakOf(days),
      series: bucketSeries(days, BAR_COUNT),
      windowDays: WINDOW_DAYS,
      source: token ? "graphql" : "events",
    })
  } catch {
    return NextResponse.json({ ok: false, reason: "fetch-failed" })
  }
}
