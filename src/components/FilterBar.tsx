export type FilterBarProps = {
  filters: { label: string; value: string }[];
  featuredTags: string[];
};

export function FilterBar({ filters, featuredTags }: FilterBarProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2 text-xs font-medium uppercase tracking-wide text-[rgb(var(--muted))] transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {featuredTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[rgb(var(--accent))]/10 px-3 py-1 text-[rgb(var(--accent))]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
