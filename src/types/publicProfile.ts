export interface PublicProfileDTO {
  username: string;
  displayName: string;
  publicUrl: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  timezone?: string;
  skills?: string[];
  languages?: string[];
  availability?: {
    availableForWork: boolean;
    availableFrom?: string;
    preferredTimezones?: string[];
    minAnnualUsd?: string;
    minHourlyUsd?: string;
  };
  lastSeen?: string;
  portfolio?: {
    employment?: {
      id: string;
      title: string;
      organization: string;
      start: string;
      end?: string;
      summary?: string;
    }[];
    education?: {
      id: string;
      title: string;
      organization: string;
      start: string;
      end?: string;
      summary?: string;
    }[];
  };
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
}
