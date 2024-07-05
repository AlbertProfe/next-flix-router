import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const isAuth = !!token

    if (!isAuth) {
      return NextResponse.redirect(new URL(`/auth`, req.url))
    }
  } catch (error) {
    console.error("Middleware error:", error)
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/movies/:path*", "/add-movie", "/search-movie"],
}
