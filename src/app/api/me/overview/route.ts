import type { DashboardOverviewDTO } from "@/types/dashboardOverview";

export async function GET() {
  const data: DashboardOverviewDTO = {
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

  return Response.json(data, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}
