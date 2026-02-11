import type { PublicProfileDTO } from "@/types/publicProfile";
import { getPublicProfileRecord } from "@/app/api/public-profile/mock-services/public-profile";
import { getVisibilitySettings } from "@/app/api/me/visibility/mock-service";
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

  const visibility = getVisibilitySettings();
  const baseUrl = await getBaseUrl();
  const slug = resolvePublicProfileSlug(record.username);

  const payload: PublicProfileDTO = {
    username: record.username,
    displayName: record.displayName,
    publicUrl: `${baseUrl}/u/${slug}`,
    bio: visibility.showBio ? record.bio : undefined,
    avatarUrl: visibility.showAvatar ? record.avatarUrl ?? undefined : undefined,
    location: visibility.showLocation ? record.location ?? undefined : undefined,
    timezone: visibility.showTimezone ? record.timezone ?? undefined : undefined,
    links: visibility.showLinks ? record.links : {},
    badges: visibility.showBadges ? record.badges : [],
    stats: visibility.showStats ? record.stats : { savedJobs: 0, appliedJobs: 0 },
    updatedAt: record.updatedAt,
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
