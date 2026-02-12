import { describe, it, expect } from "vitest";
import { parseJobFilterQuery } from "@/lib/job-filters/parse";

describe("parseJobFilterQuery", () => {
  it("parses list and numeric filters", () => {
    const params = new URLSearchParams(
      "sort=highest_paid&profession=frontend-developer&languages=python,unknown&spokenLanguages=english,russian,unknown&region=europe&minSalary=100000&benefits=equity,async,unknown",
    );

    const result = parseJobFilterQuery(params);

    expect(result).toEqual({
      sort: "highest_paid",
      professions: ["frontend-developer"],
      languages: ["python"],
      spokenLanguages: ["english", "russian"],
      regions: ["europe"],
      countries: [],
      benefits: ["equity", "async"],
      minSalary: 100000,
      maxSalary: undefined,
    });
  });

  it("handles empty values", () => {
    const params = new URLSearchParams("");
    const result = parseJobFilterQuery(params);

    expect(result).toEqual({
      sort: undefined,
      professions: [],
      languages: [],
      spokenLanguages: [],
      regions: [],
      countries: [],
      benefits: [],
      minSalary: undefined,
      maxSalary: undefined,
    });
  });
});
