import type { PublicProfileDTO } from "@/types/publicProfile";
import { PortfolioCard } from "@/features/public-profile/components/PortfolioCard";

export type ProfilePortfolioProps = {
  profile: PublicProfileDTO;
};

export function ProfilePortfolio({ profile }: ProfilePortfolioProps) {
  const items = profile.portfolio ?? [];

  return (
    <section className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Portfolio</h2>
        <span className="text-xs text-[rgb(var(--muted))]">
          Public projects
        </span>
      </div>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-[rgb(var(--muted))]">
          No portfolio items yet.
        </p>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <PortfolioCard
              key={item.id}
              href={item.url}
              description={item.description}
            />
          ))}
        </div>
      )}
    </section>
  );
}
