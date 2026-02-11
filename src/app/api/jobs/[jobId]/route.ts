import type { JobDetailsDTO } from "@/types/jobDetails";
import { getMockJobs } from "@/app/api/home/mock-services/job-service";
import { getMockCompanies } from "@/app/api/home/mock-services/company-service";

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract"];
const SENIORITY_LEVELS = ["Junior", "Mid", "Senior", "Lead"];

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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const { jobId } = await params;
  const jobs = getMockJobs();
  const job = jobs.find((item) => item.id === jobId);

  if (!job) {
    return new Response(null, { status: 404 });
  }

  const company =
    getMockCompanies([job.companyId])[0]?.name ?? "Confidential";
  const numericId = Number.parseInt(jobId.replace(/\D/g, ""), 10) || 0;
  const employmentType =
    EMPLOYMENT_TYPES[numericId % EMPLOYMENT_TYPES.length];
  const seniority = SENIORITY_LEVELS[numericId % SENIORITY_LEVELS.length];

  const payload: JobDetailsDTO = {
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
    promotions:
      numericId % 7 === 0
        ? ["featured", "highlight", "newsletter"]
        : numericId % 5 === 0
          ? ["featured"]
          : numericId % 3 === 0
            ? ["highlight"]
            : undefined,
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

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
