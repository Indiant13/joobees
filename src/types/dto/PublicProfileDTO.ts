import type { PortfolioItemDTO } from "@/types/dto/PortfolioItemDTO";

export interface PublicProfileDTO {
  username: string;
  displayName: string;
  publicUrl: string;
  bio?: string;
  avatarUrl?: string | null;
  location?: string | null;
  timezone?: string | null;
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
  portfolio?: PortfolioItemDTO[];
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
