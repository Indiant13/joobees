import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Admin
            </p>
            <h1 className="text-lg font-semibold text-slate-900">Joobees</h1>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/admin"
              className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Overview
            </Link>
            <Link
              href="/admin/revenue"
              className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Revenue
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
