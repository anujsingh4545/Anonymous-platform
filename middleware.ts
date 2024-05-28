import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (request.nextUrl.pathname.endsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard/allposts", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((request.nextUrl.pathname.startsWith("/register") || request.nextUrl.pathname.startsWith("/login")) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/register/:path*", "/login/:path*", "/dashboard/:path*"],
};
