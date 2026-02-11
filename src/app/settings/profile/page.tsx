import { VisibilitySettingsCard } from "@/features/visibility-settings/VisibilitySettingsCard";

export default function ProfileSettingsPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Edit profile</h1>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          Control what appears on your public profile.
        </p>
        <div className="mt-6">
          <VisibilitySettingsCard />
        </div>
      </section>
    </main>
  );
}
