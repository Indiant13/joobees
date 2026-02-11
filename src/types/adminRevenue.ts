export type AdminRevenueDTO = {
  currency: string;
  totals: {
    total: number;
    jobRevenue: number;
    userRevenue: number;
  };
  jobBreakdown: {
    type: string;
    amount: number;
  }[];
  userBreakdown: {
    source: string;
    amount: number;
  }[];
  timeline: {
    label: string;
    amount: number;
  }[];
};
