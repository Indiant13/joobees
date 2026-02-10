import type { JobDetailsDTO } from "@/types/jobDetails";

type JobTagsProps = {
  job: JobDetailsDTO;
};

export function JobTags({ job }: JobTagsProps) {
  if (job.tags.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-wrap gap-2">
      {job.tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-[rgb(var(--border))] px-3 py-1 text-xs text-[rgb(var(--muted))]"
        >
          {tag}
        </span>
      ))}
    </section>
  );
}
