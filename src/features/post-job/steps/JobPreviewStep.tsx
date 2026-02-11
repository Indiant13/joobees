"use client";

import type { JobPayload } from "@/features/post-job/types";

type JobPreviewStepProps = {
  payload: JobPayload;
  pricingSummary?: {
    total: number;
    titles: string[];
  };
  error: string | null;
};

export function JobPreviewStep({
  payload,
  pricingSummary,
  error,
}: JobPreviewStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <h3 className="text-base font-semibold text-slate-900">
          {payload.title}
        </h3>
        <p className="mt-1 text-slate-600">
          {payload.company.name} · {payload.location} · {payload.type}
        </p>
        <p className="mt-3 whitespace-pre-wrap">{payload.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {payload.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 text-slate-600">
          Experience: {payload.experience}
        </p>
        {payload.salaryMin || payload.salaryMax ? (
          <p className="mt-1 text-slate-600">
            Salary: {payload.salaryMin || "—"} - {payload.salaryMax || "—"} USD
          </p>
        ) : null}
        {pricingSummary && pricingSummary.titles.length > 0 ? (
          <div className="mt-3">
            <p className="text-slate-600">Promotions:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {pricingSummary.titles.map((title) => (
                <li
                  key={title}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
                >
                  {title}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-slate-600">
              Promotion total: ${pricingSummary.total}
            </p>
          </div>
        ) : null}
      </div>
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
