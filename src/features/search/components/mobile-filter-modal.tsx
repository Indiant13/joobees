"use client";

import { createPortal } from "react-dom";
import { useEffect, useMemo, type ReactNode } from "react";

const MODAL_HEADER_HEIGHT_PX = 57;

type MobileFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function MobileFilterModal({
  isOpen,
  onClose,
  title,
  children,
}: MobileFilterModalProps) {
  const portalTarget = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return document.getElementById("modal-root") ?? document.body;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !portalTarget) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close filter modal"
        className="absolute inset-0 bg-slate-950/45"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="mobile-filter-modal fixed inset-0 h-screen overflow-hidden bg-white"
        style={{ height: "100vh" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-screen flex-col" style={{ height: "100vh" }}>
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500"
            >
              Close
            </button>
          </div>
          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4"
            style={{
              maxHeight: `calc(100vh - ${MODAL_HEADER_HEIGHT_PX}px)`,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {children}
          </div>
        </div>
        <style jsx global>{`
          .mobile-filter-modal input,
          .mobile-filter-modal textarea {
            font-size: 16px;
            line-height: normal;
          }
        `}</style>
      </div>
    </div>,
    portalTarget,
  );
}
