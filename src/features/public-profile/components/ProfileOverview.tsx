import type { PublicProfileDTO } from "@/types/publicProfile";

export type ProfileOverviewProps = {
  profile: PublicProfileDTO;
};

export function ProfileOverview({ profile }: ProfileOverviewProps) {
  return (
    <section className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Overview</h2>
      <p className="mt-3 text-sm text-[rgb(var(--muted))]">
        {profile.bio ?? "This profile has not added a bio yet."}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        {profile.links.website ? (
          <a
            href={profile.links.website}
            className="rounded-full border border-[rgb(var(--border))] px-3 py-1 text-[rgb(var(--muted))] transition hover:border-blue-500 hover:text-blue-600"
          >
            Website
          </a>
        ) : null}
        {profile.links.github ? (
          <a
            href={profile.links.github}
            className="rounded-full border border-[rgb(var(--border))] px-3 py-1 text-[rgb(var(--muted))] transition hover:border-blue-500 hover:text-blue-600"
          >
            GitHub
          </a>
        ) : null}
        {profile.links.linkedin ? (
          <a
            href={profile.links.linkedin}
            className="rounded-full border border-[rgb(var(--border))] px-3 py-1 text-[rgb(var(--muted))] transition hover:border-blue-500 hover:text-blue-600"
          >
            LinkedIn
          </a>
        ) : null}
      </div>
    </section>
  );
}
