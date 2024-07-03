import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default withAuth(
  function middleware(req) {
    if (
      !req.nextauth.token &&
      req.nextUrl.pathname !== "/" &&
      req.nextUrl.pathname !== "/auth"
    ) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};