import { recordJobView } from "@/services/analytics.service";

export async function POST() {
  return Response.json(recordJobView(), {
    headers: { "Cache-Control": "no-store" },
  });
}
