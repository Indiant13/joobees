import { cookies } from "next/headers";
import {
  getSessionCookieName,
  getSessionFromCookie,
} from "@/app/api/auth/auth-service";
import { removePortfolioItem } from "@/services/portfolio.service";

async function resolveUserId() {
  const store = await cookies();
  const value = store.get(getSessionCookieName())?.value;
  const session = getSessionFromCookie(value);
  return session?.userId ?? null;
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ itemId: string }> },
) {
  const userId = await resolveUserId();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { itemId } = await params;
  const removed = removePortfolioItem(userId, itemId);

  return Response.json(
    { removed },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
