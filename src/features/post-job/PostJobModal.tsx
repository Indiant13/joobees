"use client";

import { createPortal } from "react-dom";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type {
  JobCategory,
  JobFormState,
  JobPayload,
  JobPricingOption,
} from "@/features/post-job/types";
import { JobBasicsStep } from "@/features/post-job/steps/JobBasicsStep";
import { JobDetailsStep } from "@/features/post-job/steps/JobDetailsStep";
import { JobPreviewStep } from "@/features/post-job/steps/JobPreviewStep";
import { createJobAction } from "@/features/post-job/actions";
import { PricingStep } from "@/features/post-job/pricing/PricingStep";
import { FEATURES } from "@/config/features";

type PostJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DEFAULT_FORM: JobFormState = {
  title: "",
  companyName: "",
  companyLogoUrl: "",
  location: "",
  type: "Full-time",
  description: "",
  tags: "",
  salaryMin: "",
  salaryMax: "",
  experience: "Mid",
};

export function PostJobModal({ isOpen, onClose }: PostJobModalProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState<JobFormState>(DEFAULT_FORM);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [pricingOptions, setPricingOptions] = useState<JobPricingOption[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

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
    if (!isOpen) {
      return;
    }
    setStep(0);
    setSubmitError(null);
    setFormState(DEFAULT_FORM);
    setSelectedPricing([]);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    let isMounted = true;
    fetch("/api/jobs/categories")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: JobCategory[]) => {
        if (isMounted) {
          setCategories(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCategories([]);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !FEATURES.PAID_JOBS) {
      return;
    }
    let isMounted = true;
    fetch("/api/jobs/pricing", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data: JobPricingOption[]) => {
        if (isMounted) {
          setPricingOptions(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setPricingOptions([]);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

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

  const previewPayload: JobPayload = useMemo(() => {
    const tags = formState.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return {
      title: formState.title,
      company: {
        name: formState.companyName,
        logoUrl: formState.companyLogoUrl || undefined,
      },
      location: formState.location,
      type: formState.type,
      description: formState.description,
      tags,
      salaryMin: formState.salaryMin || undefined,
      salaryMax: formState.salaryMax || undefined,
      experience: formState.experience,
      pricingOptionIds: selectedPricing.length > 0 ? selectedPricing : undefined,
    };
  }, [formState, selectedPricing]);

  const pricingSummary = useMemo(() => {
    if (!FEATURES.PAID_JOBS || pricingOptions.length === 0) {
      return null;
    }
    const selected = pricingOptions.filter((option) =>
      selectedPricing.includes(option.id),
    );
    return {
      total: selected.reduce((sum, option) => sum + option.priceUsd, 0),
      titles: selected.map((option) => option.title),
    };
  }, [pricingOptions, selectedPricing]);

  const handleTagAdd = (tag: string) => {
    setFormState((prev) => {
      const current = prev.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      if (current.includes(tag)) {
        return prev;
      }
      const updated = [...current, tag].join(", ");
      return { ...prev, tags: updated };
    });
  };

  const handleSubmit = () => {
    setSubmitError(null);
    startTransition(() => {
      createJobAction(previewPayload)
        .then(() => {
          onClose();
        })
        .catch((error: Error) => {
          setSubmitError(error.message);
        });
    });
  };

  const focusableSelectors =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  const handleLogoUpload = (file: File) => {
    setIsUploadingLogo(true);
    setSubmitError(null);
    const formData = new FormData();
    formData.append("file", file);
    fetch("/api/uploads/company-logo", {
      method: "POST",
      body: formData,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error("Upload failed")),
      )
      .then((data: { logoUrl: string }) => {
        setFormState((prev) => ({ ...prev, companyLogoUrl: data.logoUrl }));
      })
      .catch((error: Error) => {
        setSubmitError(error.message);
      })
      .finally(() => {
        setIsUploadingLogo(false);
      });
  };

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }
    const focusable = dialogRef.current
      ? Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(focusableSelectors),
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

  const steps = FEATURES.PAID_JOBS
    ? ["basics", "details", "pricing", "preview"]
    : ["basics", "details", "preview"];
  const currentStep = steps[step];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6"
      role="presentation"
      onClick={() => onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-job-title"
        aria-describedby="post-job-description"
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl outline-none"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="post-job-title" className="text-lg font-semibold text-slate-900">
                Post a job
              </h2>
              <p id="post-job-description" className="text-sm text-slate-500">
                {currentStep === "basics"
                  ? "Job basics"
                  : currentStep === "details"
                    ? "Job details"
                    : currentStep === "pricing"
                      ? "Pricing"
                      : "Preview & submit"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onClose()}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
            >
              Close
            </button>
          </div>
          <div className="mt-4 h-1 w-full rounded-full bg-slate-100">
            <div
              className="h-1 rounded-full bg-blue-600 transition-all"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="mt-6">
          {currentStep === "basics" ? (
            <JobBasicsStep
              data={formState}
              onChange={(value) => setFormState((prev) => ({ ...prev, ...value }))}
              onUploadLogo={handleLogoUpload}
              onRemoveLogo={() =>
                setFormState((prev) => ({ ...prev, companyLogoUrl: "" }))
              }
              isUploading={isUploadingLogo}
              onNext={() => setStep(1)}
            />
          ) : null}
          {currentStep === "details" ? (
            <JobDetailsStep
              data={formState}
              categories={categories}
              onChange={(value) => setFormState((prev) => ({ ...prev, ...value }))}
              onAddTag={handleTagAdd}
              onNext={() => setStep((prev) => prev + 1)}
              onBack={() => setStep((prev) => Math.max(prev - 1, 0))}
            />
          ) : null}
          {currentStep === "pricing" ? (
            <PricingStep
              options={pricingOptions}
              selectedIds={selectedPricing}
              onToggle={(id) =>
                setSelectedPricing((prev) =>
                  prev.includes(id)
                    ? prev.filter((optionId) => optionId !== id)
                    : [...prev, id],
                )
              }
              onSkip={() => {
                setSelectedPricing([]);
                setStep((prev) => prev + 1);
              }}
              onNext={() => setStep((prev) => prev + 1)}
              onBack={() => setStep((prev) => Math.max(prev - 1, 0))}
            />
          ) : null}
          {currentStep === "preview" ? (
            <JobPreviewStep
              payload={previewPayload}
              pricingSummary={pricingSummary ?? undefined}
              isSubmitting={isPending}
              error={submitError}
              onBack={() => setStep((prev) => Math.max(prev - 1, 0))}
              onSubmit={handleSubmit}
            />
          ) : null}
        </div>
      </div>
    </div>,
    portalTarget,
  );
}
