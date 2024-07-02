import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;

   if (path.startsWith('/api/auth') || path === '/auth') {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};