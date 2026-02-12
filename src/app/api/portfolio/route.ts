import { cookies } from "next/headers";
import {
  getSessionCookieName,
  getSessionFromCookie,
} from "@/app/api/auth/auth-service";
import { addPortfolioItem, getPortfolio } from "@/services/portfolio.service";
import type { PortfolioItemDTO } from "@/types/dto/PortfolioItemDTO";

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

  const data: PortfolioItemDTO[] = getPortfolio(userId);
  return Response.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  const userId = await resolveUserId();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    url?: string;
    description?: string;
  };

  try {
    const item = addPortfolioItem(
      userId,
      body.url ?? "",
      body.description ?? "",
    );
    return Response.json(item, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to add item." },
      { status: 400 },
    );
  }
}
