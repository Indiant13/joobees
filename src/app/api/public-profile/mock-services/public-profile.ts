type PublicProfileRecord = {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl?: string | null;
  location?: string | null;
  timezone?: string | null;
  skills: string[];
  languages: string[];
  availability: {
    availableForWork: boolean;
    availableFrom?: string;
    preferredTimezones?: string[];
    minAnnualUsd?: string;
    minHourlyUsd?: string;
  };
  lastSeen: string;
  portfolio: {
    id: string;
    url: string;
    description: string;
    createdAt: string;
  }[];
  links: {
    website?: string;
    github?: string;
    linkedin?: string;
  };
  badges: string[];
  stats: {
    savedJobs: number;
    appliedJobs: number;
  };
  updatedAt: string;
};

const PROFILES: PublicProfileRecord[] = [
  {
    username: "gina",
    displayName: "Gina Urban",
    bio: "Remote product designer focused on fintech and collaboration tools.",
    avatarUrl: null,
    location: "Germany",
    timezone: "CET",
    skills: ["Product Design", "Design Systems", "Research"],
    languages: ["English", "German"],
    availability: {
      availableForWork: true,
      availableFrom: "2026-03-01",
      preferredTimezones: ["CET", "GMT"],
      minAnnualUsd: "90000",
      minHourlyUsd: "60",
    },
    lastSeen: "2026-02-10T18:30:00.000Z",
    portfolio: [],
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
  },
];

export function getPublicProfileRecord(username: string) {
  return PROFILES.find((profile) => profile.username === username) ?? null;
}
