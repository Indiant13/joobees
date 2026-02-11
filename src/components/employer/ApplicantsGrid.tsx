import Link from "next/link";
import type { JobApplicantsPreviewDTO } from "@/types/employerPostedJobs";

type ApplicantsGridProps = {
  data: JobApplicantsPreviewDTO;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ApplicantsGrid({ data }: ApplicantsGridProps) {
  if (data.applicants.length === 0) {
    return (
      <div className="rounded-2xl border border-[rgb(var(--border))] p-4 text-sm text-[rgb(var(--muted))]">
        No applicants yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.applicants.map((applicant) => (
        <Link
          key={applicant.id}
          href={`/u/${applicant.username}`}
          className="rounded-2xl border border-[rgb(var(--border))] p-4 transition hover:border-blue-500/40 hover:bg-blue-50/20"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[rgb(var(--border))] bg-white text-xs font-semibold text-[rgb(var(--muted))]">
              {applicant.avatarUrl ? (
                <img
                  src={applicant.avatarUrl}
                  alt={`${applicant.name} avatar`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{getInitials(applicant.name) || "?"}</span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-[rgb(var(--fg))]">
                {applicant.name}
              </p>
              <p className="text-xs text-[rgb(var(--muted))]">
                @{applicant.username}
              </p>
            </div>
          </div>
          <div className="mt-3 text-xs text-[rgb(var(--muted))]">
            {applicant.age ? <span>{applicant.age} years</span> : null}
            {applicant.age && applicant.country ? <span> · </span> : null}
            {applicant.country ? <span>{applicant.country}</span> : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
