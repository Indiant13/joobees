import type { PortfolioItemDTO } from "@/types/dto/PortfolioItemDTO";

const MAX_PORTFOLIO_ITEMS = 5;
const MAX_DESCRIPTION_LENGTH = 180;

const portfolioByUser = new Map<string, PortfolioItemDTO[]>();

function getStore(userId: string) {
  if (!portfolioByUser.has(userId)) {
    portfolioByUser.set(userId, []);
  }
  return portfolioByUser.get(userId) ?? [];
}

function normalizeDescription(value: string) {
  return value.trim();
}

function normalizeUrl(value: string) {
  return value.trim();
}

function validateUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function getPortfolio(userId: string): PortfolioItemDTO[] {
  return [...getStore(userId)];
}

export function addPortfolioItem(
  userId: string,
  url: string,
  description: string,
): PortfolioItemDTO {
  const items = getStore(userId);

  if (items.length >= MAX_PORTFOLIO_ITEMS) {
    throw new Error("Portfolio item limit reached.");
  }

  const normalizedUrl = normalizeUrl(url);
  const normalizedDescription = normalizeDescription(description);

  if (!validateUrl(normalizedUrl)) {
    throw new Error("Invalid portfolio URL.");
  }

  if (normalizedDescription.length === 0) {
    throw new Error("Portfolio description is required.");
  }

  if (normalizedDescription.length > MAX_DESCRIPTION_LENGTH) {
    throw new Error("Portfolio description exceeds max length.");
  }

  const item: PortfolioItemDTO = {
    id: `portfolio_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    url: normalizedUrl,
    description: normalizedDescription,
    createdAt: new Date().toISOString(),
  };

  const nextItems = [item, ...items];
  portfolioByUser.set(userId, nextItems);
  return item;
}

export function removePortfolioItem(userId: string, itemId: string): boolean {
  const items = getStore(userId);
  const nextItems = items.filter((item) => item.id !== itemId);
  portfolioByUser.set(userId, nextItems);
  return nextItems.length !== items.length;
}
