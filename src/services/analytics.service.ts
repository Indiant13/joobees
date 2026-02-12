import type { AdminOverviewDTO } from "@/types/adminOverview";
import type { AdminRevenueDTO } from "@/types/adminRevenue";
import type { DashboardOverviewDTO } from "@/types/dashboardOverview";

export function getAdminOverview(): AdminOverviewDTO {
  return {
    userMetrics: {
      totalUsers: 128450,
      activeUsers: 48210,
      newSignups: 1260,
    },
    jobMetrics: {
      activeJobs: 1840,
      recentJobs: 215,
      promotedJobs: 128,
    },
    revenueMetrics: {
      totalRevenue: 482300,
      mtdRevenue: 72650,
      last30DaysRevenue: 102400,
      currency: "USD",
    },
    trafficMetrics: {
      visits24h: 48200,
      visits7d: 311000,
    },
    alerts: [
      {
        id: "alert-1",
        title: "Job approval backlog",
        detail: "18 postings awaiting review for more than 24 hours.",
        level: "medium",
      },
      {
        id: "alert-2",
        title: "Payment retries spiking",
        detail: "Retry rate increased by 12% in the last 48 hours.",
        level: "high",
      },
      {
        id: "alert-3",
        title: "New enterprise inquiries",
        detail: "5 new enterprise leads captured today.",
        level: "low",
      },
    ],
  };
}

export function getAdminRevenue(): AdminRevenueDTO {
  return {
    currency: "USD",
    totals: {
      total: 482300,
      jobRevenue: 321500,
      userRevenue: 160800,
    },
    jobBreakdown: [
      { type: "Featured", amount: 152400 },
      { type: "Highlight", amount: 96400 },
      { type: "Newsletter", amount: 52700 },
      { type: "Global", amount: 20000 },
    ],
    userBreakdown: [
      { source: "Subscription", amount: 120300 },
      { source: "Profile boost", amount: 26800 },
      { source: "Premium support", amount: 13700 },
    ],
    timeline: [
      { label: "Aug", amount: 62000 },
      { label: "Sep", amount: 71000 },
      { label: "Oct", amount: 80200 },
      { label: "Nov", amount: 91500 },
      { label: "Dec", amount: 102600 },
      { label: "Jan", amount: 75300 },
    ],
  };
}

export function getDashboardOverview(): DashboardOverviewDTO {
  return {
    user: {
      name: "Gina Urban",
      headline: "Finish your profile to appear in more searches.",
    },
    completeness: {
      percent: 72,
      missingItems: [
        {
          id: "avatar",
          label: "Add a profile photo",
          ctaLabel: "Upload photo",
          href: "/dashboard/profile",
        },
        {
          id: "bio",
          label: "Write a short bio",
          ctaLabel: "Add bio",
          href: "/dashboard/profile",
        },
        {
          id: "portfolio",
          label: "Add a portfolio link",
          ctaLabel: "Add link",
          href: "/dashboard/portfolio",
        },
      ],
    },
  };
}

export function recordJobView() {
  return { status: "queued" };
}

export function recordJobApply() {
  return { status: "queued" };
}
