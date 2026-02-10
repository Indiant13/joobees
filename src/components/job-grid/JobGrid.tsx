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
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
