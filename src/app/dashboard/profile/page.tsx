import { getBaseUrl } from "@/lib/getBaseUrl";
import type { ProfileEditorDTO } from "@/types/profileEditor";
import { ProfileEditor } from "@/features/profile-editor/ProfileEditor";

async function getProfile(): Promise<ProfileEditorDTO> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/me/profile`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to load profile");
  }

  return res.json();
}

export default async function DashboardProfilePage() {
  const data = await getProfile();

  return <ProfileEditor initialData={data} />;
}
