import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const protectedRoute = [/^\/chat(\/.*)?$/];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isProtected = protectedRoute.some((route) => route.test(pathname));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (token && pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|images|fonts|signin|error|api/auth).*)",
  ],
};
