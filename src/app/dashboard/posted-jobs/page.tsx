import Link from "next/link";
import { getBaseUrl } from "@/lib/getBaseUrl";
import type { EmployerPostedJobsDTO } from "@/types/employerPostedJobs";
import { cookies } from "next/headers";

async function getPostedJobs(): Promise<EmployerPostedJobsDTO> {
  const baseUrl = await getBaseUrl();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const res = await fetch(`${baseUrl}/api/employer/posted-jobs`, {
    cache: "no-store",
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });

  if (!res.ok) {
    throw new Error("Failed to load posted jobs");
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

export default async function PostedJobsPage() {
  const data = await getPostedJobs();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--fg))]">
          Posted jobs
        </h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Performance overview for your published roles.
        </p>
      </div>
      <div className="grid gap-4">
        {data.jobs.map((job) => (
          <Link
            key={job.id}
            href={`/dashboard/posted-jobs/${job.id}`}
            className="rounded-2xl border border-[rgb(var(--border))] p-4 transition hover:border-blue-500/40 hover:bg-blue-50/20"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
                  {job.status}
                </p>
                <h2 className="text-lg font-semibold text-[rgb(var(--fg))]">
                  {job.title}
                </h2>
                <p className="text-sm text-[rgb(var(--muted))]">
                  Posted {formatDate(job.postedAt)}
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-[rgb(var(--muted))]">
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.2em]">Views</p>
                  <p className="text-base font-semibold text-[rgb(var(--fg))]">
                    {job.views}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.2em]">Applies</p>
                  <p className="text-base font-semibold text-[rgb(var(--fg))]">
                    {job.applies}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
