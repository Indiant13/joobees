import type { PublicProfileDTO } from "@/types/publicProfile";
import { getBaseUrl } from "@/lib/getBaseUrl";

const MOCK_PROFILE: Omit<PublicProfileDTO, "publicUrl"> = {
  username: "gina",
  displayName: "Gina Urban",
  bio: "Remote product designer focused on fintech and collaboration tools.",
  avatarUrl: undefined,
  location: "Germany",
  timezone: "CET",
  links: {
    website: "https://gina.design",
    github: "https://github.com/gina",
    linkedin: "https://linkedin.com/in/gina",
  },
  badges: ["Remote Ready", "Top 10%"],
  stats: {
    savedJobs: 12,
    appliedJobs: 4,
  },
  updatedAt: "2026-02-10T00:00:00.000Z",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;

  if (username !== MOCK_PROFILE.username) {
    return new Response(null, { status: 404 });
  }

  const baseUrl = await getBaseUrl();
  // publicUrl is part of the public profile contract and is constructed server-side for sharing.
  const publicUrl = `${baseUrl}/@${MOCK_PROFILE.username}`;

  return Response.json(
    {
      ...MOCK_PROFILE,
      publicUrl,
    },
    {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
    },
  );
}
