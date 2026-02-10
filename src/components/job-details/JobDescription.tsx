import type { JobDetailsDTO } from "@/types/jobDetails";

type JobDescriptionProps = {
  job: JobDetailsDTO;
};

export function JobDescription({ job }: JobDescriptionProps) {
  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 text-sm text-[rgb(var(--fg))]">
      <h2 className="text-base font-semibold text-[rgb(var(--fg))]">
        Job description
      </h2>
      <p className="mt-3 whitespace-pre-line text-[rgb(var(--muted))]">
        {job.description}
      </p>
    </section>
  );
}
