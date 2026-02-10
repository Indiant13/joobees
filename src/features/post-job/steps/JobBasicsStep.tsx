"use client";

import type { JobFormState, JobType } from "@/features/post-job/types";

type JobBasicsStepProps = {
  data: JobFormState;
  onChange: (value: Partial<JobFormState>) => void;
  onNext: () => void;
};

const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Contract", "Internship"];

export function JobBasicsStep({ data, onChange, onNext }: JobBasicsStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Job title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(event) => onChange({ title: event.target.value })}
          placeholder="Senior Product Designer"
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Company
        </label>
        <input
          type="text"
          value={data.company}
          onChange={(event) => onChange({ company: event.target.value })}
          placeholder="Joobees"
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Location
        </label>
        <input
          type="text"
          value={data.location}
          onChange={(event) => onChange({ location: event.target.value })}
          placeholder="Remote · Europe"
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Type
        </label>
        <select
          value={data.type}
          onChange={(event) =>
            onChange({ type: event.target.value as JobType })
          }
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
        >
          {JOB_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
