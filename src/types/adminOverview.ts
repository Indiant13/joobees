export type AdminOverviewDTO = {
  userMetrics: {
    totalUsers: number;
    activeUsers: number;
    newSignups: number;
  };
  jobMetrics: {
    activeJobs: number;
    recentJobs: number;
    promotedJobs: number;
  };
  revenueMetrics: {
    totalRevenue: number;
    mtdRevenue: number;
    last30DaysRevenue: number;
    currency: string;
  };
  trafficMetrics: {
    visits24h: number;
    visits7d: number;
  };
  alerts: {
    id: string;
    title: string;
    detail: string;
    level: "low" | "medium" | "high";
  }[];
};
