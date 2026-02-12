export interface JobDTO {
  id: string;
  title: string;
  company: string;
  companyLogoUrl?: string;
  hasCompanyLogo: boolean;
  location: string;
  createdAt?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryLabel?: string;
  views?: number;
  applies?: number;
  hotScore?: number;
  tags: string[];
  benefits?: string[];
  postedLabel: string;
  isNew: boolean;
  isHot: boolean;
  isFeatured: boolean;
  isHighlighted: boolean;
}
