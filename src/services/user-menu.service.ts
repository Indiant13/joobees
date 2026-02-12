import { getEmployerJobs } from "@/app/api/employer/mock-services/job-activity";
import { getSavedJobs } from "@/services/saved-jobs.service";
import type { UserMenuDTO } from "@/types/dto/UserMenuDTO";

export function getUserMenuState(userId: string): UserMenuDTO {
  const postedJobs = getEmployerJobs();
  const savedJobs = getSavedJobs(userId);

  return {
    hasPostedJobs: postedJobs.length > 0,
    hasSavedJobs: savedJobs.length > 0,
  };
}
