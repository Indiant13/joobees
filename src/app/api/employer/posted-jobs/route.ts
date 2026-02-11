import type { EmployerPostedJobsDTO } from "@/types/employerPostedJobs";
import { getEmployerJobs } from "@/app/api/employer/mock-services/job-activity";

export async function GET() {
  const payload: EmployerPostedJobsDTO = {
    jobs: getEmployerJobs(),
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}
