import { getProfileByUsername } from "@/services/profile.service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;
  const payload = await getProfileByUsername(username);

  if (!payload) {
    return new Response(null, { status: 404 });
  }

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
