import Link from "next/link";
import { notFound } from "next/navigation";
import { getBaseUrl } from "@/lib/getBaseUrl";
import type { EmployerPostedJobDetailsDTO } from "@/types/employerPostedJobs";
import { ApplicantsGrid } from "@/components/employer/ApplicantsGrid";
import { cookies } from "next/headers";

async function getPostedJob(jobId: string): Promise<EmployerPostedJobDetailsDTO | null> {
  const baseUrl = await getBaseUrl();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const res = await fetch(`${baseUrl}/api/employer/posted-jobs/${jobId}`, {
    cache: "no-store",
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to load job details");
  }

  return res.json();
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export default async function PostedJobDetailsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const job = await getPostedJob(jobId);

  if (!job) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/dashboard/posted-jobs"
          className="text-sm text-[rgb(var(--muted))] transition hover:text-[rgb(var(--fg))]"
        >
          ← Back to posted jobs
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-[rgb(var(--fg))]">
          {job.title}
        </h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          {job.status} · Posted {formatDate(job.postedAt)}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[rgb(var(--border))] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Views
          </p>
          <p className="mt-2 text-2xl font-semibold text-[rgb(var(--fg))]">
            {job.views}
          </p>
        </div>
        <div className="rounded-2xl border border-[rgb(var(--border))] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Applies
          </p>
          <p className="mt-2 text-2xl font-semibold text-[rgb(var(--fg))]">
            {job.applies}
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-[rgb(var(--border))] p-4">
        <h2 className="text-base font-semibold text-[rgb(var(--fg))]">
          Applicants
        </h2>
        <div className="mt-4">
          <ApplicantsGrid data={job.applicantsPreview} />
        </div>
      </div>
    </div>
  );
}
