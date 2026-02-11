import type {
  EmployerPostedJobDetailsDTO,
  EmployerPostedJobSummaryDTO,
} from "@/types/employerPostedJobs";

const JOBS: EmployerPostedJobSummaryDTO[] = [
  {
    id: "job-101",
    title: "Senior Frontend Engineer",
    status: "active",
    postedAt: "2026-02-08T09:00:00.000Z",
    views: 1280,
    applies: 42,
  },
  {
    id: "job-102",
    title: "Product Designer",
    status: "active",
    postedAt: "2026-02-05T12:00:00.000Z",
    views: 980,
    applies: 28,
  },
  {
    id: "job-103",
    title: "Growth Marketing Lead",
    status: "paused",
    postedAt: "2026-01-29T15:30:00.000Z",
    views: 640,
    applies: 11,
  },
];

const APPLICANTS = [
  {
    id: "app-1",
    name: "Gina Urban",
    username: "gina",
    headline: "Product Designer · Remote-first",
    avatarUrl: null,
    birthYear: 1994,
    country: "Italy",
  },
  {
    id: "app-2",
    name: "Diego Rivera",
    username: "diego",
    headline: "Senior Frontend Engineer · React",
    avatarUrl: null,
    birthYear: 1991,
    country: "Spain",
  },
  {
    id: "app-3",
    name: "Ava Chen",
    username: "ava",
    headline: "Growth Marketer · Lifecycle",
    avatarUrl: null,
    birthYear: 1996,
    country: null,
  },
];

export function getEmployerJobs(): EmployerPostedJobSummaryDTO[] {
  return JOBS;
}

export function getEmployerJobById(
  jobId: string,
): EmployerPostedJobDetailsDTO | null {
  const job = JOBS.find((item) => item.id === jobId);
  if (!job) {
    return null;
  }

  return {
    ...job,
    applicantsPreview: {
      applicants: APPLICANTS.slice(
        0,
        Math.max(1, job.applies % APPLICANTS.length),
      ).map((applicant) => ({
        id: applicant.id,
        name: applicant.name,
        username: applicant.username,
        headline: applicant.headline,
        avatarUrl: applicant.avatarUrl,
        age: applicant.birthYear
          ? new Date().getFullYear() - applicant.birthYear
          : null,
        country: applicant.country,
      })),
    },
  };
}
