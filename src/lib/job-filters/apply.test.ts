import { describe, it, expect } from "vitest";
import { applyJobFilters } from "@/lib/job-filters/apply";
import type { JobFilterState } from "@/lib/job-filters/types";

describe("applyJobFilters", () => {
  const jobs = [
    {
      id: "job-1",
      location: "Remote (Global)",
      salary: "$120k-$160k",
      profession: "frontend-developer",
      tags: ["TypeScript", "React"],
      spokenLanguages: ["english", "russian"],
      region: "Europe",
      country: "Germany",
      benefits: ["equity", "medical-insurance"],
    },
    {
      id: "job-2",
      location: "Remote (North America)",
      salary: "$90k-$120k",
      profession: "backend-developer",
      tags: ["Python", "SQL"],
      spokenLanguages: ["english"],
      region: "North America",
      country: "United States",
      benefits: ["flexible-hours"],
    },
  ];

  it("filters by region and salary", () => {
    const filters: JobFilterState = {
      professions: [],
      languages: [],
      spokenLanguages: [],
      regions: ["europe"],
      countries: [],
      benefits: [],
      minSalary: 110000,
      maxSalary: undefined,
    };

    const result = applyJobFilters(jobs, filters);

    expect(result.map((job) => job.id)).toEqual(["job-1"]);
  });

  it("filters by benefits with AND logic", () => {
    const filters: JobFilterState = {
      professions: ["frontend-developer"],
      languages: [],
      spokenLanguages: [],
      regions: [],
      countries: [],
      benefits: ["equity", "medical-insurance"],
      minSalary: undefined,
      maxSalary: undefined,
    };

    const result = applyJobFilters(jobs, filters);

    expect(result.map((job) => job.id)).toEqual(["job-1"]);
  });

  it("uses OR logic within professions", () => {
    const filters: JobFilterState = {
      professions: ["frontend-developer", "backend-developer"],
      languages: [],
      spokenLanguages: [],
      regions: [],
      countries: [],
      benefits: [],
      minSalary: undefined,
      maxSalary: undefined,
    };

    const result = applyJobFilters(jobs, filters);

    expect(result.map((job) => job.id)).toEqual(["job-1", "job-2"]);
  });

  it("filters by programming language using tags", () => {
    const filters: JobFilterState = {
      professions: [],
      languages: ["python"],
      spokenLanguages: [],
      regions: [],
      countries: [],
      benefits: [],
      minSalary: undefined,
      maxSalary: undefined,
    };

    const result = applyJobFilters(jobs, filters);

    expect(result.map((job) => job.id)).toEqual(["job-2"]);
  });

  it("filters by spoken language using OR logic", () => {
    const filters: JobFilterState = {
      professions: [],
      languages: [],
      spokenLanguages: ["russian", "urdu"],
      regions: [],
      countries: [],
      benefits: [],
      minSalary: undefined,
      maxSalary: undefined,
    };

    const result = applyJobFilters(jobs, filters);

    expect(result.map((job) => job.id)).toEqual(["job-1"]);
  });
});
