import { JOB_PRICING_OPTIONS } from "@/config/jobPricing";

export async function GET() {
  return Response.json(JOB_PRICING_OPTIONS, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
