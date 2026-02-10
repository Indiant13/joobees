import type { DashboardOverviewDTO } from "@/types/dashboardOverview";
import { ProfileCompleteness } from "@/features/dashboard-overview/ProfileCompleteness";
import { MissingItemsList } from "@/features/dashboard-overview/MissingItemsList";

export type DashboardOverviewProps = {
  data: DashboardOverviewDTO;
};

export function DashboardOverview({ data }: DashboardOverviewProps) {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Welcome back, {data.user.name}</h1>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          {data.user.headline}
        </p>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <ProfileCompleteness completeness={data.completeness} />
        <MissingItemsList items={data.completeness.missingItems} />
      </div>
    </div>
  );
}
