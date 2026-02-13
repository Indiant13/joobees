"use client";

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

export function parseFiltersFromSearchParams(
  params: URLSearchParams,
): JobFilterState {
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
  const spokenLanguages = parseList(params.get("spokenLanguages")).filter(
    (language): language is SpokenLanguageValue =>
      SPOKEN_LANGUAGE_VALUES.has(language as SpokenLanguageValue),
  );
  const regions = parseList(params.get("region") ?? params.get("regions"));
  const countries = parseList(params.get("country") ?? params.get("countries"));
  const customLocation = params.get("custom-location")?.trim().toLowerCase() || undefined;
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

export function filtersToSearchParams(
  filters: JobFilterState,
  baseParams: URLSearchParams,
) {
  const params = new URLSearchParams(baseParams.toString());
  const sort = filters.sort;
  const professions = filters.professions.map((profession) =>
    profession.toLowerCase(),
  );
  const languages = filters.languages.map((language) => language.toLowerCase());
  const spokenLanguages = filters.spokenLanguages.map((language) =>
    language.toLowerCase(),
  );
  const regions = filters.regions.map((region) => region.toLowerCase());
  const countries = filters.countries.map((country) => country.toLowerCase());
  const customLocation = filters.customLocation?.trim().toLowerCase();
  const benefits = filters.benefits.map((benefit) => benefit.toLowerCase());

  if (professions.length > 0) {
    params.set("profession", professions.join(","));
  } else {
    params.delete("profession");
    params.delete("professions");
  }

  if (languages.length > 0) {
    params.set("languages", languages.join(","));
  } else {
    params.delete("languages");
  }

  if (spokenLanguages.length > 0) {
    params.set("spokenLanguages", spokenLanguages.join(","));
  } else {
    params.delete("spokenLanguages");
  }

  if (regions.length > 0) {
    params.set("region", regions.join(","));
  } else {
    params.delete("region");
    params.delete("regions");
  }

  if (countries.length > 0) {
    params.set("country", countries.join(","));
  } else {
    params.delete("country");
    params.delete("countries");
  }

  if (customLocation) {
    params.set("custom-location", customLocation);
  } else {
    params.delete("custom-location");
  }

  if (benefits.length > 0) {
    params.set("benefits", benefits.join(","));
  } else {
    params.delete("benefits");
  }

  if (filters.minSalary) {
    params.set("minSalary", String(filters.minSalary));
  } else {
    params.delete("minSalary");
  }

  if (filters.maxSalary) {
    params.set("maxSalary", String(filters.maxSalary));
  } else {
    params.delete("maxSalary");
  }

  if (sort) {
    params.set("sort", sort);
  } else {
    params.delete("sort");
  }

  return params;
}
