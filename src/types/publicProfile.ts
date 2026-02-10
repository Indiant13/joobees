export interface PublicProfileDTO {
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  timezone?: string;
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
