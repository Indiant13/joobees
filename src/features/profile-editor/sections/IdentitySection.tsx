import type { SaveState } from "@/features/profile-editor/useProfileEditor";
import { SaveIndicator } from "@/features/profile-editor/SaveIndicator";

export type IdentitySectionProps = {
  displayName: string;
  username: string;
  state?: SaveState;
  onSave: (value: { displayName: string }) => void;
  onRetry: () => void;
};

export function IdentitySection({
  displayName,
  username,
  state,
  onSave,
  onRetry,
}: IdentitySectionProps) {
  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Identity</h2>
        <div className="flex items-center gap-3 text-xs">
          <SaveIndicator state={state} />
          {state === "error" ? (
            <button
              type="button"
              onClick={onRetry}
              className="text-blue-600 transition hover:text-blue-700"
            >
              Retry
            </button>
          ) : null}
        </div>
      </header>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Display name
          </label>
          <input
            type="text"
            defaultValue={displayName}
            onBlur={(event) => onSave({ displayName: event.target.value })}
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Username
          </label>
          <input
            type="text"
            value={`@${username}`}
            readOnly
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-slate-100 px-4 py-3 text-sm text-[rgb(var(--muted))]"
          />
        </div>
      </div>
    </section>
  );
}

