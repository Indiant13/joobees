import type { AdminOverviewDTO } from "@/types/adminOverview";
import { requireAdminAccess } from "@/app/api/admin/admin-guard";

export async function GET() {
  const guard = await requireAdminAccess();
  if (!guard.allowed) {
    return guard.response ?? new Response(null, { status: 401 });
  }

  const payload: AdminOverviewDTO = {
    userMetrics: {
      totalUsers: 128450,
      activeUsers: 48210,
      newSignups: 1260,
    },
    jobMetrics: {
      activeJobs: 1840,
      recentJobs: 215,
      promotedJobs: 128,
    },
    revenueMetrics: {
      totalRevenue: 482300,
      mtdRevenue: 72650,
      last30DaysRevenue: 102400,
      currency: "USD",
    },
    trafficMetrics: {
      visits24h: 48200,
      visits7d: 311000,
    },
    alerts: [
      {
        id: "alert-1",
        title: "Job approval backlog",
        detail: "18 postings awaiting review for more than 24 hours.",
        level: "medium",
      },
      {
        id: "alert-2",
        title: "Payment retries spiking",
        detail: "Retry rate increased by 12% in the last 48 hours.",
        level: "high",
      },
      {
        id: "alert-3",
        title: "New enterprise inquiries",
        detail: "5 new enterprise leads captured today.",
        level: "low",
      },
    ],
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}
