import type { PublicProfileDTO } from "@/types/publicProfile";

export type ProfileHeroProps = {
  profile: PublicProfileDTO;
};

export function ProfileHero({ profile }: ProfileHeroProps) {
  const initials = profile.displayName
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-slate-100 text-lg font-semibold text-slate-700">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={`${profile.displayName} avatar`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            {profile.displayName}
          </h1>
          <p className="text-sm text-[rgb(var(--muted))]">@{profile.username}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-[rgb(var(--muted))]">
            {profile.location ? <span>{profile.location}</span> : null}
            {profile.timezone ? <span>· {profile.timezone}</span> : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {profile.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-blue-100 px-3 py-1 text-blue-700"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
