import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/@")) {
    const username = pathname.slice(2);
    if (username.length > 0) {
      const url = request.nextUrl.clone();
      url.pathname = `/${username}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/@:path*"],
};
