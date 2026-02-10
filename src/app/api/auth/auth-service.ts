import type { AuthSession } from "@/features/auth/auth.types";

const SESSION_COOKIE = "joobees_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

type AuthLoginResult = {
  redirectUrl?: string;
  session?: AuthSession;
};

function encodeSession(session: AuthSession) {
  return Buffer.from(JSON.stringify(session), "utf-8").toString("base64");
}

function decodeSession(value: string): AuthSession | null {
  try {
    const parsed = JSON.parse(
      Buffer.from(value, "base64").toString("utf-8"),
    ) as AuthSession;
    return parsed;
  } catch {
    return null;
  }
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function getSessionFromCookie(value?: string) {
  if (!value) {
    return null;
  }
  return decodeSession(value);
}

export function buildSession(params: {
  email: string;
  name: string;
  provider: AuthSession["provider"];
}): AuthSession {
  return {
    userId: `user-${Math.random().toString(36).slice(2, 10)}`,
    email: params.email,
    name: params.name,
    provider: params.provider,
    expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
  };
}

export async function loginWithProvider(
  provider: AuthSession["provider"],
  returnTo: string,
): Promise<AuthLoginResult> {
  return {
    redirectUrl: `/api/auth/callback?provider=${provider}&returnTo=${encodeURIComponent(
      returnTo,
    )}`,
  };
}

export async function loginWithEmail(email: string): Promise<AuthLoginResult> {
  return {
    session: buildSession({
      email,
      name: email.split("@")[0] ?? "User",
      provider: "email",
    }),
  };
}

export async function exchangeCodeForSession(
  provider: AuthSession["provider"],
): Promise<AuthSession> {
  return buildSession({
    email: `${provider}@joobees.dev`,
    name: `${provider[0].toUpperCase()}${provider.slice(1)} User`,
    provider,
  });
}

export function encodeSessionCookie(session: AuthSession) {
  return encodeSession(session);
}
