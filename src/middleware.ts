import { NextResponse, type NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;

  // Check token from cookies (Vercel or NextAuth)
  const token =
    cookies.get("_vercel_jwt")?.value ||
    cookies.get("next-auth.session-token")?.value ||
    cookies.get("__Secure-next-auth.session-token")?.value;

  const isLoggedIn = !!token;

  const publicPaths = ["/login", "/register", "/forgot-password"];
  const isPublicPath = publicPaths.some(
    (path) =>
      nextUrl.pathname === path || nextUrl.pathname.startsWith(path + "/")
  );

  // 👇 Redirect to /d-summary if logged in and visiting /
  if (isLoggedIn && nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/d-summary", nextUrl));
  }

  // 👇 If not logged in and not visiting a public path, redirect to login
  if (!isLoggedIn && !isPublicPath && nextUrl.pathname !== "/disclaimer") {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 👇 If logged in and trying to access login/register, redirect to dashboard
  if (
    isLoggedIn &&
    (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|img|.*\\.svg|public).*)",
  ],
};
