import type { ProfileVisibilitySettings } from "@/types/profileVisibility";
import {
  getProfileVisibilitySettings,
  updateProfileVisibilitySettings,
} from "@/app/api/me/profile/visibility/mock-service";

export async function GET() {
  const data = getProfileVisibilitySettings();
  return Response.json(data, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}

export async function PATCH(request: Request) {
  const patch = (await request.json()) as Partial<ProfileVisibilitySettings>;
  const data = updateProfileVisibilitySettings(patch);
  return Response.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
