import type { BenefitValue } from "@/features/job-search-filters/config/benefits";
import type { ProfessionValue } from "@/features/job-search-filters/config/professions";
import type {
  ProgrammingLanguageValue,
} from "@/features/job-search-filters/config/programmingLanguages";
import type {
  SpokenLanguageValue,
} from "@/features/job-search-filters/config/spokenLanguages";
import type { SortValue } from "@/features/job-sort/types/sort.types";

export type JobFilterState = {
  sort?: SortValue;
  professions: ProfessionValue[];
  languages: ProgrammingLanguageValue[];
  spokenLanguages: SpokenLanguageValue[];
  regions: string[];
  countries: string[];
  customLocation?: string;
  benefits: BenefitValue[];
  minSalary?: number;
  maxSalary?: number;
};
