import type { SaveState } from "@/features/profile-editor/useProfileEditor";

export function SaveBadge({ state }: { state: SaveState }) {
  if (state === "saving") {
    return <span className="text-xs text-blue-600">Saving…</span>;
  }
  if (state === "success") {
    return <span className="text-xs text-emerald-600">Saved</span>;
  }
  if (state === "error") {
    return <span className="text-xs text-rose-600">Error</span>;
  }
  return null;
}

