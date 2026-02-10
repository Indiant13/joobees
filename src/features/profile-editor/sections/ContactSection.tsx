import type { SaveState } from "@/features/profile-editor/useProfileEditor";
import { SaveIndicator } from "@/features/profile-editor/SaveIndicator";

export type ContactSectionProps = {
  email: string;
  emailNotifications: boolean;
  preferredContact: string;
  state?: SaveState;
  onSave: (value: {
    emailNotifications: boolean;
    preferredContact: string;
  }) => void;
  onRetry: () => void;
};

export function ContactSection({
  email,
  emailNotifications,
  preferredContact,
  state,
  onSave,
  onRetry,
}: ContactSectionProps) {
  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Contact & notifications</h2>
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
            Email (read-only)
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-slate-100 px-4 py-3 text-sm text-[rgb(var(--muted))]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Preferred contact
          </label>
          <input
            type="text"
            defaultValue={preferredContact}
            onBlur={(event) =>
              onSave({
                emailNotifications,
                preferredContact: event.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            defaultChecked={emailNotifications}
            onChange={(event) =>
              onSave({
                emailNotifications: event.target.checked,
                preferredContact,
              })
            }
            className="h-4 w-4 rounded border-slate-300"
          />
          Receive email notifications
        </label>
      </div>
    </section>
  );
}

