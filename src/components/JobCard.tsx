import type { JobCardDTO } from "@/types/homePage";
import { formatJobPublishedAt } from "@/lib/formatJobPublishedAt";
import { isJobNew } from "@/lib/isJobNew";
import { NewJobBadge } from "@/components/job-grid/NewJobBadge";

export type JobCardProps = {
  job: JobCardDTO;
};

export function JobCard({ job }: JobCardProps) {
  const promotions = job.promotions ?? [];
  const isFeatured = promotions.includes("featured");
  const isHighlighted = promotions.includes("highlight");
  const isHot = job.isHot === true;
  const logoUrl = job.companyLogoUrl ?? job.companyLogo;
  const showLogo = job.hasCompanyLogo === true && Boolean(logoUrl);
  const showNew = isJobNew(job.postedAt);
  const postedLabel = formatJobPublishedAt(job.postedAt);

  return (
    <article
      className={`flex h-full flex-col gap-4 rounded-2xl border bg-[rgb(var(--card))] p-5 shadow-sm transition ${
        isHighlighted
          ? "border-blue-500/50 bg-blue-50/40"
          : "border-[rgb(var(--border))]"
      } ${isHot ? "hot-job-border" : ""} relative`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            {job.company}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            {isFeatured ? (
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                Featured
              </span>
            ) : null}
          </div>
          <p className="text-sm text-[rgb(var(--muted))]">{job.location}</p>
        </div>
        {showLogo ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-white">
            <img
              src={logoUrl}
              alt={`${job.company} logo`}
              className="h-11 w-11 rounded-full object-cover"
            />
          </div>
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
        <div className="flex items-center gap-2">
          <span>{postedLabel}</span>
          {showNew ? <NewJobBadge /> : null}
        </div>
        {job.salary ? <span className="font-semibold">{job.salary}</span> : null}
      </div>
    </article>
  );
}
