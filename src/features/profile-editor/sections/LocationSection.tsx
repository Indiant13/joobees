import type { SaveState } from "@/features/profile-editor/useProfileEditor";
import { SaveIndicator } from "@/features/profile-editor/SaveIndicator";

export type LocationSectionProps = {
  currentCountry: string;
  residencyCountry: string;
  nationality: string;
  state?: SaveState;
  onSave: (value: {
    currentCountry: string;
    residencyCountry: string;
    nationality: string;
  }) => void;
  onRetry: () => void;
};

export function LocationSection({
  currentCountry,
  residencyCountry,
  nationality,
  state,
  onSave,
  onRetry,
}: LocationSectionProps) {
  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Location</h2>
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
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Current country
          </label>
          <input
            type="text"
            defaultValue={currentCountry}
            onBlur={(event) =>
              onSave({
                currentCountry: event.target.value,
                residencyCountry,
                nationality,
              })
            }
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Residency country
          </label>
          <input
            type="text"
            defaultValue={residencyCountry}
            onBlur={(event) =>
              onSave({
                currentCountry,
                residencyCountry: event.target.value,
                nationality,
              })
            }
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Nationality
          </label>
          <input
            type="text"
            defaultValue={nationality}
            onBlur={(event) =>
              onSave({
                currentCountry,
                residencyCountry,
                nationality: event.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </section>
  );
}

