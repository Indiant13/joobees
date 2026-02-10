import type { JobCardDTO } from "@/types/homePage";

export type JobCardProps = {
  job: JobCardDTO;
};

export function JobCard({ job }: JobCardProps) {
  const postedDate = new Date(job.postedAt);
  const postedLabel = Number.isNaN(postedDate.getTime())
    ? job.postedAt
    : new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(postedDate);

  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            {job.company}
          </p>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-[rgb(var(--muted))]">{job.location}</p>
        </div>
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={`${job.company} logo`}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[rgb(var(--border))] px-3 py-1 text-xs text-[rgb(var(--muted))]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between text-xs text-[rgb(var(--muted))]">
        <span>{postedLabel}</span>
        {job.salary ? <span className="font-semibold">{job.salary}</span> : null}
      </div>
    </article>
  );
}
