"use client";

import { createPortal } from "react-dom";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";

type ScrollableModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  headerRight?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  maxWidthClassName?: string;
  contentClassName?: string;
};

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ScrollableModal({
  isOpen,
  onClose,
  title,
  description,
  headerRight,
  footer,
  children,
  maxWidthClassName = "md:max-w-2xl",
  contentClassName,
}: ScrollableModalProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descriptionId = `${titleId}-description`;

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => {
      previous?.focus();
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }
    const target = document.getElementById("modal-root");
    setPortalTarget(target);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !portalTarget) {
      return;
    }
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen, portalTarget]);

  useEffect(() => {
    if (!isOpen || !portalTarget) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, portalTarget, onClose]);

  useEffect(() => {
    if (isOpen) {
      return;
    }
    setPortalTarget(null);
  }, [isOpen]);

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }
    const focusable = dialogRef.current
      ? Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
        ).filter((el) => !el.hasAttribute("disabled"))
      : [];

    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isOpen || !portalTarget) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 pt-10 motion-safe:animate-[modal-overlay-in_180ms_ease-out] md:items-center md:px-4 md:py-6"
      role="presentation"
      onClick={() => onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
        onClick={(event) => event.stopPropagation()}
        className={`flex max-h-[100dvh] w-full flex-col rounded-t-2xl bg-white shadow-xl outline-none motion-safe:animate-[modal-sheet-in_220ms_cubic-bezier(0.22,1,0.36,1)] md:max-h-[90vh] md:w-full md:rounded-2xl md:motion-safe:animate-[modal-pop-in_180ms_ease-out] ${maxWidthClassName}`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-4 md:px-6">
          <div className="min-w-0">
            <h2 id={titleId} className="text-lg font-semibold text-slate-900">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="text-sm text-slate-500">
                {description}
              </p>
            ) : null}
          </div>
          {headerRight ?? (
            <button
              type="button"
              onClick={() => onClose()}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
            >
              Close
            </button>
          )}
        </div>
        <div
          className={`min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-5 ${contentClassName ?? ""}`}
        >
          {children}
        </div>
        {footer ? (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:px-6">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    portalTarget,
  );
}
