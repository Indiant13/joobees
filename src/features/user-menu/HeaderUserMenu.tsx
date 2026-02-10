"use client";

import { useAuth } from "@/features/auth/useAuth";
import { UserMenu } from "@/features/user-menu/UserMenu";

export function HeaderUserMenu() {
  const { status, session, openModal } = useAuth();

  if (status === "authenticated" && session) {
    return <UserMenu session={session} />;
  }

  return (
    <button
      type="button"
      onClick={() => openModal()}
      className="rounded-full border border-blue-300/40 px-3 py-1 text-blue-50 transition hover:border-white hover:text-white"
    >
      Sign in
    </button>
  );
}
