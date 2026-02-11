"use client";

import type { JobPricingOption } from "@/features/post-job/types";

type PricingStepProps = {
  options: JobPricingOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

const VALUE_BADGES: Record<string, string[]> = {
  featured: ["x3 visibility", "Best value"],
  urgent: ["x2 faster responses"],
  newsletter: ["+34% trust"],
  social: ["Best value"],
  logo: ["+34% trust"],
  hot: ["x2 faster responses"],
};

export function PricingStep({
  options,
  selectedIds,
  onToggle,
}: PricingStepProps) {
  const total = options
    .filter((option) => selectedIds.includes(option.id))
    .reduce((sum, option) => sum + option.priceUsd, 0);
  const hasSelection = selectedIds.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          const badges = VALUE_BADGES[option.id] ?? [];
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.id)}
              className={`rounded-2xl border p-4 text-left transition ${
                isSelected
                  ? option.id === "hot"
                    ? "hot-job-border"
                    : "border-blue-500/60 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              aria-pressed={isSelected}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {option.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {option.description}
                  </p>
                  {badges.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {badges.map((badge) => {
                        const isHot = option.id === "hot";
                        const badgeTone = isHot
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-blue-200 bg-blue-50 text-blue-700";
                        return (
                        <span
                          key={badge}
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${badgeTone}`}
                        >
                          {badge}
                        </span>
                      );
                      })}
                    </div>
                  ) : null}
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  ${option.priceUsd}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-slate-500">
        Promoted jobs on Joobees receive up to 3× more views and get hired
        faster.
      </p>
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <span>Selected total</span>
        <span className="font-semibold">${total}</span>
      </div>
      {hasSelection ? (
        <p className="text-xs text-slate-500">
          Most employers choose at least one promotion.
        </p>
      ) : null}
    </div>
  );
}
