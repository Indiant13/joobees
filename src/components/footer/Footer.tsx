import Link from "next/link";
import type { FooterProps } from "@/components/footer/Footer.props";

export function Footer({ brandName, tagline, links, copyright }: FooterProps) {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">{brandName}</p>
          <p className="text-xs text-[rgb(var(--muted))]">{tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm">
          {links.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="text-[rgb(var(--muted))] transition hover:text-[rgb(var(--accent))]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-[rgb(var(--border))]">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-[rgb(var(--muted))]">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
