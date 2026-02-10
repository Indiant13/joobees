import type { PublicProfileDTO } from "@/types/publicProfile";

export type ProfileStatsProps = {
  profile: PublicProfileDTO;
};

export function ProfileStats({ profile }: ProfileStatsProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
          Saved Jobs
        </p>
        <p className="mt-2 text-2xl font-semibold">
          {profile.stats.savedJobs}
        </p>
      </div>
      <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
          Applied Jobs
        </p>
        <p className="mt-2 text-2xl font-semibold">
          {profile.stats.appliedJobs}
        </p>
      </div>
    </section>
  );
}
