import { NextResponse } from "next/server";
import type { AuthSession } from "@/features/auth/auth.types";
import {
  encodeSessionCookie,
  getSessionCookieName,
  loginWithEmail,
  loginWithProvider,
} from "../auth-service";

type LoginBody =
  | { method: "oauth"; provider: AuthSession["provider"] }
  | { method: "email"; email: string };

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBody;
  const returnTo = request.headers.get("referer") ?? "/";

  if (body.method === "oauth") {
    const result = await loginWithProvider(body.provider, returnTo);
    return NextResponse.json({ redirectUrl: result.redirectUrl });
  }

  const result = await loginWithEmail(body.email);
  const response = NextResponse.json({ success: true });

  if (result.session) {
    response.cookies.set(getSessionCookieName(), encodeSessionCookie(result.session), {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
    });
  }

  return response;
}
