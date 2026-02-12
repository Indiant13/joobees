import type { HomePageResponse } from "@/types/homePage";
import { parseJobFilterQuery } from "@/lib/job-filters/parse";
import { searchJobs } from "@/services/search.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const filters = parseJobFilterQuery(searchParams);
  const response: HomePageResponse = searchJobs(query, filters);

  return Response.json(response, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
