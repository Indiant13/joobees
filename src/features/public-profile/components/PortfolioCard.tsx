export type PortfolioCardProps = {
  label: string;
  href: string;
  description: string;
};

export function PortfolioCard({ label, href, description }: PortfolioCardProps) {
  return (
    <a
      href={href}
      className="flex h-full flex-col justify-between rounded-2xl border border-[rgb(var(--border))] bg-white p-5 shadow-sm transition hover:border-blue-500 hover:shadow-md"
    >
      <div>
        <h3 className="text-base font-semibold">{label}</h3>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">{description}</p>
      </div>
      <span className="mt-4 text-xs font-semibold text-blue-600">
        View profile
      </span>
    </a>
  );
}
