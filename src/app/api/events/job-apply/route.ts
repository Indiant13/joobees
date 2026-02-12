import { recordJobApply } from "@/services/analytics.service";

export async function POST() {
  return Response.json(recordJobApply(), {
    headers: { "Cache-Control": "no-store" },
  });
}
