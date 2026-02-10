import type { JobCategory } from "@/features/post-job/types";

const CATEGORIES: JobCategory[] = [
  { id: "design", label: "Design" },
  { id: "product", label: "Product" },
  { id: "engineering", label: "Engineering" },
  { id: "marketing", label: "Marketing" },
  { id: "finance", label: "Finance" },
  { id: "operations", label: "Operations" },
];

export async function GET() {
  return Response.json(CATEGORIES, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
