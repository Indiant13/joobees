import Link from "next/link";

export default function ProfileSettingsPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Edit profile</h1>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          Profile settings will live here.
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard/settings/profile-visibility"
            className="inline-flex rounded-full border border-[rgb(var(--border))] px-4 py-2 text-sm text-[rgb(var(--muted))] transition hover:border-blue-500/40 hover:text-[rgb(var(--fg))]"
          >
            Profile visibility
          </Link>
        </div>
      </section>
    </main>
  );
}
