import { getBaseUrl } from "@/lib/getBaseUrl";
import type { DashboardOverviewDTO } from "@/types/dashboardOverview";
import { DashboardOverview } from "@/features/dashboard-overview/DashboardOverview";

async function getOverview(): Promise<DashboardOverviewDTO> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/me/overview`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to load dashboard overview");
  }

  return res.json();
}

export default async function DashboardOverviewPage() {
  const data = await getOverview();

  return <DashboardOverview data={data} />;
}
