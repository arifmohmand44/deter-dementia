// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // Get the token using the JWT strategy
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isLoggedIn = !!token;

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register", "/forgot-password", "/"];
  const isPublicPath = publicPaths.some(
    (path) =>
      nextUrl.pathname === path || nextUrl.pathname.startsWith(path + "/")
  );

  // If the user is not logged in and trying to access a protected route
  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // If the user is logged in and trying to access a login page
  if (
    isLoggedIn &&
    (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|img|.*\\.svg|public).*)",
  ],
};
