import type { JobDTO } from "@/types/dto/JobDTO";

export interface SearchResultDTO {
  locale: string;
  sort?: string;
  featuredTags: string[];
  filters: { label: string; value: string }[];
  jobs: JobDTO[];
  meta: {
    partial: boolean;
    warnings: string[];
    generatedAt: string;
  };
}
