import type { SaveState } from "@/features/profile-editor/useProfileEditor";
import type { TimelineEntry } from "@/types/profileEditor";
import { SaveIndicator } from "@/features/profile-editor/SaveIndicator";

export type PortfolioSectionProps = {
  title: string;
  items: TimelineEntry[];
  state?: SaveState;
  onSave: (items: TimelineEntry[]) => void;
  onRetry: () => void;
};

function serialize(items: TimelineEntry[]) {
  return items
    .map(
      (item) =>
        `${item.title} | ${item.organization} | ${item.start} - ${item.end ?? ""} | ${
          item.summary ?? ""
        }`,
    )
    .join("\n");
}

function parse(value: string): TimelineEntry[] {
  return value
    .split("\n")
    .map((line, index) => {
      const [title, organization, dates, summary] = line
        .split("|")
        .map((part) => part.trim());
      const [start, end] = (dates ?? "").split("-").map((part) => part.trim());
      return {
        id: `${title}-${index}`,
        title: title ?? "",
        organization: organization ?? "",
        start: start ?? "",
        end: end || undefined,
        summary: summary || undefined,
      };
    })
    .filter((item) => item.title.length > 0);
}

export function PortfolioSection({
  title,
  items,
  state,
  onSave,
  onRetry,
}: PortfolioSectionProps) {
  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">{title}</h2>
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
      <textarea
        className="mt-3 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
        rows={5}
        defaultValue={serialize(items)}
        onBlur={(event) => onSave(parse(event.target.value))}
        aria-label={`${title} timeline`}
      />
      <p className="mt-2 text-xs text-[rgb(var(--muted))]">
        Format: Title | Organization | Start - End | Summary (one per line)
      </p>
    </section>
  );
}

