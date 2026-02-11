export type EmployerPostedJobSummaryDTO = {
  id: string;
  title: string;
  status: "active" | "paused" | "closed";
  postedAt: string;
  views: number;
  applies: number;
};

export type EmployerPostedJobsDTO = {
  jobs: EmployerPostedJobSummaryDTO[];
};

export type EmployerApplicantDTO = {
  id: string;
  name: string;
  username: string;
  headline: string;
  avatarUrl?: string | null;
  age?: number | null;
  country?: string | null;
};

export type JobApplicantsPreviewDTO = {
  applicants: EmployerApplicantDTO[];
};

export type EmployerPostedJobDetailsDTO = {
  id: string;
  title: string;
  status: "active" | "paused" | "closed";
  postedAt: string;
  views: number;
  applies: number;
  applicantsPreview: JobApplicantsPreviewDTO;
};
