import type { SaveState } from "@/features/profile-editor/useProfileEditor";
import { SaveIndicator } from "@/features/profile-editor/SaveIndicator";

export type LinksSectionProps = {
  links: {
    website: string;
    telegram: string;
    github: string;
    x: string;
    linkedin: string;
    nomadList: string;
    instagram: string;
  };
  state?: SaveState;
  onSave: (value: LinksSectionProps["links"]) => void;
  onRetry: () => void;
};

export function LinksSection({ links, state, onSave, onRetry }: LinksSectionProps) {
  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Social links</h2>
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
        {(
          [
            ["Website", "website"],
            ["Telegram", "telegram"],
            ["GitHub", "github"],
            ["X", "x"],
            ["LinkedIn", "linkedin"],
            ["Nomad List", "nomadList"],
            ["Instagram", "instagram"],
          ] as const
        ).map(([label, key]) => (
          <div key={key}>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
              {label}
            </label>
            <input
              type="text"
              defaultValue={links[key]}
              onBlur={(event) => onSave({ ...links, [key]: event.target.value })}
              className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

