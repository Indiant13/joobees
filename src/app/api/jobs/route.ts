import type { JobPayload } from "@/features/post-job/types";

export async function POST(request: Request) {
  const body = (await request.json()) as JobPayload;

  if (!body?.title || !body?.company?.name) {
    return Response.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  return Response.json(
    {
      id: `job_${Date.now()}`,
      status: "submitted",
      pricingOptionIds: body.pricingOptionIds ?? [],
      receivedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
