import type { JobDetailsDTO } from "@/types/jobDetails";

type JobMetaProps = {
  job: JobDetailsDTO;
};

export function JobMeta({ job }: JobMetaProps) {
  return (
    <section className="grid gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 text-sm text-[rgb(var(--muted))] sm:grid-cols-3">
      <div>
        <p className="text-xs uppercase tracking-[0.2em]">Salary</p>
        <p className="mt-1 text-[rgb(var(--fg))]">
          {job.salary ?? "Not disclosed"}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em]">Type</p>
        <p className="mt-1 text-[rgb(var(--fg))]">{job.employmentType}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em]">Seniority</p>
        <p className="mt-1 text-[rgb(var(--fg))]">{job.seniority}</p>
      </div>
    </section>
  );
}
