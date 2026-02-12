"use client";

import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from "react";

type MobileFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
};

export function MobileFilterModal({
  isOpen,
  onClose,
  title,
  children,
  triggerRef,
}: MobileFilterModalProps) {
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const portalTarget = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return document.getElementById("modal-root") ?? document.body;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setPosition(null);
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

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePosition = () => {
      const node = triggerRef.current;
      if (!node) {
        return;
      }
      const rect = node.getBoundingClientRect();
      const viewportPadding = 12;
      const targetWidth = Math.min(Math.max(rect.width, 260), window.innerWidth - viewportPadding * 2);
      const left = Math.min(
        Math.max(rect.left, viewportPadding),
        window.innerWidth - targetWidth - viewportPadding,
      );

      setPosition({
        top: rect.bottom + 8,
        left,
        width: targetWidth,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, triggerRef]);

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
        aria-label="Close filter popover"
        className="absolute inset-0 bg-transparent"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="fixed max-h-[70dvh] overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl"
        style={{
          top: position?.top ?? 0,
          left: position?.left ?? 0,
          width: position?.width ?? 280,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500"
          >
            Close
          </button>
        </div>
        <div className="max-h-[calc(70dvh-4.5rem)] overflow-y-auto">{children}</div>
      </div>
    </div>,
    portalTarget,
  );
}
