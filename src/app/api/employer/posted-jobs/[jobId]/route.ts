import type { EmployerPostedJobDetailsDTO } from "@/types/employerPostedJobs";
import { getEmployerPostedJobDetails } from "@/services/jobs.service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const { jobId } = await params;
  const job = getEmployerPostedJobDetails(jobId);

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
