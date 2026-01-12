import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public routes
  const isPublicRoute =
    ["/", "/about", "/login", "/register"].includes(pathname) ||
    pathname.startsWith("/post");

  // Skip middleware for certain paths that don't need auth
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    // Skip for static assets (images, etc.)
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|avif)$/i) ||
    // Skip for public directory files
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  try {
    // Get authentication session
    const session = await auth();
    const isAuthenticated = !!session?.user;

    // Debug logging (remove in production)
    console.log("🔍 Middleware Debug:");
    console.log("  - Path:", pathname);
    console.log("  - Is Public Route:", isPublicRoute);
    console.log("  - Is Authenticated:", isAuthenticated);
    console.log("  - Session User:", session?.user?.email || "No session");
    console.log(
      "  - User Agent:",
      request.headers.get("user-agent")?.slice(0, 50)
    );

    // If not authenticated and trying to access protected route
    if (!isAuthenticated && !isPublicRoute) {
      console.log("❌ Redirecting to login - not authenticated for:", pathname);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // If authenticated and on login/register, redirect to dashboard
    if (
      isAuthenticated &&
      (pathname === "/login" || pathname === "/register")
    ) {
      console.log("✅ Redirecting to dashboard - already authenticated");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    console.log("✅ Allowing request to proceed to:", pathname);
    // Allow request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("❌ Middleware error:", error);
    // If there's an error with auth, redirect to login for protected routes
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif)$).*)",
  ],
};
