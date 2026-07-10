import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedPaths = ["/", "/pages/invoice", "/pages/products"];

// Routes that are only accessible when NOT authenticated
const authPaths = ["/auth/login", "/auth/register"];

// Paths that should never be redirected (static assets, API, etc.)
const publicPrefixes = ["/_next", "/api", "/favicon.ico", "/firebase"];

function isProtected(pathname: string): boolean {
  return protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
}

function isAuthPath(pathname: string): boolean {
  return authPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isPublic(pathname: string): boolean {
  return publicPrefixes.some((p) => pathname.startsWith(p));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public paths
  if (isPublic(pathname)) return NextResponse.next();

  const sessionCookie = request.cookies.get("__session")?.value;

  // Redirect authenticated users away from auth pages
  if (isAuthPath(pathname) && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to login
  if (isProtected(pathname) && !sessionCookie) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
