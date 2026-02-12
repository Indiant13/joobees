"use client";

import { useEffect, useRef, useState } from "react";
import { SORT_OPTIONS } from "@/features/job-sort/config/sortOptions";
import type { SortValue } from "@/features/job-sort/types/sort.types";

type SortControlProps = {
  selectedSort?: SortValue;
  onChange: (next: SortValue) => void;
  onClear: () => void;
  className?: string;
  compact?: boolean;
};

export function SortControl({
  selectedSort,
  onChange,
  onClear,
  className,
  compact = false,
}: SortControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedOption = SORT_OPTIONS.find((option) => option.value === selectedSort);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (containerRef.current && target && !containerRef.current.contains(target)) {
        setIsOpen(false);
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

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:text-slate-900 md:w-auto md:rounded-full ${
          compact
            ? "px-3 py-1.5 text-xs font-medium text-slate-600"
            : "px-4 py-2 text-sm font-semibold text-slate-700 md:text-xs"
        }`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span>
          {selectedOption ? `Sort: ${selectedOption.label}` : "Sort by"}
        </span>
        {selectedOption ? (
          <span
            role="button"
            tabIndex={0}
            aria-label="Clear sort"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onClear();
              setIsOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClear();
                setIsOpen(false);
              }
            }}
            className={`inline-flex items-center justify-center rounded-full text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-700 ${
              compact ? "h-4 w-4" : "h-5 w-5"
            }`}
          >
            x
          </span>
        ) : (
          <span className="text-xs text-slate-400">v</span>
        )}
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-40 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-xl md:w-56 md:left-auto md:right-0"
        >
          <div className="flex flex-col gap-1">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="menuitem"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                  selectedSort === option.value
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
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
