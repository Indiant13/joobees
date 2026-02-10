import type { HomePageResponse, JobCardDTO } from "@/types/homePage";
import { getMockJobs } from "@/app/api/home/mock-services/job-service";
import { getMockCompanies } from "@/app/api/home/mock-services/company-service";
import { getMockSearchResult } from "@/app/api/home/mock-services/search-service";

const MOCK_LABELS: Record<string, string> = {
  "filters.all": "All",
  "filters.fullTime": "Full-time",
  "filters.contract": "Contract",
  "filters.senior": "Senior",
  "filters.new": "New",
};

function mapJobsToCards(
  jobs: ReturnType<typeof getMockJobs>,
  companies: ReturnType<typeof getMockCompanies>,
  rankedIds: string[],
): JobCardDTO[] {
  const companyMap = new Map(companies.map((company) => [company.id, company]));
  const jobMap = new Map(jobs.map((job) => [job.id, job]));

  const orderedJobs =
    rankedIds.length > 0
      ? rankedIds
          .map((id) => jobMap.get(id))
          .filter((job): job is NonNullable<typeof job> => job !== undefined)
      : jobs;

  return orderedJobs.map((job) => {
    const company = companyMap.get(job.companyId);

    return {
      id: job.id,
      title: job.title,
      company: company?.name ?? "Confidential",
      companyLogo: company?.logoUrl ?? undefined,
      location: job.location,
      salary: job.salary ?? undefined,
      tags: job.tags,
      postedAt: job.postedAt,
    };
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const jobs = getMockJobs();
  const companies = getMockCompanies(jobs.map((job) => job.companyId));
  const search = getMockSearchResult(
    jobs.map((job) => ({ id: job.id, title: job.title, tags: job.tags })),
    query,
  );

  const response: HomePageResponse = {
    locale: "en-US",
    featuredTags: search.featuredTags,
    filters: search.filters.map((filter) => ({
      label: MOCK_LABELS[filter.labelKey] ?? filter.labelKey,
      value: filter.value,
    })),
    jobs: mapJobsToCards(jobs, companies, search.rankedJobIds),
    meta: {
      partial: false,
      warnings: [],
      generatedAt: new Date().toISOString(),
    },
  };

  return Response.json(response, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
