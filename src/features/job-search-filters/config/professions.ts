export const PROFESSIONS = [
  { value: "software-developer", label: "Software Developer" },
  { value: "frontend-developer", label: "Frontend Developer" },
  { value: "backend-developer", label: "Backend Developer" },
  { value: "full-stack-developer", label: "Full-Stack Developer" },
  { value: "mobile-developer", label: "Mobile Developer (iOS / Android)" },
  { value: "game-developer", label: "Game Developer" },
  { value: "data-analyst", label: "Data Analyst" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "machine-learning-engineer", label: "Machine Learning Engineer" },
  { value: "ai-engineer", label: "AI Engineer" },
  { value: "devops-engineer", label: "DevOps Engineer" },
  { value: "cloud-engineer", label: "Cloud Engineer" },
  { value: "cybersecurity-specialist", label: "Cybersecurity Specialist" },
  { value: "ethical-hacker", label: "Ethical Hacker (Pentester)" },
  { value: "network-engineer", label: "Network Engineer" },
  { value: "system-administrator", label: "System Administrator" },
  { value: "qa-engineer", label: "QA Engineer (Software Tester)" },
  { value: "ui-ux-designer", label: "UI/UX Designer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "project-manager", label: "Project Manager" },
] as const;

export type ProfessionValue = (typeof PROFESSIONS)[number]["value"];

export const PROFESSION_OPTIONS = PROFESSIONS.map((profession) => ({
  ...profession,
}));

export const PROFESSION_VALUES = new Set<ProfessionValue>(
  PROFESSIONS.map((profession) => profession.value),
);
