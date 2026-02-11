export function formatJobPublishedAt(publishedAt: string): string {
  const published = new Date(publishedAt);
  const publishedMs = published.getTime();

  if (Number.isNaN(publishedMs)) {
    return publishedAt;
  }

  const nowMs = Date.now();
  const diffMs = nowMs - publishedMs;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));

  if (hours >= 0 && hours < 24) {
    return `${hours}h ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(published);
}
