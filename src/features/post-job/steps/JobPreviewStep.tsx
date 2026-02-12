"use client";

import type { JobPayload } from "@/features/post-job/types";
import { BENEFIT_OPTIONS } from "@/features/job-search-filters/config/benefits";
import { PROFESSION_OPTIONS } from "@/features/job-search-filters/config/professions";
import { PROGRAMMING_LANGUAGE_OPTIONS } from "@/features/job-search-filters/config/programmingLanguages";
import { SPOKEN_LANGUAGE_OPTIONS } from "@/features/job-search-filters/config/spokenLanguages";

type JobPreviewStepProps = {
  payload: JobPayload;
  pricingSummary?: {
    total: number;
    titles: string[];
  };
  error: string | null;
};

export function JobPreviewStep({
  payload,
  pricingSummary,
  error,
}: JobPreviewStepProps) {
  const benefitMap = new Map(
    BENEFIT_OPTIONS.map((benefit) => [benefit.value, benefit.label]),
  );
  const professionMap = new Map(
    PROFESSION_OPTIONS.map((profession) => [
      profession.value,
      profession.label,
    ]),
  );
  const languageMap = new Map(
    PROGRAMMING_LANGUAGE_OPTIONS.map((language) => [
      language.value,
      language.label,
    ]),
  );
  const spokenLanguageMap = new Map(
    SPOKEN_LANGUAGE_OPTIONS.map((language) => [
      language.value,
      language.label,
    ]),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <h3 className="text-base font-semibold text-slate-900">
          {payload.title}
        </h3>
        <p className="mt-1 text-slate-600">
          {payload.company.name} · {payload.location} · {payload.type}
        </p>
        <p className="mt-3 whitespace-pre-wrap">{payload.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {payload.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 text-slate-600">
          Profession: {professionMap.get(payload.profession) ?? payload.profession}
        </p>
        <p className="mt-1 text-slate-600">Experience: {payload.experience}</p>
        {payload.skills && payload.skills.length > 0 ? (
          <div className="mt-3">
            <p className="text-slate-600">Programming languages:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {payload.skills.map((language) => (
                <li
                  key={language}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
                >
                  {languageMap.get(language) ?? language}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {payload.skillsLanguages && payload.skillsLanguages.length > 0 ? (
          <div className="mt-3">
            <p className="text-slate-600">Spoken languages:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {payload.skillsLanguages.map((language) => (
                <li
                  key={language}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
                >
                  {spokenLanguageMap.get(language) ?? language}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {payload.benefits && payload.benefits.length > 0 ? (
          <div className="mt-3">
            <p className="text-slate-600">Benefits:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {payload.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
                >
                  {benefitMap.get(benefit) ?? benefit}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {payload.salaryMin || payload.salaryMax ? (
          <p className="mt-1 text-slate-600">
            Salary: {payload.salaryMin || "—"} - {payload.salaryMax || "—"} USD
          </p>
        ) : null}
        {pricingSummary && pricingSummary.titles.length > 0 ? (
          <div className="mt-3">
            <p className="text-slate-600">Promotions:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {pricingSummary.titles.map((title) => (
                <li
                  key={title}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
                >
                  {title}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-slate-600">
              Promotion total: ${pricingSummary.total}
            </p>
          </div>
        ) : null}
      </div>
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
