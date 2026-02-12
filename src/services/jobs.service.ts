import { getMockJobs } from "@/app/api/home/mock-services/job-service";
import { getMockCompanies } from "@/app/api/home/mock-services/company-service";
import { JOB_PRICING_OPTIONS } from "@/config/jobPricing";
import { formatJobPublishedAt } from "@/lib/formatJobPublishedAt";
import { isJobNew } from "@/lib/isJobNew";
import type { JobDTO } from "@/types/dto/JobDTO";
import type { JobDetailsDTO } from "@/types/jobDetails";
import type { JobCategory, JobPayload } from "@/features/post-job/types";
import {
  getEmployerJobById,
  getEmployerJobs,
} from "@/app/api/employer/mock-services/job-activity";

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract"];
const SENIORITY_LEVELS = ["Junior", "Mid", "Senior", "Lead"];

const CATEGORIES: JobCategory[] = [
  { id: "design", label: "Design" },
  { id: "product", label: "Product" },
  { id: "engineering", label: "Engineering" },
  { id: "marketing", label: "Marketing" },
  { id: "finance", label: "Finance" },
  { id: "operations", label: "Operations" },
];

function parseSalaryRange(salary?: string | null) {
  if (!salary) {
    return { min: undefined, max: undefined };
  }
  const numbers = salary.match(/\d+/g)?.map((value) => Number(value) * 1000) ?? [];
  if (numbers.length === 0) {
    return { min: undefined, max: undefined };
  }
  if (numbers.length === 1) {
    return { min: numbers[0], max: numbers[0] };
  }
  return {
    min: numbers[0],
    max: numbers[numbers.length - 1],
  };
}

function buildDescription(title: string, company: string, tags: string[]) {
  return `About the role
${company} is hiring a ${title} to join a remote-first team building thoughtful products. You'll collaborate with cross-functional partners, ship iteratively, and help define what great looks like.

What you'll do
• Own key initiatives end-to-end from discovery to launch.
• Collaborate with engineering, product, and design peers.
• Build scalable practices and document decisions.

What we're looking for
• Experience with ${tags.slice(0, 3).join(", ")}.
• Strong communication and stakeholder management.
• Comfort working across time zones in a remote environment.`;
}

function buildPromotions(index: number) {
  if (index % 7 === 0) {
    return ["featured", "highlight", "newsletter"];
  }
  if (index % 5 === 0) {
    return ["featured"];
  }
  if (index % 3 === 0) {
    return ["highlight"];
  }
  return [];
}

export function mapJobsToDTOs(
  jobs: ReturnType<typeof getMockJobs>,
  companies: ReturnType<typeof getMockCompanies>,
  rankedIds: string[],
): JobDTO[] {
  const companyMap = new Map(companies.map((company) => [company.id, company]));
  const jobMap = new Map(jobs.map((job) => [job.id, job]));

  const orderedJobs =
    rankedIds.length > 0
      ? rankedIds
          .map((id) => jobMap.get(id))
          .filter((job): job is NonNullable<typeof job> => job !== undefined)
      : jobs;

  return orderedJobs.map((job) => {
    const company = companyMap.get(job.companyId);
    const index = Number.parseInt(job.id.replace(/\D/g, ""), 10) || 0;
    const promotions = buildPromotions(index);
    const isHot = index % 9 === 0;
    const hasCompanyLogo = index % 4 === 0;
    const salaryRange = parseSalaryRange(job.salary);
    const recentBoost = isJobNew(job.postedAt) ? 20 : 0;
    const views = job.views ?? 0;
    const applies = job.applyCount ?? 0;

    return {
      id: job.id,
      title: job.title,
      company: company?.name ?? "Confidential",
      companyLogoUrl: company?.logoUrl ?? undefined,
      hasCompanyLogo,
      location: job.location,
      createdAt: job.postedAt,
      salaryMin: salaryRange.min,
      salaryMax: salaryRange.max,
      salaryLabel: job.salary ?? undefined,
      views,
      applies,
      hotScore: views * 0.4 + applies * 0.4 + recentBoost,
      tags: job.tags,
      benefits: job.benefits ?? undefined,
      postedLabel: formatJobPublishedAt(job.postedAt),
      isNew: isJobNew(job.postedAt),
      isHot,
      isFeatured: promotions.includes("featured"),
      isHighlighted: promotions.includes("highlight"),
    };
  });
}

export function getJobDetails(jobId: string): JobDetailsDTO | null {
  const jobs = getMockJobs();
  const job = jobs.find((item) => item.id === jobId);

  if (!job) {
    return null;
  }

  const company =
    getMockCompanies([job.companyId])[0]?.name ?? "Confidential";
  const numericId = Number.parseInt(jobId.replace(/\D/g, ""), 10) || 0;
  const employmentType =
    EMPLOYMENT_TYPES[numericId % EMPLOYMENT_TYPES.length];
  const seniority = SENIORITY_LEVELS[numericId % SENIORITY_LEVELS.length];
  const promotions = buildPromotions(numericId);

  return {
    id: job.id,
    title: job.title,
    company: {
      name: company,
      logoUrl: null,
    },
    location: job.location,
    salary: job.salary,
    employmentType,
    seniority,
    description: buildDescription(job.title, company, job.tags),
    tags: job.tags,
    applyUrl: `https://apply.joobees.com/${job.id}`,
    promotions: promotions.length > 0 ? promotions : undefined,
    shareCard: {
      company: {
        name: company,
        logoUrl: null,
      },
      shortUrl: `https://jb.ee/${job.id}`,
      qrCodeUrl: `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" fill="#ffffff"/><rect x="8" y="8" width="36" height="36" fill="#0f172a"/><rect x="84" y="8" width="36" height="36" fill="#0f172a"/><rect x="8" y="84" width="36" height="36" fill="#0f172a"/><rect x="52" y="52" width="24" height="24" fill="#0f172a"/><rect x="52" y="20" width="12" height="12" fill="#0f172a"/><rect x="64" y="68" width="12" height="12" fill="#0f172a"/><rect x="24" y="52" width="12" height="12" fill="#0f172a"/></svg>`,
      )}`,
      promoted: numericId % 3 === 0,
    },
  };
}

export function getJobCategories() {
  return CATEGORIES;
}

export function getJobPricing() {
  return JOB_PRICING_OPTIONS;
}

export function getEmployerOverview() {
  const jobs = getEmployerJobs();
  return {
    hasPostedJobs: jobs.length > 0,
    totalPostedJobs: jobs.length,
    reporting: {
      cadence: "weekly",
      nextReportAt: "2026-02-16T09:00:00.000Z",
    },
  };
}

export function getEmployerPostedJobs() {
  return getEmployerJobs();
}

export function getEmployerPostedJobDetails(jobId: string) {
  return getEmployerJobById(jobId);
}

export function submitJob(payload: JobPayload) {
  if (!payload?.title || !payload?.company?.name) {
    return {
      ok: false,
      error: "Missing required fields.",
    };
  }

  return {
    ok: true,
    data: {
      id: `job_${Date.now()}`,
      status: "submitted",
      pricingOptionIds: payload.pricingOptionIds ?? [],
      receivedAt: new Date().toISOString(),
    },
  };
}

export function createCompanyLogoUrl(filename: string) {
  const safeName = encodeURIComponent(filename);
  return `https://cdn.joobees.com/uploads/${Date.now()}-${safeName}`;
}
