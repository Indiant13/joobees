export const SORT_OPTIONS = [
  { value: "latest", label: "Latest jobs" },
  { value: "highest_paid", label: "Highest paid" },
  { value: "most_viewed", label: "Most viewed" },
  { value: "most_applied", label: "Most applied" },
  { value: "hottest", label: "Hottest" },
  { value: "most_benefits", label: "Most benefits" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const SORT_VALUES = new Set<SortValue>(
  SORT_OPTIONS.map((option) => option.value),
);
