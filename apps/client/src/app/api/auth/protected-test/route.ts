import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../[...nextauth]/route"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this endpoint" },
      { status: 401 }
    )
  }

  return NextResponse.json({
    message: "This is a protected API route",
    session: session,
  })
}
