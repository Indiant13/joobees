import { SearchBar } from "@/components/search-bar/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { JobGrid } from "@/components/job-grid/JobGrid";
import { getBaseUrl } from "@/lib/getBaseUrl";
import type { HomePageResponse } from "@/types/homePage";

async function getHomeData(query: string): Promise<HomePageResponse> {
  const baseUrl = await getBaseUrl();
  const params = new URLSearchParams();

  if (query.trim().length > 0) {
    params.set("q", query);
  }

  const res = await fetch(
    `${baseUrl}/api/home${params.toString() ? `?${params.toString()}` : ""}`,
    {
    cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to load home data");
  }

  return res.json();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const data = await getHomeData(resolvedParams.q ?? "");

  return (
    <main className="min-h-screen">
      <SearchBar
        placeholder="Search 2,000+ remote roles"
        hint="Try: Frontend, Product Design, React, Berlin"
      />
      <FilterBar filters={data.filters} featuredTags={data.featuredTags} />
      <JobGrid jobs={data.jobs} />
    </main>
  );
}
