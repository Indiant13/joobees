import type { JobPricingOption } from "@/features/post-job/types";

export const JOB_PRICING_OPTIONS: JobPricingOption[] = [
  {
    id: "featured",
    title: "Featured listing",
    description: "Boost visibility on the homepage for 7 days.",
    priceUsd: 199,
  },
  {
    id: "urgent",
    title: "Urgent badge",
    description: "Highlight the role as urgent in search results.",
    priceUsd: 99,
  },
  {
    id: "newsletter",
    title: "Newsletter slot",
    description: "Include in our weekly candidate newsletter.",
    priceUsd: 149,
  },
  {
    id: "social",
    title: "Social boost",
    description: "Promote across Joobees social channels.",
    priceUsd: 79,
  },
  {
    id: "logo",
    title: "Company logo",
    description: "Show your logo on the job card in the grid.",
    priceUsd: 30,
  },
  {
    id: "hot",
    title: "Hot job",
    description: "Subtle highlight for high-priority roles.",
    priceUsd: 199,
  },
];
