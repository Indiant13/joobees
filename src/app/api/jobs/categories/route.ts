import { getJobCategories } from "@/services/jobs.service";

export async function GET() {
  return Response.json(getJobCategories(), {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
