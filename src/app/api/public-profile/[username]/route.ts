import type { PublicProfileDTO } from "@/types/publicProfile";
import { getPublicProfileRecord } from "@/app/api/public-profile/mock-services/public-profile";
import { getProfileVisibilitySettings } from "@/app/api/me/profile/visibility/mock-service";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { resolvePublicProfileSlug } from "@/lib/slugService";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;
  const record = getPublicProfileRecord(username);

  if (!record) {
    return new Response(null, { status: 404 });
  }

  const visibility = getProfileVisibilitySettings();
  const baseUrl = await getBaseUrl();
  const slug = resolvePublicProfileSlug(record.username);

  const payload: PublicProfileDTO = {
    username: record.username,
    displayName: record.displayName,
    publicUrl: `${baseUrl}/u/${slug}`,
    bio: visibility.showBio ? record.bio : undefined,
    avatarUrl: visibility.showAvatar ? record.avatarUrl ?? undefined : undefined,
    location: visibility.showLocation ? record.location ?? undefined : undefined,
    timezone: visibility.showLocation ? record.timezone ?? undefined : undefined,
    skills: visibility.showSkills ? record.skills : undefined,
    languages: visibility.showLanguages ? record.languages : undefined,
    availability: visibility.showAvailability ? record.availability : undefined,
    lastSeen: visibility.showLastSeen ? record.lastSeen : undefined,
    portfolio: visibility.showPortfolio
      ? {
          employment: visibility.showEmployment
            ? record.portfolio.employment
            : undefined,
          education: visibility.showEducation
            ? record.portfolio.education
            : undefined,
        }
      : undefined,
    links: {
      website: visibility.showWebsite ? record.links.website : undefined,
      github: visibility.showGithub ? record.links.github : undefined,
      linkedin: visibility.showLinkedin ? record.links.linkedin : undefined,
    },
    badges: record.badges,
    stats: record.stats,
    updatedAt: record.updatedAt,
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
