import { requireAdminAccess } from "@/app/api/admin/admin-guard";
import { getAdminOverview } from "@/services/analytics.service";

export async function GET() {
  const guard = await requireAdminAccess();
  if (!guard.allowed) {
    return guard.response ?? new Response(null, { status: 401 });
  }

  const payload = getAdminOverview();

  return Response.json(payload, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}
