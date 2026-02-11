export interface JobCardDTO {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyLogoUrl?: string;
  hasCompanyLogo?: boolean;
  location: string;
  salary?: string;
  tags: string[];
  postedAt: string;
  promotions?: string[];
  isHot?: boolean;
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
