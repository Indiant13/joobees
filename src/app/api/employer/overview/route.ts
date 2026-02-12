import type { EmployerOverviewDTO } from "@/types/employerOverview";
import { getEmployerOverview } from "@/services/jobs.service";

export async function GET() {
  const payload: EmployerOverviewDTO = getEmployerOverview();

  return Response.json(payload, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}
