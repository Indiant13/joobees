import type { ProfileEditorDTO } from "@/types/profileEditor";
import { getProfileEditor, updateProfileEditor } from "@/services/profile.service";

export async function GET() {
  const data: ProfileEditorDTO = getProfileEditor();

  return Response.json(data, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as Partial<ProfileEditorDTO>;
  const data: ProfileEditorDTO = updateProfileEditor(body);

  return Response.json(data);
}
