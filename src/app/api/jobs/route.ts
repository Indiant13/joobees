import type { JobPayload } from "@/features/post-job/types";
import { submitJob } from "@/services/jobs.service";

export async function POST(request: Request) {
  const body = (await request.json()) as JobPayload;
  const result = submitJob(body);

  if (!result.ok) {
    return Response.json(
      { error: result.error },
      { status: 400 },
    );
  }

  return Response.json(result.data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
