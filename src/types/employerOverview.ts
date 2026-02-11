export type EmployerOverviewDTO = {
  hasPostedJobs: boolean;
  totalPostedJobs: number;
  reporting: {
    cadence: "daily" | "weekly";
    nextReportAt: string;
  };
};
