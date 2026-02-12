import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { searchJobs } from "@/services/search.service";
import { getMockJobs } from "@/app/api/home/mock-services/job-service";
import type { JobFilterState } from "@/lib/job-filters/types";

function getSalaryMax(salary?: string | null) {
  if (!salary) {
    return null;
  }
  const numbers = salary.match(/\d+/g)?.map((value) => Number(value)) ?? [];
  if (numbers.length === 0) {
    return null;
  }
  if (numbers.length === 1) {
    return numbers[0] * 1000;
  }
  return numbers[numbers.length - 1] * 1000;
}

function getRecentBoost(postedAt: string) {
  const postedTime = Date.parse(postedAt);
  if (Number.isNaN(postedTime)) {
    return 0;
  }
  const hoursSince = (Date.now() - postedTime) / (1000 * 60 * 60);
  return hoursSince < 48 ? 20 : 0;
}

const baseFilters: JobFilterState = {
  sort: undefined,
  professions: [],
  languages: [],
  spokenLanguages: [],
  regions: [],
  countries: [],
  benefits: [],
  minSalary: undefined,
  maxSalary: undefined,
};

describe("searchJobs sorting", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-11T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("defaults to latest", () => {
    const result = searchJobs("", baseFilters);
    expect(result.jobs[0]?.id).toBe("job-001");
  });

  it("sorts by highest paid", () => {
    const jobs = getMockJobs();
    const expected = [...jobs].sort((a, b) => {
      const aSalary = getSalaryMax(a.salary) ?? -Infinity;
      const bSalary = getSalaryMax(b.salary) ?? -Infinity;
      return bSalary - aSalary;
    })[0]?.id;

    const result = searchJobs("", { ...baseFilters, sort: "highest_paid" });
    expect(result.jobs[0]?.id).toBe(expected);
  });

  it("sorts by most viewed", () => {
    const jobs = getMockJobs();
    const expected = [...jobs].sort((a, b) => (b.views ?? 0) - (a.views ?? 0))[0]
      ?.id;

    const result = searchJobs("", { ...baseFilters, sort: "most_viewed" });
    expect(result.jobs[0]?.id).toBe(expected);
  });

  it("sorts by most applied", () => {
    const jobs = getMockJobs();
    const expected = [...jobs].sort(
      (a, b) => (b.applyCount ?? 0) - (a.applyCount ?? 0),
    )[0]?.id;

    const result = searchJobs("", { ...baseFilters, sort: "most_applied" });
    expect(result.jobs[0]?.id).toBe(expected);
  });

  it("sorts by most benefits", () => {
    const jobs = getMockJobs();
    const maxBenefits = Math.max(...jobs.map((job) => job.benefits.length));

    const result = searchJobs("", { ...baseFilters, sort: "most_benefits" });
    expect(result.jobs[0]?.benefits?.length).toBe(maxBenefits);
  });

  it("sorts by hottest", () => {
    const jobs = getMockJobs();
    const expected = [...jobs].sort((a, b) => {
      const aScore =
        (a.views ?? 0) * 0.4 +
        (a.applyCount ?? 0) * 0.4 +
        getRecentBoost(a.postedAt);
      const bScore =
        (b.views ?? 0) * 0.4 +
        (b.applyCount ?? 0) * 0.4 +
        getRecentBoost(b.postedAt);
      return bScore - aScore;
    })[0]?.id;

    const result = searchJobs("", { ...baseFilters, sort: "hottest" });
    expect(result.jobs[0]?.id).toBe(expected);
  });
});
