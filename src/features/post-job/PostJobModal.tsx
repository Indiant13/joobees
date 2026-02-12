"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { ScrollableModal } from "@/components/modal/ScrollableModal";
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
import { PROFESSION_OPTIONS } from "@/features/job-search-filters/config/professions";

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
  profession: PROFESSION_OPTIONS[0]?.value ?? "software-developer",
  description: "",
  tags: "",
  salaryMin: "",
  salaryMax: "",
  experience: "Mid",
  benefits: [],
  languages: [],
  spokenLanguages: [],
};

export function PostJobModal({ isOpen, onClose }: PostJobModalProps) {
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
      profession: formState.profession,
      description: formState.description,
      tags,
      benefits: formState.benefits.length > 0 ? formState.benefits : undefined,
      skills: formState.languages.length > 0 ? formState.languages : undefined,
      skillsLanguages:
        formState.spokenLanguages.length > 0
          ? formState.spokenLanguages
          : undefined,
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

  const steps = FEATURES.PAID_JOBS
    ? ["basics", "details", "pricing", "preview"]
    : ["basics", "details", "preview"];
  const currentStep = steps[step];
  const isPreview = currentStep === "preview";

  const footer = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
          >
            Back
          </button>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {currentStep === "pricing" ? (
          <button
            type="button"
            onClick={() => {
              setSelectedPricing([]);
              setStep((prev) => prev + 1);
            }}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
          >
            Skip
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => {
            if (isPreview) {
              handleSubmit();
              return;
            }
            setStep((prev) => Math.min(prev + 1, steps.length - 1));
          }}
          disabled={isPreview ? isPending : false}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPreview ? (isPending ? "Submitting..." : "Submit job") : "Next"}
        </button>
      </div>
    </div>
  );

  return (
    <ScrollableModal
      isOpen={isOpen}
      onClose={onClose}
      title="Post a job"
      description={
        currentStep === "basics"
          ? "Job basics"
          : currentStep === "details"
            ? "Job details"
            : currentStep === "pricing"
              ? "Pricing"
              : "Preview & submit"
      }
      footer={footer}
      maxWidthClassName="md:max-w-2xl"
      contentClassName="pb-2"
    >
      <div className="h-1 w-full rounded-full bg-slate-100">
        <div
          className="h-1 rounded-full bg-blue-600 transition-all"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
      <div className="mt-5">
        {currentStep === "basics" ? (
          <JobBasicsStep
            data={formState}
            onChange={(value) => setFormState((prev) => ({ ...prev, ...value }))}
            onUploadLogo={handleLogoUpload}
            onRemoveLogo={() =>
              setFormState((prev) => ({ ...prev, companyLogoUrl: "" }))
            }
            isUploading={isUploadingLogo}
          />
        ) : null}
        {currentStep === "details" ? (
          <JobDetailsStep
            data={formState}
            categories={categories}
            onChange={(value) => setFormState((prev) => ({ ...prev, ...value }))}
            onAddTag={handleTagAdd}
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
          />
        ) : null}
        {currentStep === "preview" ? (
          <JobPreviewStep
            payload={previewPayload}
            pricingSummary={pricingSummary ?? undefined}
            error={submitError}
          />
        ) : null}
      </div>
    </ScrollableModal>
  );
}
