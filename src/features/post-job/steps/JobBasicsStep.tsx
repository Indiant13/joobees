"use client";

import type { JobFormState, JobType } from "@/features/post-job/types";

type JobBasicsStepProps = {
  data: JobFormState;
  onChange: (value: Partial<JobFormState>) => void;
  onUploadLogo: (file: File) => void;
  onRemoveLogo: () => void;
  isUploading: boolean;
  onNext: () => void;
};

const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Contract", "Internship"];

export function JobBasicsStep({
  data,
  onChange,
  onUploadLogo,
  onRemoveLogo,
  isUploading,
  onNext,
}: JobBasicsStepProps) {
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
          value={data.companyName}
          onChange={(event) => onChange({ companyName: event.target.value })}
          placeholder="Joobees"
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Company logo (optional)
        </label>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {data.companyLogoUrl ? (
              <img
                src={data.companyLogoUrl}
                alt={`${data.companyName || "Company"} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                Logo
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800">
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    onUploadLogo(file);
                    event.currentTarget.value = "";
                  }
                }}
                disabled={isUploading}
              />
              {isUploading ? "Uploading..." : "Upload logo"}
            </label>
            {data.companyLogoUrl ? (
              <button
                type="button"
                onClick={onRemoveLogo}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          PNG or JPG, up to 2MB. Optional.
        </p>
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
