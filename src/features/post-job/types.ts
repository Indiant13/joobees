export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type JobExperience = "Entry" | "Mid" | "Senior" | "Lead";

export type JobBenefitValue =
  import("@/features/job-search-filters/config/benefits").BenefitValue;
export type JobProfessionValue =
  import("@/features/job-search-filters/config/professions").ProfessionValue;
export type JobProgrammingLanguageValue =
  import("@/features/job-search-filters/config/programmingLanguages").ProgrammingLanguageValue;
export type JobSpokenLanguageValue =
  import("@/features/job-search-filters/config/spokenLanguages").SpokenLanguageValue;

export type JobFormState = {
  title: string;
  companyName: string;
  companyLogoUrl: string;
  location: string;
  type: JobType;
  profession: JobProfessionValue;
  description: string;
  tags: string;
  salaryMin: string;
  salaryMax: string;
  experience: JobExperience;
  benefits: JobBenefitValue[];
  languages: JobProgrammingLanguageValue[];
  spokenLanguages: JobSpokenLanguageValue[];
};

export type JobPayload = {
  title: string;
  company: {
    name: string;
    logoUrl?: string;
  };
  location: string;
  type: JobType;
  profession: JobProfessionValue;
  description: string;
  tags: string[];
  benefits?: JobBenefitValue[];
  skills?: JobProgrammingLanguageValue[];
  skillsLanguages?: JobSpokenLanguageValue[];
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
