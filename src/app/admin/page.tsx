import type { AdminOverviewDTO } from "@/types/adminOverview";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { cookies } from "next/headers";

async function getAdminOverview(): Promise<AdminOverviewDTO> {
  const baseUrl = await getBaseUrl();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const res = await fetch(`${baseUrl}/api/admin/overview`, {
    cache: "no-store",
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });

  if (!res.ok) {
    throw new Error(`Failed to load admin overview (${res.status})`);
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

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function AlertRow({
  title,
  detail,
  level,
}: {
  title: string;
  detail: string;
  level: "low" | "medium" | "high";
}) {
  const tone =
    level === "high"
      ? "border-red-200 bg-red-50 text-red-700"
      : level === "medium"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return (
    <div className={`rounded-xl border px-3 py-2 text-sm ${tone}`}>
      <p className="font-semibold">{title}</p>
      <p className="text-xs opacity-80">{detail}</p>
    </div>
  );
}

export default async function AdminIndexPage() {
  const data = await getAdminOverview();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Overview
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Admin dashboard
        </h2>
        <p className="text-sm text-slate-500">
          Aggregated monitoring signals for the Joobees platform.
        </p>
      </div>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <StatCard
          label="Total users"
          value={data.userMetrics.totalUsers.toLocaleString("en-US")}
        />
        <StatCard
          label="Active users"
          value={data.userMetrics.activeUsers.toLocaleString("en-US")}
        />
        <StatCard
          label="New signups"
          value={data.userMetrics.newSignups.toLocaleString("en-US")}
        />
        <StatCard
          label="Active jobs"
          value={data.jobMetrics.activeJobs.toLocaleString("en-US")}
        />
        <StatCard
          label="Recent job posts"
          value={data.jobMetrics.recentJobs.toLocaleString("en-US")}
        />
        <StatCard
          label="Promoted jobs"
          value={data.jobMetrics.promotedJobs.toLocaleString("en-US")}
        />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Total revenue"
            value={formatCurrency(
              data.revenueMetrics.totalRevenue,
              data.revenueMetrics.currency,
            )}
          />
          <StatCard
            label="MTD revenue"
            value={formatCurrency(
              data.revenueMetrics.mtdRevenue,
              data.revenueMetrics.currency,
            )}
          />
          <StatCard
            label="Last 30 days"
            value={formatCurrency(
              data.revenueMetrics.last30DaysRevenue,
              data.revenueMetrics.currency,
            )}
          />
          <StatCard
            label="Visits (24h)"
            value={data.trafficMetrics.visits24h.toLocaleString("en-US")}
          />
          <StatCard
            label="Visits (7d)"
            value={data.trafficMetrics.visits7d.toLocaleString("en-US")}
          />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Alerts</h3>
          <div className="mt-4 flex flex-col gap-2">
            {data.alerts.map((alert) => (
              <AlertRow
                key={alert.id}
                title={alert.title}
                detail={alert.detail}
                level={alert.level}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
