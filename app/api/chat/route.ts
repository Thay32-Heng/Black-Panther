import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { message } = await request.json()

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 })
  }

  // TODO: plug in your AI provider (OpenAI/Anthropic) here.
  // The API key stays on the server via process.env.AI_API_KEY.
  return NextResponse.json({
    reply: `Echo from the Shadow: "${message}"`,
  })
}
