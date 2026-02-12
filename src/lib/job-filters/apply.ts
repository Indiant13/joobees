import type { JobFilterState } from "@/lib/job-filters/types";

export type FilterableJob = {
  id: string;
  location: string;
  profession?: string | null;
  skills?: string[] | null;
  tags?: string[] | null;
  spokenLanguages?: string[] | null;
  salary?: string | null;
  benefits?: string[] | null;
  region?: string | null;
  country?: string | null;
};

type SalaryRange = {
  min: number | null;
  max: number | null;
};

function parseSalaryRange(salary?: string | null): SalaryRange {
  if (!salary) {
    return { min: null, max: null };
  }
  const numbers = salary.match(/\d+/g)?.map((value) => Number(value)) ?? [];
  if (numbers.length === 0) {
    return { min: null, max: null };
  }
  if (numbers.length === 1) {
    return { min: numbers[0] * 1000, max: numbers[0] * 1000 };
  }
  const [min, max] = numbers;
  return {
    min: min * 1000,
    max: max * 1000,
  };
}

function matchesSalary(
  salary: SalaryRange,
  minSalary?: number,
  maxSalary?: number,
) {
  if (!minSalary && !maxSalary) {
    return true;
  }
  if (salary.min === null || salary.max === null) {
    return false;
  }
  if (minSalary && salary.max < minSalary) {
    return false;
  }
  if (maxSalary && salary.min > maxSalary) {
    return false;
  }
  return true;
}

function normalizeToken(value: string) {
  return value.trim().toLowerCase();
}

function normalizeLanguageToken(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getLanguageAliases(value: string) {
  switch (value) {
    case "c-sharp":
      return ["c#", "c sharp", "csharp"];
    case "c-plus-plus":
      return ["c++", "cpp", "c plus plus"];
    case "go":
      return ["go", "golang"];
    case "visual-basic":
      return ["visual basic", "vb", "vba", "vb.net"];
    default:
      return [value];
  }
}

export function applyJobFilters<T extends FilterableJob>(
  jobs: T[],
  filters: JobFilterState,
): T[] {
  const professionSet = new Set(filters.professions.map(normalizeToken));
  const languageSet = new Set(filters.languages.map(normalizeToken));
  const spokenLanguageSet = new Set(
    filters.spokenLanguages.map(normalizeToken),
  );
  const regionSet = new Set(filters.regions.map(normalizeToken));
  const countrySet = new Set(filters.countries.map(normalizeToken));
  const benefitSet = new Set(filters.benefits.map(normalizeToken));

  return jobs.filter((job) => {
    const salary = parseSalaryRange(job.salary);

    if (!matchesSalary(salary, filters.minSalary, filters.maxSalary)) {
      return false;
    }

    if (professionSet.size > 0) {
      const profession = job.profession ? normalizeToken(job.profession) : "";
      if (!professionSet.has(profession)) {
        return false;
      }
    }

    if (languageSet.size > 0) {
      const rawTags = job.skills ?? job.tags ?? [];
      const normalizedTags = rawTags.map((tag) => normalizeLanguageToken(tag));
      const matchesLanguage = Array.from(languageSet).some((language) => {
        const aliases = getLanguageAliases(language).map(normalizeLanguageToken);
        return aliases.some((alias) =>
          normalizedTags.some(
            (tag) => tag === alias || tag.includes(alias),
          ),
        );
      });
      if (!matchesLanguage) {
        return false;
      }
    }

    if (spokenLanguageSet.size > 0) {
      const spoken = (job.spokenLanguages ?? []).map(normalizeToken);
      const matchesSpoken = Array.from(spokenLanguageSet).some((language) =>
        spoken.includes(language),
      );
      if (!matchesSpoken) {
        return false;
      }
    }

    if (regionSet.size > 0) {
      const region = job.region ? normalizeToken(job.region) : "";
      if (!regionSet.has(region)) {
        return false;
      }
    }

    if (countrySet.size > 0) {
      const country = job.country ? normalizeToken(job.country) : "";
      if (!countrySet.has(country)) {
        return false;
      }
    }

    if (benefitSet.size > 0) {
      const benefits = (job.benefits ?? []).map(normalizeToken);
      const hasAll = Array.from(benefitSet).every((benefit) =>
        benefits.includes(benefit),
      );
      if (!hasAll) {
        return false;
      }
    }

    return true;
  });
}
