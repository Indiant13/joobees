export type PortfolioCardProps = {
  href: string;
  description: string;
};

export function PortfolioCard({ href, description }: PortfolioCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full flex-col justify-between rounded-2xl border border-[rgb(var(--border))] bg-white p-5 shadow-sm transition hover:border-blue-500 hover:shadow-md"
    >
      <div>
        <h3 className="text-base font-semibold">Portfolio item</h3>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">{description}</p>
      </div>
      <span className="mt-4 text-xs font-semibold text-blue-600">
        Open link
      </span>
    </a>
  );
}
