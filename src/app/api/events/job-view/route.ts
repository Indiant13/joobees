export async function POST() {
  return Response.json(
    { status: "queued" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
