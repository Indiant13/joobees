import type { EmployerOverviewDTO } from "@/types/employerOverview";
import { getEmployerJobs } from "@/app/api/employer/mock-services/job-activity";

export async function GET() {
  const jobs = getEmployerJobs();
  const payload: EmployerOverviewDTO = {
    hasPostedJobs: jobs.length > 0,
    totalPostedJobs: jobs.length,
    reporting: {
      cadence: "weekly",
      nextReportAt: "2026-02-16T09:00:00.000Z",
    },
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}
