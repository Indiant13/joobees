export type JobDetailsDTO = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string | null;
  employmentType: string;
  seniority: string;
  description: string;
  tags: string[];
  applyUrl: string;
};
