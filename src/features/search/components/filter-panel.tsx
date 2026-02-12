"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { JobFilterState } from "@/lib/job-filters/types";
import {
  COUNTRY_OPTIONS,
  REGION_OPTIONS,
  SALARY_PRESETS,
} from "@/features/job-filters/constants";
import { BENEFIT_OPTIONS } from "@/features/job-search-filters/config/benefits";
import { PROFESSION_OPTIONS } from "@/features/job-search-filters/config/professions";
import { ProfessionFilter } from "@/features/job-search-filters/components/ProfessionFilter";
import { ProgrammingLanguageFilter } from "@/features/job-search-filters/components/ProgrammingLanguageFilter";
import { PROGRAMMING_LANGUAGE_OPTIONS } from "@/features/job-search-filters/config/programmingLanguages";
import { SpokenLanguageFilter } from "@/features/job-search-filters/components/SpokenLanguageFilter";
import { SPOKEN_LANGUAGE_OPTIONS } from "@/features/job-search-filters/config/spokenLanguages";
import { MobileFilterModal } from "@/features/search/components/mobile-filter-modal";

type ActiveFilter =
  | "profession"
  | "language"
  | "spoken-language"
  | "location"
  | "salary"
  | "benefits"
  | null;

function toggleValue<T extends string>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

type FilterPanelProps = {
  filters: JobFilterState;
  onChange: (next: JobFilterState) => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
};

export function FilterPanel({
  filters,
  onChange,
  hasActiveFilters,
  onClearAll,
}: FilterPanelProps) {
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);
  const professionButtonRef = useRef<HTMLButtonElement | null>(null);
  const languageButtonRef = useRef<HTMLButtonElement | null>(null);
  const spokenLanguageButtonRef = useRef<HTMLButtonElement | null>(null);
  const locationButtonRef = useRef<HTMLButtonElement | null>(null);
  const salaryButtonRef = useRef<HTMLButtonElement | null>(null);
  const benefitsButtonRef = useRef<HTMLButtonElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(null);
  const [activeMobileFilter, setActiveMobileFilter] = useState<ActiveFilter>(null);

  useEffect(() => {
    if (!activeFilter) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (dropdownContainerRef.current && target) {
        if (!dropdownContainerRef.current.contains(target)) {
          setActiveFilter(null);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeFilter]);

  return (
    <>
      <div ref={dropdownContainerRef} className="hidden flex-wrap gap-2 md:flex">
        <ProfessionFilter
          isOpen={activeFilter === "profession"}
          onToggle={() =>
            setActiveFilter((prev) => (prev === "profession" ? null : "profession"))
          }
          selected={filters.professions}
          onChange={(next) =>
            onChange({
              ...filters,
              professions: next,
            })
          }
          onClose={() => setActiveFilter(null)}
        />
        <ProgrammingLanguageFilter
          isOpen={activeFilter === "language"}
          onToggle={() =>
            setActiveFilter((prev) => (prev === "language" ? null : "language"))
          }
          selected={filters.languages}
          onChange={(next) =>
            onChange({
              ...filters,
              languages: next,
            })
          }
          onClose={() => setActiveFilter(null)}
        />
        <SpokenLanguageFilter
          isOpen={activeFilter === "spoken-language"}
          onToggle={() =>
            setActiveFilter((prev) =>
              prev === "spoken-language" ? null : "spoken-language",
            )
          }
          selected={filters.spokenLanguages}
          onChange={(next) =>
            onChange({
              ...filters,
              spokenLanguages: next,
            })
          }
          onClose={() => setActiveFilter(null)}
        />
        <FilterDropdown
          label="Location"
          count={filters.regions.length + filters.countries.length}
          isOpen={activeFilter === "location"}
          onToggle={() =>
            setActiveFilter((prev) => (prev === "location" ? null : "location"))
          }
        >
          <FilterSection title="Regions">
            {REGION_OPTIONS.map((option) => (
              <CheckboxOption
                key={option.id}
                label={option.label}
                checked={filters.regions.includes(option.id)}
                onToggle={() =>
                  onChange({
                    ...filters,
                    regions: toggleValue(filters.regions, option.id),
                  })
                }
                onSelected={() => setActiveFilter(null)}
              />
            ))}
          </FilterSection>
          <FilterSection title="Countries">
            {COUNTRY_OPTIONS.map((option) => (
              <CheckboxOption
                key={option.id}
                label={option.label}
                checked={filters.countries.includes(option.id)}
                onToggle={() =>
                  onChange({
                    ...filters,
                    countries: toggleValue(filters.countries, option.id),
                  })
                }
                onSelected={() => setActiveFilter(null)}
              />
            ))}
          </FilterSection>
        </FilterDropdown>
        <FilterDropdown
          label="Salary"
          count={filters.minSalary || filters.maxSalary ? 1 : 0}
          isOpen={activeFilter === "salary"}
          onToggle={() =>
            setActiveFilter((prev) => (prev === "salary" ? null : "salary"))
          }
        >
          <FilterSection title="Presets">
            {SALARY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
                onClick={() => {
                  onChange({
                    ...filters,
                    minSalary: preset.min,
                    maxSalary: undefined,
                  });
                  setActiveFilter(null);
                }}
              >
                {preset.label}
              </button>
            ))}
          </FilterSection>
          <FilterSection title="Custom range">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minSalary ?? ""}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    minSalary: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxSalary ?? ""}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    maxSalary: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500"
              />
            </div>
          </FilterSection>
        </FilterDropdown>
        <FilterDropdown
          label="Benefits"
          count={filters.benefits.length}
          isOpen={activeFilter === "benefits"}
          onToggle={() =>
            setActiveFilter((prev) => (prev === "benefits" ? null : "benefits"))
          }
        >
          <FilterSection title="Benefits">
            <div className="max-h-56 overflow-y-auto pr-1">
              <div className="flex flex-col gap-2">
                {BENEFIT_OPTIONS.map((option) => (
                  <CheckboxOption
                    key={option.value}
                    label={option.label}
                    checked={filters.benefits.includes(option.value)}
                    onToggle={() =>
                      onChange({
                        ...filters,
                        benefits: toggleValue(filters.benefits, option.value),
                      })
                    }
                    onSelected={() => setActiveFilter(null)}
                  />
                ))}
              </div>
            </div>
          </FilterSection>
        </FilterDropdown>
      </div>

      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex flex-wrap gap-2">
          <MobileFilterButton
            label="Professions"
            count={filters.professions.length}
            onClick={() => setActiveMobileFilter("profession")}
            buttonRef={professionButtonRef}
          />
          <MobileFilterButton
            label="Tech Stack"
            count={filters.languages.length}
            onClick={() => setActiveMobileFilter("language")}
            buttonRef={languageButtonRef}
          />
          <MobileFilterButton
            label="Languages"
            count={filters.spokenLanguages.length}
            onClick={() => setActiveMobileFilter("spoken-language")}
            buttonRef={spokenLanguageButtonRef}
          />
          <MobileFilterButton
            label="Location"
            count={filters.regions.length + filters.countries.length}
            onClick={() => setActiveMobileFilter("location")}
            buttonRef={locationButtonRef}
          />
          <MobileFilterButton
            label="Salary"
            count={filters.minSalary || filters.maxSalary ? 1 : 0}
            onClick={() => setActiveMobileFilter("salary")}
            buttonRef={salaryButtonRef}
          />
          <MobileFilterButton
            label="Benefits"
            count={filters.benefits.length}
            onClick={() => setActiveMobileFilter("benefits")}
            buttonRef={benefitsButtonRef}
          />
        </div>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onClearAll}
            className="self-start text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <MobileFilterModal
        isOpen={activeMobileFilter === "profession"}
        onClose={() => setActiveMobileFilter(null)}
        title="Professions"
        triggerRef={professionButtonRef}
      >
        <div className="max-h-72 overflow-y-auto pr-2">
          <div className="flex flex-col gap-2">
            {PROFESSION_OPTIONS.map((option) => (
              <CheckboxOption
                key={option.value}
                label={option.label}
                checked={filters.professions.includes(option.value)}
                onToggle={() =>
                  onChange({
                    ...filters,
                    professions: toggleValue(filters.professions, option.value),
                  })
                }
              />
            ))}
          </div>
        </div>
      </MobileFilterModal>

      <MobileFilterModal
        isOpen={activeMobileFilter === "language"}
        onClose={() => setActiveMobileFilter(null)}
        title="Tech Stack"
        triggerRef={languageButtonRef}
      >
        <div className="max-h-72 overflow-y-auto pr-2">
          <div className="flex flex-col gap-2">
            {PROGRAMMING_LANGUAGE_OPTIONS.map((option) => (
              <CheckboxOption
                key={option.value}
                label={option.label}
                checked={filters.languages.includes(option.value)}
                onToggle={() =>
                  onChange({
                    ...filters,
                    languages: toggleValue(filters.languages, option.value),
                  })
                }
              />
            ))}
          </div>
        </div>
      </MobileFilterModal>

      <MobileFilterModal
        isOpen={activeMobileFilter === "spoken-language"}
        onClose={() => setActiveMobileFilter(null)}
        title="Languages"
        triggerRef={spokenLanguageButtonRef}
      >
        <div className="max-h-72 overflow-y-auto pr-2">
          <div className="flex flex-col gap-2">
            {SPOKEN_LANGUAGE_OPTIONS.map((option) => (
              <CheckboxOption
                key={option.value}
                label={option.label}
                checked={filters.spokenLanguages.includes(option.value)}
                onToggle={() =>
                  onChange({
                    ...filters,
                    spokenLanguages: toggleValue(
                      filters.spokenLanguages,
                      option.value,
                    ),
                  })
                }
              />
            ))}
          </div>
        </div>
      </MobileFilterModal>

      <MobileFilterModal
        isOpen={activeMobileFilter === "location"}
        onClose={() => setActiveMobileFilter(null)}
        title="Location"
        triggerRef={locationButtonRef}
      >
        <div className="flex flex-col gap-5">
          <FilterSection title="Regions">
            {REGION_OPTIONS.map((option) => (
              <CheckboxOption
                key={option.id}
                label={option.label}
                checked={filters.regions.includes(option.id)}
                onToggle={() =>
                  onChange({
                    ...filters,
                    regions: toggleValue(filters.regions, option.id),
                  })
                }
              />
            ))}
          </FilterSection>
          <FilterSection title="Countries">
            {COUNTRY_OPTIONS.map((option) => (
              <CheckboxOption
                key={option.id}
                label={option.label}
                checked={filters.countries.includes(option.id)}
                onToggle={() =>
                  onChange({
                    ...filters,
                    countries: toggleValue(filters.countries, option.id),
                  })
                }
              />
            ))}
          </FilterSection>
        </div>
      </MobileFilterModal>

      <MobileFilterModal
        isOpen={activeMobileFilter === "salary"}
        onClose={() => setActiveMobileFilter(null)}
        title="Salary"
        triggerRef={salaryButtonRef}
      >
        <div className="flex flex-col gap-4">
          <FilterSection title="Presets">
            <div className="flex flex-wrap gap-2">
              {SALARY_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
                  onClick={() =>
                    onChange({
                      ...filters,
                      minSalary: preset.min,
                      maxSalary: undefined,
                    })
                  }
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </FilterSection>
          <FilterSection title="Custom range">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minSalary ?? ""}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    minSalary: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxSalary ?? ""}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    maxSalary: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500"
              />
            </div>
          </FilterSection>
        </div>
      </MobileFilterModal>

      <MobileFilterModal
        isOpen={activeMobileFilter === "benefits"}
        onClose={() => setActiveMobileFilter(null)}
        title="Benefits"
        triggerRef={benefitsButtonRef}
      >
        <div className="max-h-72 overflow-y-auto pr-2">
          <div className="flex flex-col gap-2">
            {BENEFIT_OPTIONS.map((option) => (
              <CheckboxOption
                key={option.value}
                label={option.label}
                checked={filters.benefits.includes(option.value)}
                onToggle={() =>
                  onChange({
                    ...filters,
                    benefits: toggleValue(filters.benefits, option.value),
                  })
                }
              />
            ))}
          </div>
        </div>
      </MobileFilterModal>
    </>
  );
}

function MobileFilterButton({
  label,
  count,
  onClick,
  buttonRef,
}: {
  label: string;
  count: number;
  onClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={`Open ${label} mobile filter`}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
    >
      {label}
      {count > 0 ? (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
          {count}
        </span>
      ) : null}
    </button>
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
