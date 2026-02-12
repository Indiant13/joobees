export interface EmployerStatsDTO {
  hasPostedJobs: boolean;
  totalPostedJobs: number;
  reporting: {
    cadence: string;
    nextReportAt: string;
  };
}
