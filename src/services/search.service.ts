import { getMockJobs } from "@/app/api/home/mock-services/job-service";
import { getMockCompanies } from "@/app/api/home/mock-services/company-service";
import { getMockSearchResult } from "@/app/api/home/mock-services/search-service";
import { applyJobFilters } from "@/lib/job-filters/apply";
import { mapJobsToDTOs } from "@/services/jobs.service";
import type { JobFilterState } from "@/lib/job-filters/types";
import type { SearchResultDTO } from "@/types/dto/SearchResultDTO";
import type { SearchFiltersDTO } from "@/types/dto/SearchFiltersDTO";
import type { SortValue } from "@/features/job-sort/types/sort.types";
import type { JobDTO } from "@/types/dto/JobDTO";

const MOCK_LABELS: Record<string, string> = {
  "filters.all": "All",
  "filters.fullTime": "Full-time",
  "filters.contract": "Contract",
  "filters.senior": "Senior",
  "filters.new": "New",
};

function getRecentBoost(createdAt?: string) {
  if (!createdAt) {
    return 0;
  }
  const postedTime = Date.parse(createdAt);
  if (Number.isNaN(postedTime)) {
    return 0;
  }
  const hoursSince = (Date.now() - postedTime) / (1000 * 60 * 60);
  return hoursSince < 48 ? 20 : 0;
}

export function applySorting(jobs: JobDTO[], sort?: string): JobDTO[] {
  const normalizedSort = (sort as SortValue | undefined) ?? "latest";
  const sorted = [...jobs];

  switch (normalizedSort) {
    case "highest_paid": {
      sorted.sort((a, b) => (b.salaryMax ?? -Infinity) - (a.salaryMax ?? -Infinity));
      return sorted;
    }
    case "most_viewed": {
      sorted.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
      return sorted;
    }
    case "most_applied": {
      sorted.sort((a, b) => (b.applies ?? 0) - (a.applies ?? 0));
      return sorted;
    }
    case "most_benefits": {
      sorted.sort(
        (a, b) => (b.benefits?.length ?? 0) - (a.benefits?.length ?? 0),
      );
      return sorted;
    }
    case "hottest": {
      sorted.sort((a, b) => {
        const aScore = a.hotScore ?? (a.views ?? 0) * 0.4 + (a.applies ?? 0) * 0.4 + getRecentBoost(a.createdAt);
        const bScore = b.hotScore ?? (b.views ?? 0) * 0.4 + (b.applies ?? 0) * 0.4 + getRecentBoost(b.createdAt);
        return bScore - aScore;
      });
      return sorted;
    }
    case "latest":
    default: {
      sorted.sort((a, b) => Date.parse(b.createdAt ?? "") - Date.parse(a.createdAt ?? ""));
      return sorted;
    }
  }
}

function normalizeToken(value: string) {
  return value.trim().toLowerCase();
}

function getLocationAwareFilters(
  filters: JobFilterState & SearchFiltersDTO,
): JobFilterState {
  const customLocation = filters.customLocation
    ? normalizeToken(filters.customLocation)
    : "";
  const mergedCountries = customLocation
    ? Array.from(
        new Set([...filters.countries.map(normalizeToken), customLocation]),
      )
    : filters.countries;

  return {
    ...filters,
    countries: mergedCountries,
    customLocation: customLocation || undefined,
  };
}

export function searchJobs(
  query: string,
  filters: JobFilterState & SearchFiltersDTO,
): SearchResultDTO {
  const jobs = getMockJobs();
  const effectiveFilters = getLocationAwareFilters(filters);
  const filteredJobs = applyJobFilters(jobs, effectiveFilters);
  const sort = effectiveFilters.sort;
  const companies = getMockCompanies(filteredJobs.map((job) => job.companyId));
  const search = getMockSearchResult(
    filteredJobs.map((job) => ({ id: job.id, title: job.title, tags: job.tags })),
    query,
  );
  const hasQuery = query.trim().length > 0;
  const rankedIdSet = new Set(search.rankedJobIds);
  const queryScopedJobs = hasQuery
    ? filteredJobs.filter((job) => rankedIdSet.has(job.id))
    : filteredJobs;
  const mappedJobs = mapJobsToDTOs(
    queryScopedJobs,
    companies,
    hasQuery ? search.rankedJobIds : queryScopedJobs.map((job) => job.id),
  );
  const sortedJobs = applySorting(mappedJobs, sort);

  return {
    locale: "en-US",
    sort,
    featuredTags: search.featuredTags,
    filters: search.filters.map((filter) => ({
      label: MOCK_LABELS[filter.labelKey] ?? filter.labelKey,
      value: filter.value,
    })),
    jobs: sortedJobs,
    meta: {
      partial: false,
      warnings: [],
      generatedAt: new Date().toISOString(),
    },
  };
}
