import type { SaveState } from "@/features/profile-editor/useProfileEditor";
import { SaveIndicator } from "@/features/profile-editor/SaveIndicator";

export type AvailabilitySectionProps = {
  availableForWork: boolean;
  availableFrom: string;
  preferredTimezones: string[];
  minAnnualUsd: string;
  minHourlyUsd: string;
  state?: SaveState;
  onSave: (value: {
    availableForWork: boolean;
    availableFrom: string;
    preferredTimezones: string[];
    minAnnualUsd: string;
    minHourlyUsd: string;
  }) => void;
  onRetry: () => void;
};

export function AvailabilitySection({
  availableForWork,
  availableFrom,
  preferredTimezones,
  minAnnualUsd,
  minHourlyUsd,
  state,
  onSave,
  onRetry,
}: AvailabilitySectionProps) {
  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Availability & compensation</h2>
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
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            defaultChecked={availableForWork}
            onChange={(event) =>
              onSave({
                availableForWork: event.target.checked,
                availableFrom,
                preferredTimezones,
                minAnnualUsd,
                minHourlyUsd,
              })
            }
            className="h-4 w-4 rounded border-slate-300"
          />
          Available for work
        </label>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Available from
          </label>
          <input
            type="date"
            defaultValue={availableFrom}
            onBlur={(event) =>
              onSave({
                availableForWork,
                availableFrom: event.target.value,
                preferredTimezones,
                minAnnualUsd,
                minHourlyUsd,
              })
            }
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Preferred timezones
          </label>
          <input
            type="text"
            defaultValue={preferredTimezones.join(", ")}
            onBlur={(event) =>
              onSave({
                availableForWork,
                availableFrom,
                preferredTimezones: event.target.value
                  .split(",")
                  .map((tz) => tz.trim())
                  .filter(Boolean),
                minAnnualUsd,
                minHourlyUsd,
              })
            }
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Min annual (USD)
          </label>
          <input
            type="text"
            defaultValue={minAnnualUsd}
            onBlur={(event) =>
              onSave({
                availableForWork,
                availableFrom,
                preferredTimezones,
                minAnnualUsd: event.target.value,
                minHourlyUsd,
              })
            }
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Min hourly (USD)
          </label>
          <input
            type="text"
            defaultValue={minHourlyUsd}
            onBlur={(event) =>
              onSave({
                availableForWork,
                availableFrom,
                preferredTimezones,
                minAnnualUsd,
                minHourlyUsd: event.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </section>
  );
}

