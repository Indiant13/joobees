import type { JobFilterState } from "@/lib/job-filters/types";
import { BENEFIT_VALUES } from "@/features/job-search-filters/config/benefits";
import type { BenefitValue } from "@/features/job-search-filters/config/benefits";
import { PROFESSION_VALUES } from "@/features/job-search-filters/config/professions";
import type { ProfessionValue } from "@/features/job-search-filters/config/professions";
import { PROGRAMMING_LANGUAGE_VALUES } from "@/features/job-search-filters/config/programmingLanguages";
import type { ProgrammingLanguageValue } from "@/features/job-search-filters/config/programmingLanguages";
import { SPOKEN_LANGUAGE_VALUES } from "@/features/job-search-filters/config/spokenLanguages";
import type { SpokenLanguageValue } from "@/features/job-search-filters/config/spokenLanguages";
import { SORT_VALUES } from "@/features/job-sort/config/sortOptions";
import type { SortValue } from "@/features/job-sort/types/sort.types";

function parseList(value: string | null): string[] {
  if (!value) {
    return [];
  }
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.toLowerCase());
}

function parseNumber(value: string | null): number | undefined {
  if (!value) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export function parseJobFilterQuery(params: URLSearchParams): JobFilterState {
  const sortParam = params.get("sort");
  const sort: SortValue | undefined =
    sortParam && SORT_VALUES.has(sortParam as SortValue)
      ? (sortParam as SortValue)
      : undefined;
  const professions = parseList(
    params.get("profession") ?? params.get("professions"),
  ).filter((profession): profession is ProfessionValue =>
    PROFESSION_VALUES.has(profession as ProfessionValue),
  );
  const languages = parseList(params.get("languages")).filter(
    (language): language is ProgrammingLanguageValue =>
      PROGRAMMING_LANGUAGE_VALUES.has(language as ProgrammingLanguageValue),
  );
  const spokenLanguageList = parseList(params.get("spokenLanguages")).filter(
    (language): language is SpokenLanguageValue =>
      SPOKEN_LANGUAGE_VALUES.has(language as SpokenLanguageValue),
  );
  const spokenLanguages: SpokenLanguageValue[] = spokenLanguageList;
  const regions = parseList(params.get("region") ?? params.get("regions"));
  const countries = parseList(params.get("country") ?? params.get("countries"));
  const customLocation =
    params.get("custom-location")?.trim().toLowerCase() || undefined;
  const benefits = parseList(params.get("benefits")).filter(
    (benefit): benefit is BenefitValue =>
      BENEFIT_VALUES.has(benefit as BenefitValue),
  );
  const minSalary = parseNumber(params.get("minSalary"));
  const maxSalary = parseNumber(params.get("maxSalary"));

  return {
    sort,
    professions,
    languages,
    spokenLanguages,
    regions,
    countries,
    customLocation,
    benefits,
    minSalary,
    maxSalary,
  };
}
