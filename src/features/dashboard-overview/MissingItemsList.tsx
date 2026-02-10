import type { DashboardOverviewDTO } from "@/types/dashboardOverview";

export type MissingItemsListProps = {
  items: DashboardOverviewDTO["completeness"]["missingItems"];
};

export function MissingItemsList({ items }: MissingItemsListProps) {
  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-sm">
        <h2 className="text-sm font-semibold">Missing items</h2>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          Your profile is complete.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-sm">
      <h2 className="text-sm font-semibold">Missing items</h2>
      <ul className="mt-3 flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-2 rounded-xl border border-[rgb(var(--border))] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-sm text-[rgb(var(--muted))]">
              {item.label}
            </span>
            <a
              href={item.href}
              className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
            >
              {item.ctaLabel}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
