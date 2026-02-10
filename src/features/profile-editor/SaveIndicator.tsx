import type { SaveState } from "@/features/profile-editor/useProfileEditor";

export function SaveIndicator({ state }: { state?: SaveState }) {
  if (!state || state === "idle") {
    return null;
  }
  if (state === "saving") {
    return <span className="text-xs text-blue-600">Saving…</span>;
  }
  if (state === "success") {
    return <span className="text-xs text-emerald-600">Saved</span>;
  }
  return <span className="text-xs text-rose-600">Error</span>;
}

