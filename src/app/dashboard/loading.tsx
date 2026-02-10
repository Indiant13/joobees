export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[rgb(var(--bg))]">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-[240px_1fr]">
        <aside
          className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-sm"
          aria-label="Dashboard navigation"
        >
          <div className="h-3 w-24 rounded-full bg-slate-200" />
          <div className="mt-4 flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-9 rounded-xl bg-slate-100"
                aria-hidden="true"
              />
            ))}
          </div>
        </aside>
        <section
          className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="h-6 w-48 rounded-full bg-slate-200" />
          <div className="mt-4 h-4 w-72 rounded-full bg-slate-100" />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="h-40 rounded-2xl bg-slate-100" />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
