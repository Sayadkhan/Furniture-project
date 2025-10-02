// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // --- Admin routes ---
  if (pathname.startsWith("/admin")) {
    // Allow login page without token
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // --- Dashboard routes (if you want separate protection) ---
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

// Run middleware only for these paths
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
