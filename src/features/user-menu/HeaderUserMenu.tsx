"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/useAuth";
import { UserMenu } from "@/features/user-menu/UserMenu";
import type { UserMenuDTO } from "@/types/dto/UserMenuDTO";

export function HeaderUserMenu() {
  const { status, session, openModal, logout } = useAuth();
  const router = useRouter();
  const [menuState, setMenuState] = useState<UserMenuDTO>({
    hasPostedJobs: false,
    hasSavedJobs: false,
  });

  useEffect(() => {
    if (status !== "authenticated" || !session) {
      return;
    }

    let isMounted = true;

    async function loadMenuState() {
      const res = await fetch("/api/me/menu", { cache: "no-store" });
      if (!res.ok) {
        return;
      }
      const data = (await res.json()) as UserMenuDTO;
      if (isMounted) {
        setMenuState(data);
      }
    }

    void loadMenuState();

    return () => {
      isMounted = false;
    };
  }, [status, session]);

  const actions = useMemo(() => {
    if (status !== "authenticated") {
      return [];
    }

    return [
      {
        id: "edit-profile",
        label: "Edit profile",
        onSelect: () => router.push("/dashboard/profile"),
      },
      ...(menuState.hasPostedJobs
        ? [
            {
              id: "posted-jobs",
              label: "Posted jobs",
              onSelect: () => router.push("/dashboard/posted-jobs"),
            },
          ]
        : []),
      ...(menuState.hasSavedJobs
        ? [
            {
              id: "saved-jobs",
              label: "Saved jobs",
              onSelect: () => router.push("/dashboard/saved"),
            },
          ]
        : []),
      { id: "sign-out", label: "Sign out", onSelect: () => void logout() },
    ];
  }, [menuState.hasPostedJobs, menuState.hasSavedJobs, router, status, logout]);

  if (status === "authenticated" && session) {
    return <UserMenu session={session} actions={actions} />;
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
