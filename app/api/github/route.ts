import { NextResponse } from "next/server"

export async function GET() {
  const username = "YOUR_GITHUB_USERNAME"

  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: res.status },
    )
  }

  const data = await res.json()

  return NextResponse.json({
    username: data.login,
    publicRepos: data.public_repos,
    followers: data.followers,
    following: data.following,
    avatarUrl: data.avatar_url,
  })
}
