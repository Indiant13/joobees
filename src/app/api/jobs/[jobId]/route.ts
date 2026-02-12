import { getJobDetails } from "@/services/jobs.service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const { jobId } = await params;
  const payload = getJobDetails(jobId);

  if (!payload) {
    return new Response(null, { status: 404 });
  }

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
