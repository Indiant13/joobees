import Link from "next/link";
import { JobCard } from "@/components/JobCard";
import { JobGridEmpty } from "@/components/job-grid/JobGridEmpty";
import type { JobGridProps } from "@/components/job-grid/JobGrid.props";

export function JobGrid({ jobs }: JobGridProps) {
  if (jobs.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <JobGridEmpty />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block h-full rounded-2xl transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            aria-label={`${job.title} at ${job.company}`}
          >
            <JobCard job={job} />
          </Link>
        ))}
      </div>
    </section>
  );
}
