"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthSession } from "@/features/auth/auth.types";
import { useAuth } from "@/features/auth/useAuth";
import { UserAvatarButton } from "@/features/user-menu/UserAvatarButton";

type MenuAction = {
  id: string;
  label: string;
  onSelect: () => void;
};

export type UserMenuProps = {
  session: AuthSession;
  actions?: MenuAction[];
};

export function UserMenu({ session, actions }: UserMenuProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuActions: MenuAction[] =
    actions ??
    [
      {
        id: "edit-profile",
        label: "Edit profile",
        onSelect: () => router.push("/dashboard/profile"),
      },
      {
        id: "saved-jobs",
        label: "Saved jobs",
        onSelect: () => router.push("/dashboard/saved"),
      },
      { id: "sign-out", label: "Sign out", onSelect: () => void logout() },
    ];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current) {
        return;
      }
      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const firstItem = menuRef.current?.querySelector<HTMLButtonElement>(
      "[data-menu-item]",
    );
    firstItem?.focus();
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <UserAvatarButton
        name={session.name}
        avatarUrl={session.avatarUrl}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      />
      {isOpen ? (
        <div
          ref={menuRef}
          role="menu"
          aria-label="User menu"
          className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 text-sm text-slate-700 shadow-lg"
        >
          {menuActions.map((action) => (
            <button
              key={action.id}
              type="button"
              role="menuitem"
              data-menu-item
              className="flex w-full items-center rounded-lg px-3 py-2 text-left transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                setIsOpen(false);
                action.onSelect();
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
