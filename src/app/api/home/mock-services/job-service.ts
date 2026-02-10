type JobServiceJob = {
  id: string;
  title: string;
  companyId: string;
  location: string;
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
    salary: SALARIES[index % SALARIES.length] ?? null,
    tags: TAGS[index % TAGS.length],
    postedAt: addDays(baseDate, -index),
  }));
}
