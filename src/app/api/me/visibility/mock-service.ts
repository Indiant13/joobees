import type { VisibilitySettingsDTO } from "@/types/visibilitySettings";

let visibility: VisibilitySettingsDTO = {
  showAvatar: true,
  showBio: true,
  showLocation: true,
  showTimezone: true,
  showLinks: true,
  showBadges: true,
  showStats: true,
};

export function getVisibilitySettings(): VisibilitySettingsDTO {
  return visibility;
}

export function updateVisibilitySettings(
  patch: Partial<VisibilitySettingsDTO>,
): VisibilitySettingsDTO {
  visibility = {
    ...visibility,
    ...patch,
  };
  return visibility;
}
