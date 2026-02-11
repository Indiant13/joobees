export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type JobExperience = "Entry" | "Mid" | "Senior" | "Lead";

export type JobFormState = {
  title: string;
  companyName: string;
  companyLogoUrl: string;
  location: string;
  type: JobType;
  description: string;
  tags: string;
  salaryMin: string;
  salaryMax: string;
  experience: JobExperience;
};

export type JobPayload = {
  title: string;
  company: {
    name: string;
    logoUrl?: string;
  };
  location: string;
  type: JobType;
  description: string;
  tags: string[];
  salaryMin?: string;
  salaryMax?: string;
  experience: JobExperience;
  pricingOptionIds?: string[];
};

export type JobCategory = {
  id: string;
  label: string;
};

export type JobPricingOption = {
  id: JobPromotionKey;
  title: string;
  description: string;
  priceUsd: number;
};

export type JobPromotionKey =
  | "featured"
  | "urgent"
  | "newsletter"
  | "social"
  | "logo"
  | "hot";
