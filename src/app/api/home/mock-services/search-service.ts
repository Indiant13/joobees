type SearchServiceResponse = {
  featuredTags: string[];
  filters: { labelKey: string; value: string }[];
  rankedJobIds: string[];
};

const FEATURED_TAGS = [
  "Frontend",
  "Design",
  "Product",
  "Engineering",
  "AI",
  "Growth",
];

const FILTERS = [
  { labelKey: "filters.all", value: "all" },
  { labelKey: "filters.fullTime", value: "full-time" },
  { labelKey: "filters.contract", value: "contract" },
  { labelKey: "filters.senior", value: "senior" },
  { labelKey: "filters.new", value: "new" },
];

type SearchableJob = {
  id: string;
  title: string;
  tags: string[];
};

export function getMockSearchResult(
  jobs: SearchableJob[],
  query: string,
): SearchServiceResponse {
  const normalizedQuery = query.trim().toLowerCase();
  const scopedJobs =
    normalizedQuery.length > 0
      ? jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(normalizedQuery) ||
            job.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)),
        )
      : jobs;

  const rankedJobIds = [...scopedJobs].reverse().map((job) => job.id);

  return {
    featuredTags: FEATURED_TAGS,
    filters: FILTERS,
    rankedJobIds,
  };
}
