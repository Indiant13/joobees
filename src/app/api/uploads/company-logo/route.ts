import { createCompanyLogoUrl } from "@/services/jobs.service";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return Response.json({ error: "Missing file." }, { status: 400 });
  }

  const logoUrl = createCompanyLogoUrl(file.name);

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
