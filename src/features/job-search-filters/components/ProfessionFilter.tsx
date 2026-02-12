"use client";

import type { ReactNode } from "react";
import { PROFESSION_OPTIONS } from "@/features/job-search-filters/config/professions";
import type { ProfessionValue } from "@/features/job-search-filters/config/professions";

type ProfessionFilterProps = {
  isOpen: boolean;
  onToggle: () => void;
  selected: ProfessionValue[];
  onChange: (next: ProfessionValue[]) => void;
  onClose: () => void;
};

export function ProfessionFilter({
  isOpen,
  onToggle,
  selected,
  onChange,
  onClose,
}: ProfessionFilterProps) {
  return (
    <FilterDropdown
      label="Profession"
      count={selected.length}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <FilterSection title="Professions">
        <div className="max-h-56 overflow-y-auto pr-1">
          <div className="flex flex-col gap-2">
            {PROFESSION_OPTIONS.map((profession) => {
              const isChecked = selected.includes(profession.value);
              return (
                <CheckboxOption
                  key={profession.value}
                  label={profession.label}
                  checked={isChecked}
                  onToggle={() =>
                    onChange(
                      isChecked
                        ? selected.filter((value) => value !== profession.value)
                        : [...selected, profession.value],
                    )
                  }
                  onSelected={onClose}
                />
              );
            })}
          </div>
        </div>
      </FilterSection>
    </FilterDropdown>
  );
}

function FilterDropdown({
  label,
  count,
  children,
  isOpen,
  onToggle,
}: {
  label: string;
  count?: number;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
        aria-expanded={isOpen}
      >
        {label}
        {count ? (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
            {count}
          </span>
        ) : null}
      </button>
      {isOpen ? (
        <div className="absolute left-0 top-full z-30 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="flex flex-col gap-4">{children}</div>
        </div>
      ) : null}
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function CheckboxOption({
  label,
  checked,
  onToggle,
  onSelected,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  onSelected?: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          onToggle();
          onSelected?.();
        }}
      />
      <span>{label}</span>
    </label>
  );
}
