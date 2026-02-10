"use client";

import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { AUTH_PROVIDERS } from "@/features/auth/auth.providers";

export function AuthModal() {
  const {
    isModalOpen,
    closeModal,
    loginWithProvider,
    loginWithEmail,
  } = useAuth();
  const [email, setEmail] = useState("");
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => {
      previous?.focus();
    };
  }, [isModalOpen]);

  useLayoutEffect(() => {
    if (!isModalOpen) {
      return;
    }
    const target = document.getElementById("modal-root");
    setPortalTarget(target);
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !portalTarget) {
      return;
    }
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isModalOpen, portalTarget]);

  useEffect(() => {
    if (isModalOpen) {
      return;
    }
    setPortalTarget(null);
  }, [isModalOpen]);

  if (!isModalOpen || !portalTarget) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6"
      role="presentation"
      onClick={() => closeModal()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Sign in"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl outline-none"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Sign in</h2>
          <button
            type="button"
            onClick={() => closeModal()}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
          >
            Close
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          {AUTH_PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => void loginWithProvider(provider.id)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Continue with {provider.label}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Email
          </label>
          <form
            className="mt-2 flex flex-col gap-2 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              if (email.trim().length === 0) {
                return;
              }
              void loginWithEmail(email.trim());
              setEmail("");
              closeModal();
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Send link
            </button>
          </form>
        </div>
      </div>
    </div>,
    portalTarget,
  );
}
