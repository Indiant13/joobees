import { getMockCompanies } from "@/app/api/home/mock-services/company-service";
import { getMockJobs } from "@/app/api/home/mock-services/job-service";
import type { SavedJobDTO } from "@/types/dto/SavedJobDTO";

const userSavedJobs = new Map<string, SavedJobDTO[]>();

function getSavedJobsStore(userId: string): SavedJobDTO[] {
  if (!userSavedJobs.has(userId)) {
    userSavedJobs.set(userId, []);
  }
  return userSavedJobs.get(userId) ?? [];
}

function createSavedJobDTO(jobId: string): Omit<SavedJobDTO, "id" | "savedAt"> | null {
  const jobs = getMockJobs();
  const job = jobs.find((item) => item.id === jobId);

  if (!job) {
    return null;
  }

  const company = getMockCompanies([job.companyId])[0];

  return {
    jobId: job.id,
    title: job.title,
    company: company?.name ?? "Confidential",
    location: job.location,
    salary: job.salary ?? undefined,
  };
}

export function saveJob(userId: string, jobId: string): SavedJobDTO | null {
  const savedJobs = getSavedJobsStore(userId);
  const existing = savedJobs.find((item) => item.jobId === jobId);

  if (existing) {
    return existing;
  }

  const baseDTO = createSavedJobDTO(jobId);

  if (!baseDTO) {
    return null;
  }

  const savedJob: SavedJobDTO = {
    ...baseDTO,
    id: `saved_${userId}_${jobId}`,
    savedAt: new Date().toISOString(),
  };

  savedJobs.unshift(savedJob);
  userSavedJobs.set(userId, savedJobs);

  return savedJob;
}

export function removeSavedJob(userId: string, jobId: string): boolean {
  const savedJobs = getSavedJobsStore(userId);
  const nextJobs = savedJobs.filter((item) => item.jobId !== jobId);
  const removed = nextJobs.length !== savedJobs.length;

  userSavedJobs.set(userId, nextJobs);

  return removed;
}

export function getSavedJobs(userId: string): SavedJobDTO[] {
  const savedJobs = getSavedJobsStore(userId);
  return [...savedJobs];
}
