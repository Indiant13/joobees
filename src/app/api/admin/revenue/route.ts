import type { AdminRevenueDTO } from "@/types/adminRevenue";
import { requireAdminAccess } from "@/app/api/admin/admin-guard";

export async function GET() {
  const guard = await requireAdminAccess();
  if (!guard.allowed) {
    return guard.response ?? new Response(null, { status: 401 });
  }

  const payload: AdminRevenueDTO = {
    currency: "USD",
    totals: {
      total: 482300,
      jobRevenue: 321500,
      userRevenue: 160800,
    },
    jobBreakdown: [
      { type: "Featured", amount: 152400 },
      { type: "Highlight", amount: 96400 },
      { type: "Newsletter", amount: 52700 },
      { type: "Global", amount: 20000 },
    ],
    userBreakdown: [
      { source: "Subscription", amount: 120300 },
      { source: "Profile boost", amount: 26800 },
      { source: "Premium support", amount: 13700 },
    ],
    timeline: [
      { label: "Aug", amount: 62000 },
      { label: "Sep", amount: 71000 },
      { label: "Oct", amount: 80200 },
      { label: "Nov", amount: 91500 },
      { label: "Dec", amount: 102600 },
      { label: "Jan", amount: 75300 },
    ],
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}
