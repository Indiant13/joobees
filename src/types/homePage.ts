export interface JobCardDTO {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary?: string;
  tags: string[];
  postedAt: string;
}

export interface HomePageResponse {
  locale: string;
  featuredTags: string[];
  filters: { label: string; value: string }[];
  jobs: JobCardDTO[];
  meta: {
    partial: boolean;
    warnings: string[];
    generatedAt: string;
  };
}
