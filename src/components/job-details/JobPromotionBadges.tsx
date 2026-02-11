import type { JobDetailsDTO } from "@/types/jobDetails";

type JobPromotionBadgesProps = {
  promotions?: JobDetailsDTO["promotions"];
};

const LABELS: Record<string, string> = {
  featured: "Featured",
  highlight: "Highlight",
  newsletter: "Newsletter",
  global: "Global",
};

export function JobPromotionBadges({ promotions }: JobPromotionBadgesProps) {
  if (!promotions || promotions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {promotions.map((promotion) => (
        <span
          key={promotion}
          className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-700"
        >
          {LABELS[promotion] ?? promotion}
        </span>
      ))}
    </div>
  );
}
