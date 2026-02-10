import type { ReactNode } from "react";
import { DashboardNav } from "@/components/layout/DashboardNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[rgb(var(--bg))]">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Dashboard
          </h2>
          <div className="mt-4">
            <DashboardNav />
          </div>
        </aside>
        <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
          {children}
        </section>
      </section>
    </main>
  );
}
