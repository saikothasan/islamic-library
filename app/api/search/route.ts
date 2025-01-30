import { NextResponse } from "next/server"

const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(query)}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching search results:", error)
    return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 })
  }
}

