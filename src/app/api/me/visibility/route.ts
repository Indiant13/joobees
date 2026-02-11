import type { VisibilitySettingsDTO } from "@/types/visibilitySettings";
import {
  getVisibilitySettings,
  updateVisibilitySettings,
} from "@/app/api/me/visibility/mock-service";

export async function GET() {
  const data = getVisibilitySettings();
  return Response.json(data, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}

export async function PATCH(request: Request) {
  const patch = (await request.json()) as Partial<VisibilitySettingsDTO>;
  const data = updateVisibilitySettings(patch);
  return Response.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
