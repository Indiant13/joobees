import { cookies } from "next/headers";
import { getSessionCookieName, getSessionFromCookie } from "../auth-service";

export async function GET() {
  const store = cookies();
  const value = store.get(getSessionCookieName())?.value;
  const session = getSessionFromCookie(value);

  return Response.json({ session });
}
