import { getAvatarUploadResult } from "@/services/profile.service";

export async function POST() {
  return Response.json(getAvatarUploadResult());
}
