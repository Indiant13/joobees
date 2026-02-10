import type { DashboardOverviewDTO } from "@/types/dashboardOverview";

export type ProfileCompletenessProps = {
  completeness: DashboardOverviewDTO["completeness"];
};

export function ProfileCompleteness({ completeness }: ProfileCompletenessProps) {
  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Profile completeness</h2>
        <span className="text-sm font-semibold text-blue-600">
          {completeness.percent}%
        </span>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-blue-600"
          style={{ width: `${completeness.percent}%` }}
          aria-hidden="true"
        />
      </div>
      <p className="mt-3 text-xs text-[rgb(var(--muted))]">
        Complete your profile to improve visibility.
      </p>
    </section>
  );
}
