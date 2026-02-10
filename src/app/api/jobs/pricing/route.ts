import type { JobPricingOption } from "@/features/post-job/types";

const OPTIONS: JobPricingOption[] = [
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
];

export async function GET() {
  return Response.json(OPTIONS, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
