"use client";

import { useSafeBack } from "@/hooks/useSafeBack";

type BackButtonProps = {
  label?: string;
};

export function BackButton({ label = "Back" }: BackButtonProps) {
  const goBack = useSafeBack();

  return (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] transition hover:text-[rgb(var(--fg))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
      aria-label={label}
    >
      <span aria-hidden="true">←</span>
      <span>{label}</span>
    </button>
  );
}
