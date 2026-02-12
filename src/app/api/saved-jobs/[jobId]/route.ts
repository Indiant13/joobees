import { cookies } from "next/headers";
import {
  getSessionCookieName,
  getSessionFromCookie,
} from "@/app/api/auth/auth-service";
import { removeSavedJob, saveJob } from "@/services/saved-jobs.service";
import type { SavedJobDTO } from "@/types/dto/SavedJobDTO";

async function resolveUserId() {
  const store = await cookies();
  const value = store.get(getSessionCookieName())?.value;
  const session = getSessionFromCookie(value);
  return session?.userId ?? null;
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const userId = await resolveUserId();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId } = await params;
  const savedJob: SavedJobDTO | null = saveJob(userId, jobId);

  if (!savedJob) {
    return Response.json({ error: "Job not found" }, { status: 404 });
  }

  return Response.json(savedJob, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const userId = await resolveUserId();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId } = await params;
  const removed = removeSavedJob(userId, jobId);

  return Response.json(
    { removed },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
