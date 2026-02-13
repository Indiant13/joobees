import { SearchBar } from "@/components/search-bar/SearchBar";
import { FilterBar } from "@/features/job-filters/FilterBar";
import { JobGrid } from "@/components/job-grid/JobGrid";
import { getBaseUrl } from "@/lib/getBaseUrl";
import type { SearchResultDTO } from "@/types/dto/SearchResultDTO";

type HomeQueryParams = {
  q?: string;
  sort?: string;
  profession?: string;
  professions?: string;
  languages?: string;
  spokenLanguages?: string;
  region?: string;
  regions?: string;
  country?: string;
  countries?: string;
  "custom-location"?: string;
  minSalary?: string;
  maxSalary?: string;
  benefits?: string;
};

async function getHomeData(
  paramsInput: HomeQueryParams,
): Promise<SearchResultDTO> {
  const baseUrl = await getBaseUrl();
  const params = new URLSearchParams();

  if (paramsInput.q?.trim()) {
    params.set("q", paramsInput.q.trim());
  }

  if (paramsInput.sort) {
    params.set("sort", paramsInput.sort);
  }

  if (paramsInput.profession) {
    params.set("profession", paramsInput.profession);
  }

  if (paramsInput.professions) {
    params.set("professions", paramsInput.professions);
  }

  if (paramsInput.languages) {
    params.set("languages", paramsInput.languages);
  }

  if (paramsInput.spokenLanguages) {
    params.set("spokenLanguages", paramsInput.spokenLanguages);
  }

  if (paramsInput.region) {
    params.set("region", paramsInput.region);
  }

  if (paramsInput.regions) {
    params.set("regions", paramsInput.regions);
  }

  if (paramsInput.country) {
    params.set("country", paramsInput.country);
  }

  if (paramsInput.countries) {
    params.set("countries", paramsInput.countries);
  }

  if (paramsInput["custom-location"]) {
    params.set("custom-location", paramsInput["custom-location"]);
  }

  if (paramsInput.minSalary) {
    params.set("minSalary", paramsInput.minSalary);
  }

  if (paramsInput.maxSalary) {
    params.set("maxSalary", paramsInput.maxSalary);
  }

  if (paramsInput.benefits) {
    params.set("benefits", paramsInput.benefits);
  }

  const res = await fetch(
    `${baseUrl}/api/search${params.toString() ? `?${params.toString()}` : ""}`,
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
  searchParams: Promise<HomeQueryParams>;
}) {
  const resolvedParams = await searchParams;
  const data = await getHomeData(resolvedParams);

  return (
    <main className="min-h-screen">
      <SearchBar
        placeholder="Search 2,000+ remote roles"
        hint="Try: Frontend, Product Design, React, Berlin"
      />
      <FilterBar />
      <JobGrid jobs={data.jobs} />
    </main>
  );
}
