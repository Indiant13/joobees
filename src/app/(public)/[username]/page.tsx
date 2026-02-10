import type { Metadata } from "next";
import type { PublicProfileDTO } from "@/types/publicProfile";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { ProfileHero } from "@/features/public-profile/components/ProfileHero";
import { ProfileOverview } from "@/features/public-profile/components/ProfileOverview";
import { ProfileStats } from "@/features/public-profile/components/ProfileStats";
import { ProfilePortfolio } from "@/features/public-profile/components/ProfilePortfolio";
import { ProfileShareBar } from "@/features/public-profile/components/ProfileShareBar";

async function getPublicProfile(username: string): Promise<PublicProfileDTO> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/profile/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load profile");
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const profile = await getPublicProfile(params.username);
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}/@${profile.username}`;

  return {
    title: `${profile.displayName} (@${profile.username}) | Joobees`,
    description:
      profile.bio ?? `Remote worker profile for ${profile.displayName}.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${profile.displayName} on Joobees`,
      description:
        profile.bio ?? `Remote worker profile for ${profile.displayName}.`,
      url,
      images: profile.avatarUrl ? [{ url: profile.avatarUrl }] : undefined,
      type: "profile",
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const profile = await getPublicProfile(params.username);
  const baseUrl = await getBaseUrl();
  const shareUrl = `${baseUrl}/@${profile.username}`;

  return (
    <main className="min-h-screen">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <ProfileHero profile={profile} />
          <ProfileOverview profile={profile} />
          <ProfilePortfolio profile={profile} />
        </div>
        <aside className="flex flex-col gap-6">
          <ProfileStats profile={profile} />
          <ProfileShareBar url={shareUrl} />
        </aside>
      </section>
    </main>
  );
}
