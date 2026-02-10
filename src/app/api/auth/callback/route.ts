import { NextResponse } from "next/server";
import type { AuthSession } from "@/features/auth/auth.types";
import {
  encodeSessionCookie,
  exchangeCodeForSession,
  getSessionCookieName,
} from "../auth-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider") as AuthSession["provider"] | null;
  const returnTo = searchParams.get("returnTo") ?? "/";

  if (!provider) {
    return NextResponse.redirect(new URL(returnTo, request.url));
  }

  const session = await exchangeCodeForSession(provider);
  const response = NextResponse.redirect(new URL(returnTo, request.url));
  response.cookies.set(getSessionCookieName(), encodeSessionCookie(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });

  return response;
}
