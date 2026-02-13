"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { JobFilterState } from "@/lib/job-filters/types";
import { COUNTRY_OPTIONS, REGION_OPTIONS } from "@/features/job-filters/constants";
import { BENEFIT_OPTIONS } from "@/features/job-search-filters/config/benefits";
import { PROFESSION_OPTIONS } from "@/features/job-search-filters/config/professions";
import { PROGRAMMING_LANGUAGE_OPTIONS } from "@/features/job-search-filters/config/programmingLanguages";
import { SPOKEN_LANGUAGE_OPTIONS } from "@/features/job-search-filters/config/spokenLanguages";
import { SortControl } from "@/features/search/components/SortControl";
import { FilterPanel } from "@/features/search/components/filter-panel";
import {
  filtersToSearchParams,
  parseFiltersFromSearchParams,
} from "@/features/job-filters/query";

type Chip = {
  id: string;
  label: string;
  onRemove: () => void;
};

function formatSalaryValue(value?: number) {
  if (!value) {
    return "";
  }
  const rounded = Math.round(value / 1000);
  return `${rounded}k`;
}

function formatSalaryLabel(filters: JobFilterState) {
  if (!filters.minSalary && !filters.maxSalary) {
    return "";
  }
  if (filters.minSalary && !filters.maxSalary) {
    return `Salary: ${formatSalaryValue(filters.minSalary)}+`;
  }
  if (!filters.minSalary && filters.maxSalary) {
    return `Salary: up to ${formatSalaryValue(filters.maxSalary)}`;
  }
  return `Salary: ${formatSalaryValue(filters.minSalary)}-${formatSalaryValue(
    filters.maxSalary,
  )}`;
}

function sanitizeFilters(filters: JobFilterState): JobFilterState {
  return {
    professions: filters.professions,
    languages: filters.languages,
    spokenLanguages: filters.spokenLanguages,
    sort: filters.sort,
    regions: filters.regions,
    countries: filters.countries,
    customLocation: filters.customLocation,
    benefits: filters.benefits,
    minSalary: filters.minSalary,
    maxSalary: filters.maxSalary,
  };
}

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeFilters = useMemo(
    () => parseFiltersFromSearchParams(searchParams),
    [searchParams],
  );
  const selectedSort = activeFilters.sort;

  const regionMap = useMemo(
    () => new Map(REGION_OPTIONS.map((option) => [option.id, option.label])),
    [],
  );
  const countryMap = useMemo(
    () => new Map(COUNTRY_OPTIONS.map((option) => [option.id, option.label])),
    [],
  );
  const benefitMap = useMemo(
    () => new Map(BENEFIT_OPTIONS.map((option) => [option.value, option.label])),
    [],
  );
  const professionMap = useMemo(
    () =>
      new Map(PROFESSION_OPTIONS.map((option) => [option.value, option.label])),
    [],
  );
  const languageMap = useMemo(
    () =>
      new Map(
        PROGRAMMING_LANGUAGE_OPTIONS.map((option) => [
          option.value,
          option.label,
        ]),
      ),
    [],
  );
  const spokenLanguageMap = useMemo(
    () =>
      new Map(
        SPOKEN_LANGUAGE_OPTIONS.map((option) => [
          option.value,
          option.label,
        ]),
      ),
    [],
  );

  const chips = useMemo(() => {
    const items: Chip[] = [];

    activeFilters.professions.forEach((profession) => {
      items.push({
        id: `profession-${profession}`,
        label: `Profession: ${professionMap.get(profession) ?? profession}`,
        onRemove: () =>
          updateFilters({
            ...activeFilters,
            professions: activeFilters.professions.filter(
              (item) => item !== profession,
            ),
          }),
      });
    });

    activeFilters.languages.forEach((language) => {
      items.push({
        id: `language-${language}`,
        label: `Language: ${languageMap.get(language) ?? language}`,
        onRemove: () =>
          updateFilters({
            ...activeFilters,
            languages: activeFilters.languages.filter(
              (item) => item !== language,
            ),
          }),
      });
    });

    activeFilters.spokenLanguages.forEach((language) => {
      items.push({
        id: `spoken-language-${language}`,
        label: `Spoken: ${spokenLanguageMap.get(language) ?? language}`,
        onRemove: () =>
          updateFilters({
            ...activeFilters,
            spokenLanguages: activeFilters.spokenLanguages.filter(
              (item) => item !== language,
            ),
          }),
      });
    });

    activeFilters.regions.forEach((region) => {
      items.push({
        id: `region-${region}`,
        label: `Region: ${regionMap.get(region) ?? region}`,
        onRemove: () =>
          updateFilters({
            ...activeFilters,
            regions: activeFilters.regions.filter((item) => item !== region),
          }),
      });
    });

    activeFilters.countries.forEach((country) => {
      items.push({
        id: `country-${country}`,
        label: `Country: ${countryMap.get(country) ?? country}`,
        onRemove: () =>
          updateFilters({
            ...activeFilters,
            countries: activeFilters.countries.filter((item) => item !== country),
          }),
      });
    });

    if (activeFilters.customLocation) {
      items.push({
        id: "custom-location",
        label: `Other Country: ${activeFilters.customLocation}`,
        onRemove: () =>
          updateFilters({
            ...activeFilters,
            customLocation: undefined,
          }),
      });
    }

    if (activeFilters.minSalary || activeFilters.maxSalary) {
      items.push({
        id: "salary",
        label: formatSalaryLabel(activeFilters),
        onRemove: () =>
          updateFilters({
            ...activeFilters,
            minSalary: undefined,
            maxSalary: undefined,
          }),
      });
    }

    activeFilters.benefits.forEach((benefit) => {
      items.push({
        id: `benefit-${benefit}`,
        label: benefitMap.get(benefit) ?? benefit,
        onRemove: () =>
          updateFilters({
            ...activeFilters,
            benefits: activeFilters.benefits.filter((item) => item !== benefit),
          }),
      });
    });

    return items;
  }, [
    activeFilters,
    benefitMap,
    countryMap,
    languageMap,
    professionMap,
    regionMap,
    spokenLanguageMap,
  ]);

  const hasActiveFilters =
    chips.length > 0 ||
    activeFilters.professions.length > 0 ||
    activeFilters.languages.length > 0 ||
    activeFilters.spokenLanguages.length > 0 ||
    activeFilters.regions.length > 0 ||
    activeFilters.countries.length > 0 ||
    Boolean(activeFilters.customLocation) ||
    activeFilters.benefits.length > 0;

  function updateFilters(nextFilters: JobFilterState) {
    const sanitized = sanitizeFilters(nextFilters);
    const params = filtersToSearchParams(sanitized, searchParams);
    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <FilterPanel
              filters={activeFilters}
              onChange={updateFilters}
              hasActiveFilters={hasActiveFilters}
            />
            <div className="hidden md:flex md:items-center md:gap-2">
              <SortControl
                selectedSort={selectedSort}
                onChange={(next) =>
                  updateFilters({
                    ...activeFilters,
                    sort: next,
                  })
                }
                onClear={() =>
                  updateFilters({
                    ...activeFilters,
                    sort: undefined,
                  })
                }
              />
            </div>
            <div className="flex w-full flex-col gap-3 md:hidden">
              <div className="border-t border-slate-100 pt-3">
                <SortControl
                  selectedSort={activeFilters.sort}
                  onChange={(next) =>
                    updateFilters({
                      ...activeFilters,
                      sort: next,
                    })
                  }
                  onClear={() =>
                    updateFilters({
                      ...activeFilters,
                      sort: undefined,
                    })
                  }
                  className="w-full"
                  compact
                />
              </div>
            </div>
          </div>
          {chips.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={chip.onRemove}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
                >
                  {chip.label}
                  <span className="text-slate-400">x</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
