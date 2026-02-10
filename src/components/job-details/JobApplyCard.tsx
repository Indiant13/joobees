import type { JobDetailsDTO } from "@/types/jobDetails";

type JobApplyCardProps = {
  job: JobDetailsDTO;
};

export function JobApplyCard({ job }: JobApplyCardProps) {
  return (
    <aside className="flex flex-col gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
      <h2 className="text-base font-semibold text-[rgb(var(--fg))]">
        Ready to apply?
      </h2>
      <p className="text-sm text-[rgb(var(--muted))]">
        Submit your application and start the conversation.
      </p>
      <a
        href={job.applyUrl}
        target="_blank"
        rel="noreferrer"
        className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Apply now
      </a>
      <button
        type="button"
        className="rounded-xl border border-[rgb(var(--border))] px-4 py-3 text-sm font-semibold text-[rgb(var(--muted))] transition hover:border-blue-500/40 hover:text-[rgb(var(--fg))]"
      >
        Save job
      </button>
    </aside>
  );
}
