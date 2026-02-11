import { cookies } from "next/headers";
import {
  getSessionCookieName,
  getSessionFromCookie,
} from "@/app/api/auth/auth-service";

type AdminGuardResult = {
  allowed: boolean;
  response?: Response;
};

export async function requireAdminAccess(): Promise<AdminGuardResult> {
  const isDev = process.env.NODE_ENV === "development";
  const bypass = process.env.ADMIN_DEV_BYPASS === "true";

  if (isDev && bypass) {
    console.warn("[admin-guard] Development bypass enabled.");
    return { allowed: true };
  }

  const store = await cookies();
  const value = store.get(getSessionCookieName())?.value;
  const session = getSessionFromCookie(value);

  if (!session) {
    return {
      allowed: false,
      response: Response.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { allowed: true };
}
