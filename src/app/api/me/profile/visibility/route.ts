import type { ProfileVisibilitySettings } from "@/types/profileVisibility";
import {
  getProfileVisibility,
  updateProfileVisibility,
} from "@/services/profile.service";

export async function GET() {
  const data = getProfileVisibility();
  return Response.json(data, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}

export async function PATCH(request: Request) {
  const patch = (await request.json()) as Partial<ProfileVisibilitySettings>;
  const data = updateProfileVisibility(patch);
  return Response.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
