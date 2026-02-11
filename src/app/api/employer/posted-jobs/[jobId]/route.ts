import type { EmployerPostedJobDetailsDTO } from "@/types/employerPostedJobs";
import { getEmployerJobById } from "@/app/api/employer/mock-services/job-activity";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const { jobId } = await params;
  const job = getEmployerJobById(jobId);

  if (!job) {
    return new Response(null, { status: 404 });
  }

  const payload: EmployerPostedJobDetailsDTO = job;

  return Response.json(payload, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}
