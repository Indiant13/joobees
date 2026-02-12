import type { EmployerPostedJobsDTO } from "@/types/employerPostedJobs";
import { getEmployerPostedJobs } from "@/services/jobs.service";

export async function GET() {
  const payload: EmployerPostedJobsDTO = {
    jobs: getEmployerPostedJobs(),
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}
