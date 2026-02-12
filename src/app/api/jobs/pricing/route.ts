import { getJobPricing } from "@/services/jobs.service";

export async function GET() {
  return Response.json(getJobPricing(), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
