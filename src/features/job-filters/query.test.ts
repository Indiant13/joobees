import { describe, it, expect } from "vitest";
import { filtersToSearchParams } from "@/features/job-filters/query";

describe("filtersToSearchParams", () => {
  it("builds a profession query string", () => {
    const params = new URLSearchParams();

    const result = filtersToSearchParams(
      {
        sort: "latest",
        professions: ["frontend-developer", "backend-developer"],
        languages: ["python", "go"],
        spokenLanguages: ["english", "russian"],
        regions: [],
        countries: [],
        customLocation: "argentina",
        benefits: [],
        minSalary: undefined,
        maxSalary: undefined,
      },
      params,
    );

    expect(result.get("profession")).toBe(
      "frontend-developer,backend-developer",
    );
    expect(result.get("languages")).toBe("python,go");
    expect(result.get("spokenLanguages")).toBe("english,russian");
    expect(result.get("custom-location")).toBe("argentina");
    expect(result.get("sort")).toBe("latest");
  });

  it("includes a non-default sort", () => {
    const params = new URLSearchParams();

    const result = filtersToSearchParams(
      {
        sort: "highest_paid",
        professions: [],
        languages: [],
        spokenLanguages: [],
        regions: [],
        countries: [],
        customLocation: undefined,
        benefits: [],
        minSalary: undefined,
        maxSalary: undefined,
      },
      params,
    );

    expect(result.get("sort")).toBe("highest_paid");
  });
});
