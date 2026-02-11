import type { AdminRevenueDTO } from "@/types/adminRevenue";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { RevenueStatCard } from "@/components/admin/RevenueStatCard";
import { RevenueBreakdownTable } from "@/components/admin/RevenueBreakdownTable";
import { RevenueTimeline } from "@/components/admin/RevenueTimeline";
import { cookies } from "next/headers";

async function getAdminRevenue(): Promise<AdminRevenueDTO> {
  const baseUrl = await getBaseUrl();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const res = await fetch(`${baseUrl}/api/admin/revenue`, {
    cache: "no-store",
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });

  if (!res.ok) {
    throw new Error(`Failed to load admin revenue (${res.status})`);
  }

  return res.json();
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function AdminRevenuePage() {
  const data = await getAdminRevenue();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Revenue
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Platform revenue report
        </h2>
        <p className="text-sm text-slate-500">
          Aggregated by the Admin BFF. Read-only and internal.
        </p>
      </div>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <RevenueStatCard
          label="Total revenue"
          value={formatCurrency(data.totals.total, data.currency)}
          hint="All sources combined"
        />
        <RevenueStatCard
          label="Job postings"
          value={formatCurrency(data.totals.jobRevenue, data.currency)}
          hint="Promotions and boosts"
        />
        <RevenueStatCard
          label="User payments"
          value={formatCurrency(data.totals.userRevenue, data.currency)}
          hint="Subscriptions and boosts"
        />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <RevenueTimeline
          title="Revenue timeline"
          points={data.timeline.map((point) => ({
            label: point.label,
            amount: point.amount,
            formatted: formatCurrency(point.amount, data.currency),
          }))}
        />
        <div className="grid gap-4">
          <RevenueBreakdownTable
            title="Job revenue breakdown"
            rows={data.jobBreakdown.map((item) => ({
              label: item.type,
              amount: formatCurrency(item.amount, data.currency),
            }))}
          />
          <RevenueBreakdownTable
            title="User revenue breakdown"
            rows={data.userBreakdown.map((item) => ({
              label: item.source,
              amount: formatCurrency(item.amount, data.currency),
            }))}
          />
        </div>
      </section>
    </main>
  );
}
