export type DashboardOverviewDTO = {
  user: {
    name: string;
    headline: string;
  };
  completeness: {
    percent: number;
    missingItems: {
      id: string;
      label: string;
      ctaLabel: string;
      href: string;
    }[];
  };
};
