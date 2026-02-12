import { BENEFITS as BENEFIT_CONFIG } from "@/features/job-search-filters/config/benefits";
import {
  PROFESSIONS,
} from "@/features/job-search-filters/config/professions";
import { SPOKEN_LANGUAGES } from "@/features/job-search-filters/config/spokenLanguages";

type JobServiceJob = {
  id: string;
  title: string;
  companyId: string;
  location: string;
  region: string;
  country: string;
  benefits: string[];
  profession: string;
  skills: string[];
  spokenLanguages: string[];
  views: number;
  applyCount: number;
  salary?: string | null;
  tags: string[];
  postedAt: string;
};

const JOB_TITLES = [
  "Senior Frontend Engineer",
  "Product Designer",
  "Staff Platform Engineer",
  "AI Product Manager",
  "Growth Marketing Lead",
  "DevRel Engineer",
  "Backend Engineer",
  "Data Scientist",
  "UX Researcher",
  "Mobile Engineer",
  "QA Automation Lead",
  "Solutions Architect",
  "Technical Writer",
  "People Operations Manager",
  "Security Engineer",
  "Customer Success Lead",
  "Sales Engineer",
  "Product Analyst",
  "Engineering Manager",
  "ML Engineer",
];

const LOCATIONS = [
  "Remote (US/EU)",
  "Remote (Global)",
  "Remote (North America)",
  "Remote (LATAM)",
  "Remote (EMEA)",
  "Remote (APAC)",
];

const REGIONS = ["Global", "North America", "Europe", "LATAM", "APAC"];

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "Brazil",
  "Mexico",
  "Australia",
  "Japan",
  "India",
  "France",
];

const BENEFITS = BENEFIT_CONFIG.map((benefit) => benefit.value);
const PROFESSION_VALUES = PROFESSIONS.map((profession) => profession.value);
const SPOKEN_LANGUAGE_VALUES = SPOKEN_LANGUAGES.map((language) => language.value);

const TAGS = [
  ["React", "TypeScript", "Design Systems"],
  ["Figma", "Design", "UX"],
  ["Platform", "AWS", "Kubernetes"],
  ["AI", "Product", "Go-to-market"],
  ["Growth", "SEO", "Lifecycle"],
  ["Node.js", "APIs", "Microservices"],
  ["Python", "ML", "Pipelines"],
  ["iOS", "Swift", "Mobile"],
  ["QA", "Automation", "Cypress"],
  ["Security", "Zero Trust", "SOC2"],
];

const SALARIES = [
  "$110k-$150k",
  "$120k-$160k",
  "$130k-$170k",
  "$140k-$180k",
  "$150k-$190k",
  null,
];

function addDays(base: Date, days: number) {
  const copy = new Date(base);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy.toISOString();
}

export function getMockJobs(): JobServiceJob[] {
  const baseDate = new Date();

  return JOB_TITLES.map((title, index) => ({
    id: `job-${String(index + 1).padStart(3, "0")}`,
    title,
    companyId: `company-${(index % 12) + 1}`,
    location: LOCATIONS[index % LOCATIONS.length],
    region: REGIONS[index % REGIONS.length],
    country: COUNTRIES[index % COUNTRIES.length],
    benefits: BENEFITS.filter((_, benefitIndex) => benefitIndex % 3 === index % 3),
    skills: TAGS[index % TAGS.length],
    profession: PROFESSION_VALUES[index % PROFESSION_VALUES.length],
    spokenLanguages: SPOKEN_LANGUAGE_VALUES.filter(
      (_, languageIndex) => languageIndex % 4 === index % 4,
    ),
    views: 1200 - index * 37,
    applyCount: 80 - index * 3,
    salary: SALARIES[index % SALARIES.length] ?? null,
    tags: TAGS[index % TAGS.length],
    postedAt: addDays(baseDate, -index),
  }));
}
