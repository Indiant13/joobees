import type { ProfileVisibilitySettings } from "@/types/profileVisibility";

// New fields should default to false unless explicitly enabled.
export const DEFAULT_VISIBILITY: ProfileVisibilitySettings = {
  showAvatar: true,
  showLocation: true,
  showBio: true,
  showSkills: true,
  showLanguages: true,
  showWebsite: true,
  showGithub: true,
  showLinkedin: true,
  showPortfolio: true,
  showEmployment: true,
  showEducation: true,
  showAvailability: true,
  showLastSeen: true,
};
