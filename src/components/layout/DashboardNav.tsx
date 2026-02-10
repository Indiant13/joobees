"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard" },
  { label: "Profile", href: "/dashboard/profile" },
  { label: "Portfolio", href: "/dashboard/portfolio" },
  { label: "Saved", href: "/dashboard/saved" },
  { label: "Settings", href: "/dashboard/settings" },
];

type DashboardNavItemProps = {
  label: string;
  href: string;
  isActive: boolean;
};

function DashboardNavItem({ label, href, isActive }: DashboardNavItemProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-xl border px-3 py-2 text-sm transition ${
        isActive
          ? "border-blue-500/60 bg-blue-50 text-blue-700"
          : "border-transparent text-[rgb(var(--muted))] hover:border-[rgb(var(--border))] hover:bg-[rgb(var(--card))] hover:text-[rgb(var(--fg))]"
      }`}
    >
      {label}
    </Link>
  );
}

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2" aria-label="Dashboard navigation">
      {NAV_ITEMS.map((item) => (
        <DashboardNavItem
          key={item.href}
          label={item.label}
          href={item.href}
          isActive={pathname === item.href}
        />
      ))}
    </nav>
  );
}
