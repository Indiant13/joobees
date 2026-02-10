"use client";

import { useSearchBar } from "@/components/search-bar/useSearchBar";

export type SearchBarProps = {
  placeholder: string;
  hint: string;
};

export function SearchBar({ placeholder, hint }: SearchBarProps) {
  const { value, setValue } = useSearchBar({ debounceMs: 350 });

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8">
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full rounded-xl border border-[rgb(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[rgb(var(--accent))]"
            aria-label="Search jobs"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <button
            type="button"
            className="rounded-xl bg-[rgb(var(--accent))] px-5 py-3 text-sm font-semibold text-white"
          >
            Search
          </button>
        </div>
        <p className="mt-3 text-xs text-[rgb(var(--muted))]">{hint}</p>
      </div>
    </section>
  );
}
