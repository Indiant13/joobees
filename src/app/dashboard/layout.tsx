import type { ReactNode } from "react";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { getBaseUrl } from "@/lib/getBaseUrl";
import type { EmployerOverviewDTO } from "@/types/employerOverview";
import { cookies } from "next/headers";

async function getEmployerOverview(): Promise<EmployerOverviewDTO> {
  const baseUrl = await getBaseUrl();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const res = await fetch(`${baseUrl}/api/employer/overview`, {
    cache: "no-store",
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });

  if (!res.ok) {
    throw new Error("Failed to load employer overview");
  }

  return res.json();
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const overview = await getEmployerOverview();
  return (
    <main className="min-h-screen bg-[rgb(var(--bg))]">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
            Dashboard
          </h2>
          <div className="mt-4">
            <DashboardNav showPostedJobs={overview.hasPostedJobs} />
          </div>
        </aside>
        <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
          {children}
        </section>
      </section>
    </main>
  );
}
