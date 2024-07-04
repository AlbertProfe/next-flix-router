import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths
  const isPublicPath = path === '/' || path === '/auth'

  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}