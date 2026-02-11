export function isJobNew(publishedAt: string): boolean {
  const published = new Date(publishedAt);
  const publishedMs = published.getTime();

  if (Number.isNaN(publishedMs)) {
    return false;
  }

  const nowMs = Date.now();
  const diffMs = nowMs - publishedMs;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));

  return hours >= 0 && hours < 24;
}
