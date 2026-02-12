import type { DashboardOverviewDTO } from "@/types/dashboardOverview";
import { getDashboardOverview } from "@/services/analytics.service";

export async function GET() {
  const data: DashboardOverviewDTO = getDashboardOverview();

  return Response.json(data, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}
