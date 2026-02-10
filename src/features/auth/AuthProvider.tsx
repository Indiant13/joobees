"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthContextValue, AuthSession, AuthState } from "./auth.types";

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchSession(): Promise<AuthSession | null> {
  const res = await fetch("/api/auth/session", { cache: "no-store" });
  if (!res.ok) {
    return null;
  }
  const data = (await res.json()) as { session: AuthSession | null };
  return data.session ?? null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    status: "loading",
    session: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refresh = useCallback(async () => {
    setState((prev) => ({ ...prev, status: "loading" }));
    const session = await fetchSession();
    setState({
      status: session ? "authenticated" : "unauthenticated",
      session,
    });
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const loginWithProvider = useCallback(
    async (provider: AuthSession["provider"]) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: "oauth", provider }),
      });

      if (!res.ok) {
        return;
      }

      const data = (await res.json()) as { redirectUrl?: string };
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        await refresh();
      }
    },
    [refresh],
  );

  const loginWithEmail = useCallback(
    async (email: string) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: "email", email }),
      });

      if (res.ok) {
        await refresh();
      }
    },
    [refresh],
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await refresh();
  }, [refresh]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      refresh,
      loginWithProvider,
      loginWithEmail,
      logout,
      isModalOpen,
      openModal,
      closeModal,
    }),
    [
      state,
      refresh,
      loginWithProvider,
      loginWithEmail,
      logout,
      isModalOpen,
      openModal,
      closeModal,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
