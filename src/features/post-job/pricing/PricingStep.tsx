"use client";

import type { JobPricingOption } from "@/features/post-job/types";

type PricingStepProps = {
  options: JobPricingOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onSkip: () => void;
  onNext: () => void;
  onBack: () => void;
};

export function PricingStep({
  options,
  selectedIds,
  onToggle,
  onSkip,
  onNext,
  onBack,
}: PricingStepProps) {
  const total = options
    .filter((option) => selectedIds.includes(option.id))
    .reduce((sum, option) => sum + option.priceUsd, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.id)}
              className={`rounded-2xl border p-4 text-left transition ${
                isSelected
                  ? "border-blue-500/60 bg-blue-50"
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
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  ${option.priceUsd}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <span>Selected total</span>
        <span className="font-semibold">${total}</span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
        >
          Back
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSkip}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
