import Link from "next/link";
import { notFound } from "next/navigation";
import { getBaseUrl } from "@/lib/getBaseUrl";
import type { JobDetailsDTO } from "@/types/jobDetails";
import { JobHero } from "@/components/job-details/JobHero";
import { JobMeta } from "@/components/job-details/JobMeta";
import { JobDescription } from "@/components/job-details/JobDescription";
import { JobTags } from "@/components/job-details/JobTags";
import { JobApplyCard } from "@/components/job-details/JobApplyCard";

async function getJobDetails(jobId: string): Promise<JobDetailsDTO | null> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/jobs/${jobId}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to load job details");
  }

  return res.json();
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const job = await getJobDetails(jobId);

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <Link
            href="/"
            className="text-sm text-[rgb(var(--muted))] transition hover:text-[rgb(var(--fg))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            ← Back to jobs
          </Link>
          <JobHero job={job} />
          <JobMeta job={job} />
          <JobTags job={job} />
          <JobDescription job={job} />
        </div>
        <div className="lg:pt-2">
          <JobApplyCard job={job} />
        </div>
      </section>
    </main>
  );
}
