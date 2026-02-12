"use client";

import { useEffect, useRef, useState } from "react";
import { SORT_OPTIONS } from "@/features/job-sort/config/sortOptions";
import type { SortValue } from "@/features/job-sort/types/sort.types";

type SortDropdownProps = {
  selectedSort: SortValue;
  onChange: (next: SortValue) => void;
};

export function SortDropdown({ selectedSort, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (containerRef.current && target) {
        if (!containerRef.current.contains(target)) {
          setIsOpen(false);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const activeLabel =
    SORT_OPTIONS.find((option) => option.value === selectedSort)?.label ??
    "Sort";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
        aria-expanded={isOpen}
      >
        Sort: {activeLabel}
      </button>
      {isOpen ? (
        <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="flex flex-col gap-2">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                  option.value === selectedSort
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
