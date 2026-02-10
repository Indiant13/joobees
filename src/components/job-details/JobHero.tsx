import type { JobDetailsDTO } from "@/types/jobDetails";

type JobHeroProps = {
  job: JobDetailsDTO;
};

export function JobHero({ job }: JobHeroProps) {
  return (
    <section className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
        {job.company}
      </p>
      <h1 className="text-3xl font-semibold text-[rgb(var(--fg))] sm:text-4xl">
        {job.title}
      </h1>
      <p className="text-sm text-[rgb(var(--muted))]">{job.location}</p>
    </section>
  );
}
