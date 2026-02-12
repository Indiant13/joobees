import { cookies } from "next/headers";
import {
  getSessionCookieName,
  getSessionFromCookie,
} from "@/app/api/auth/auth-service";
import { getSavedJobs } from "@/services/saved-jobs.service";
import type { SavedJobDTO } from "@/types/dto/SavedJobDTO";

async function resolveUserId() {
  const store = await cookies();
  const value = store.get(getSessionCookieName())?.value;
  const session = getSessionFromCookie(value);
  return session?.userId ?? null;
}

export async function GET() {
  const userId = await resolveUserId();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data: SavedJobDTO[] = getSavedJobs(userId);
  return Response.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
