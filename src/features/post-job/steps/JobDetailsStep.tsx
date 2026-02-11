"use client";

import type { JobCategory, JobFormState, JobExperience } from "@/features/post-job/types";

type JobDetailsStepProps = {
  data: JobFormState;
  categories: JobCategory[];
  onChange: (value: Partial<JobFormState>) => void;
  onAddTag: (tag: string) => void;
};

const EXPERIENCE_LEVELS: JobExperience[] = ["Entry", "Mid", "Senior", "Lead"];

export function JobDetailsStep({
  data,
  categories,
  onChange,
  onAddTag,
}: JobDetailsStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Description
        </label>
        <textarea
          value={data.description}
          onChange={(event) => onChange({ description: event.target.value })}
          placeholder="What will this person do, and what impact will they have?"
          className="mt-2 min-h-[140px] w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Tags
        </label>
        <input
          type="text"
          value={data.tags}
          onChange={(event) => onChange({ tags: event.target.value })}
          placeholder="Design, Remote, Fintech"
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
        />
        {categories.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onAddTag(category.label)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              >
                {category.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Salary min (USD)
          </label>
          <input
            type="text"
            value={data.salaryMin}
            onChange={(event) => onChange({ salaryMin: event.target.value })}
            placeholder="60000"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Salary max (USD)
          </label>
          <input
            type="text"
            value={data.salaryMax}
            onChange={(event) => onChange({ salaryMax: event.target.value })}
            placeholder="90000"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Experience
        </label>
        <select
          value={data.experience}
          onChange={(event) =>
            onChange({ experience: event.target.value as JobExperience })
          }
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
        >
          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
