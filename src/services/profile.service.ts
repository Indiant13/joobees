import { getBaseUrl } from "@/lib/getBaseUrl";
import { resolvePublicProfileSlug } from "@/lib/slugService";
import type { PublicProfileDTO } from "@/types/dto/PublicProfileDTO";
import type { ProfileEditorDTO } from "@/types/profileEditor";
import type { ProfileVisibilitySettings } from "@/types/profileVisibility";
import { getPublicProfileRecord } from "@/app/api/public-profile/mock-services/public-profile";
import {
  getProfileVisibilitySettings,
  updateProfileVisibilitySettings,
} from "@/app/api/me/profile/visibility/mock-service";

const MOCK_PROFILE: Omit<PublicProfileDTO, "publicUrl"> = {
  username: "gina",
  displayName: "Gina Urban",
  bio: "Remote product designer focused on fintech and collaboration tools.",
  avatarUrl: undefined,
  location: "Germany",
  timezone: "CET",
  links: {
    website: "https://gina.design",
    github: "https://github.com/gina",
    linkedin: "https://linkedin.com/in/gina",
  },
  badges: ["Remote Ready", "Top 10%"],
  stats: {
    savedJobs: 12,
    appliedJobs: 4,
  },
  updatedAt: "2026-02-10T00:00:00.000Z",
};

function hasText(value?: string | null) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasItems<T>(value?: T[] | null) {
  return Array.isArray(value) && value.length > 0;
}

export async function getPublicProfile(username: string) {
  const record = getPublicProfileRecord(username);

  if (!record) {
    return null;
  }

  const visibility = getProfileVisibilitySettings();
  const baseUrl = await getBaseUrl();
  const slug = resolvePublicProfileSlug(record.username);
  const website = hasText(record.links.website) ? record.links.website : undefined;
  const github = hasText(record.links.github) ? record.links.github : undefined;
  const linkedin = hasText(record.links.linkedin)
    ? record.links.linkedin
    : undefined;
  const bio = hasText(record.bio) ? record.bio : undefined;
  const avatarUrl = hasText(record.avatarUrl) ? record.avatarUrl : undefined;
  const location = hasText(record.location) ? record.location : undefined;
  const timezone = hasText(record.timezone) ? record.timezone : undefined;
  const skills = hasItems(record.skills) ? record.skills : undefined;
  const languages = hasItems(record.languages) ? record.languages : undefined;
  const portfolio = hasItems(record.portfolio) ? record.portfolio : undefined;
  const lastSeen = hasText(record.lastSeen) ? record.lastSeen : undefined;
  const availability = record.availability
    ? {
        availableForWork: record.availability.availableForWork,
        availableFrom: hasText(record.availability.availableFrom)
          ? record.availability.availableFrom
          : undefined,
        preferredTimezones: hasItems(record.availability.preferredTimezones)
          ? record.availability.preferredTimezones
          : undefined,
        minAnnualUsd: hasText(record.availability.minAnnualUsd)
          ? record.availability.minAnnualUsd
          : undefined,
        minHourlyUsd: hasText(record.availability.minHourlyUsd)
          ? record.availability.minHourlyUsd
          : undefined,
      }
    : undefined;

  const payload: PublicProfileDTO = {
    username: record.username,
    displayName: record.displayName,
    publicUrl: `${baseUrl}/u/${slug}`,
    bio: visibility.showBio ? bio : undefined,
    avatarUrl: visibility.showAvatar ? avatarUrl : undefined,
    location: visibility.showLocation ? location : undefined,
    timezone: visibility.showLocation ? timezone : undefined,
    skills: visibility.showSkills ? skills : undefined,
    languages: visibility.showLanguages ? languages : undefined,
    availability: visibility.showAvailability ? availability : undefined,
    lastSeen: visibility.showLastSeen ? lastSeen : undefined,
    portfolio: visibility.showPortfolio ? portfolio : undefined,
    links: {
      website: visibility.showWebsite ? website : undefined,
      github: visibility.showGithub ? github : undefined,
      linkedin: visibility.showLinkedin ? linkedin : undefined,
    },
    badges: record.badges,
    stats: record.stats,
    updatedAt: record.updatedAt,
  };

  return payload;
}

export async function getProfileByUsername(username: string) {
  if (username !== MOCK_PROFILE.username) {
    return null;
  }

  const baseUrl = await getBaseUrl();
  const publicUrl = `${baseUrl}/u/${MOCK_PROFILE.username}`;

  return {
    ...MOCK_PROFILE,
    publicUrl,
  };
}

export function getProfileEditor(): ProfileEditorDTO {
  return {
    basic: {
      bio: "Remote product designer focused on fintech and collaboration tools.",
      skills: ["Product Design", "Figma", "Design Systems"],
      languages: ["English", "German"],
    },
    identity: {
      displayName: "Gina Urban",
      username: "gina",
    },
    location: {
      currentCountry: "Germany",
      residencyCountry: "Germany",
      nationality: "Italian",
    },
    contact: {
      email: "gina@joobees.com",
      emailNotifications: true,
      preferredContact: "@gina",
    },
    links: {
      website: "https://gina.design",
      telegram: "https://t.me/gina",
      github: "https://github.com/gina",
      x: "https://x.com/gina",
      linkedin: "https://linkedin.com/in/gina",
      nomadList: "https://nomadlist.com/@gina",
      instagram: "https://instagram.com/gina",
    },
    availability: {
      availableForWork: true,
      availableFrom: "2026-02-15",
      preferredTimezones: ["CET", "GMT"],
      minAnnualUsd: "90000",
      minHourlyUsd: "60",
    },
    portfolio: {
      employment: [
        {
          id: "emp-1",
          title: "Senior Product Designer",
          organization: "Nimbus Labs",
          start: "2023",
          end: "Present",
          summary: "Led design systems and onboarding",
        },
      ],
      projects: [
        {
          id: "proj-1",
          title: "Remote onboarding",
          organization: "Joobees",
          start: "2024",
          end: "2025",
          summary: "Designed remote-first onboarding flows",
        },
      ],
      education: [
        {
          id: "edu-1",
          title: "BA Industrial Design",
          organization: "Politecnico di Milano",
          start: "2016",
          end: "2020",
          summary: "Product design and research",
        },
      ],
    },
    meta: {
      lastSeen: "2026-02-10",
      signedUp: "2024-05-02",
      badges: ["Remote Ready", "Top 10%"],
    },
    avatarUrl: null,
  };
}

export function updateProfileEditor(
  body: Partial<ProfileEditorDTO>,
): ProfileEditorDTO {
  return {
    basic: {
      bio:
        body.basic?.bio ??
        "Remote product designer focused on fintech and collaboration tools.",
      skills: body.basic?.skills ?? ["Product Design", "Figma", "Design Systems"],
      languages: body.basic?.languages ?? ["English", "German"],
    },
    identity: {
      displayName: body.identity?.displayName ?? "Gina Urban",
      username: "gina",
    },
    location: {
      currentCountry: body.location?.currentCountry ?? "Germany",
      residencyCountry: body.location?.residencyCountry ?? "Germany",
      nationality: body.location?.nationality ?? "Italian",
    },
    contact: {
      email: "gina@joobees.com",
      emailNotifications: body.contact?.emailNotifications ?? true,
      preferredContact: body.contact?.preferredContact ?? "@gina",
    },
    links: {
      website: body.links?.website ?? "https://gina.design",
      telegram: body.links?.telegram ?? "https://t.me/gina",
      github: body.links?.github ?? "https://github.com/gina",
      x: body.links?.x ?? "https://x.com/gina",
      linkedin: body.links?.linkedin ?? "https://linkedin.com/in/gina",
      nomadList: body.links?.nomadList ?? "https://nomadlist.com/@gina",
      instagram: body.links?.instagram ?? "https://instagram.com/gina",
    },
    availability: {
      availableForWork: body.availability?.availableForWork ?? true,
      availableFrom: body.availability?.availableFrom ?? "2026-02-15",
      preferredTimezones: body.availability?.preferredTimezones ?? ["CET", "GMT"],
      minAnnualUsd: body.availability?.minAnnualUsd ?? "90000",
      minHourlyUsd: body.availability?.minHourlyUsd ?? "60",
    },
    portfolio: {
      employment: body.portfolio?.employment ?? [],
      projects: body.portfolio?.projects ?? [],
      education: body.portfolio?.education ?? [],
    },
    meta: {
      lastSeen: "2026-02-10",
      signedUp: "2024-05-02",
      badges: ["Remote Ready", "Top 10%"],
    },
    avatarUrl: null,
  };
}

export function getProfileVisibility() {
  return getProfileVisibilitySettings();
}

export function updateProfileVisibility(patch: Partial<ProfileVisibilitySettings>) {
  return updateProfileVisibilitySettings(patch);
}

export function getAvatarUploadResult() {
  return {
    avatarUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop",
  };
}
