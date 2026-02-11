export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return Response.json({ error: "Missing file." }, { status: 400 });
  }

  const filename = encodeURIComponent(file.name);
  const logoUrl = `https://cdn.joobees.com/uploads/${Date.now()}-${filename}`;

  return Response.json(
    {
      logoUrl,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
