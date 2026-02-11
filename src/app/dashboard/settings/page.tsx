import { ProfileVisibilitySettingsCard } from "@/features/profile-visibility/ProfileVisibilitySettingsCard";

export default function DashboardSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mt-2 text-sm text-[rgb(var(--muted))]">
        Settings placeholder.
      </p>
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-[rgb(var(--fg))]">
          Profile visibility
        </h2>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Control what appears on your public profile.
        </p>
        <div className="mt-4">
          <ProfileVisibilitySettingsCard />
        </div>
      </div>
    </div>
  );
}
