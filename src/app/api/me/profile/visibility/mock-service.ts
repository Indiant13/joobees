import type { ProfileVisibilitySettings } from "@/types/profileVisibility";
import { DEFAULT_VISIBILITY } from "@/features/profile-visibility/defaults";

let visibility: ProfileVisibilitySettings = { ...DEFAULT_VISIBILITY };

export function getProfileVisibilitySettings(): ProfileVisibilitySettings {
  return visibility;
}

export function updateProfileVisibilitySettings(
  patch: Partial<ProfileVisibilitySettings>,
): ProfileVisibilitySettings {
  visibility = {
    ...visibility,
    ...patch,
  };
  return visibility;
}
