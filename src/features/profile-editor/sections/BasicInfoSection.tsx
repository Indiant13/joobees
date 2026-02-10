import type { SaveState } from "@/features/profile-editor/useProfileEditor";
import { SaveIndicator } from "@/features/profile-editor/SaveIndicator";

export type BasicInfoSectionProps = {
  bio: string;
  skills: string[];
  languages: string[];
  state?: SaveState;
  onSave: (value: { bio: string; skills: string[]; languages: string[] }) => void;
  onRetry: () => void;
};

export function BasicInfoSection({
  bio,
  skills,
  languages,
  state,
  onSave,
  onRetry,
}: BasicInfoSectionProps) {
  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Basic info</h2>
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
      <div className="mt-4 grid gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Bio
          </label>
          <textarea
            defaultValue={bio}
            rows={5}
            onBlur={(event) =>
              onSave({
                bio: event.target.value,
                skills,
                languages,
              })
            }
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Skills (comma separated)
          </label>
          <input
            type="text"
            defaultValue={skills.join(", ")}
            onBlur={(event) => {
              const next = event.target.value
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean);
              onSave({ bio, skills: next, languages });
            }}
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[rgb(var(--border))] px-3 py-1 text-xs text-[rgb(var(--muted))]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Languages (comma separated)
          </label>
          <input
            type="text"
            defaultValue={languages.join(", ")}
            onBlur={(event) => {
              const next = event.target.value
                .split(",")
                .map((lang) => lang.trim())
                .filter(Boolean);
              onSave({ bio, skills, languages: next });
            }}
            className="mt-2 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </section>
  );
}

