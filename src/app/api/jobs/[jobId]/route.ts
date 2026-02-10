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
    company,
    location: job.location,
    salary: job.salary,
    employmentType,
    seniority,
    description: buildDescription(job.title, company, job.tags),
    tags: job.tags,
    applyUrl: `https://apply.joobees.com/${job.id}`,
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
