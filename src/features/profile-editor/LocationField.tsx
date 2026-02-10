import type { SaveState } from "@/features/profile-editor/useProfileEditor";

export type LocationFieldProps = {
  value: string;
  state: SaveState;
  onSave: (value: string) => void;
  onRetry: () => void;
  onUndo: () => void;
  canUndo: boolean;
  canRetry: boolean;
};

export function LocationField({
  value,
  state,
  onSave,
  onRetry,
  onUndo,
  canUndo,
  canRetry,
}: LocationFieldProps) {
  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Location</h2>
        <div className="flex items-center gap-3 text-xs">
          {state === "saving" ? (
            <span className="text-blue-600">Saving…</span>
          ) : state === "success" ? (
            <span className="text-emerald-600">Saved</span>
          ) : state === "error" ? (
            <span className="text-rose-600">Error</span>
          ) : null}
          {canRetry && state === "error" ? (
            <button
              type="button"
              onClick={onRetry}
              className="text-blue-600 transition hover:text-blue-700"
            >
              Retry
            </button>
          ) : null}
          {canUndo ? (
            <button
              type="button"
              onClick={onUndo}
              className="text-[rgb(var(--muted))] transition hover:text-[rgb(var(--fg))]"
            >
              Undo
            </button>
          ) : null}
        </div>
      </div>
      <input
        type="text"
        className="mt-3 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm text-[rgb(var(--fg))] outline-none focus:border-blue-500"
        defaultValue={value}
        onBlur={(event) => onSave(event.target.value)}
        aria-label="Profile location"
      />
    </section>
  );
}

