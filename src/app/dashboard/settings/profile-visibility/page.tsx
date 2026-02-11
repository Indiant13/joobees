import { ProfileVisibilitySettingsCard } from "@/features/profile-visibility/ProfileVisibilitySettingsCard";

export default function ProfileVisibilitySettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--fg))]">
          Profile visibility
        </h1>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          Control what appears on your public profile.
        </p>
      </div>
      <ProfileVisibilitySettingsCard />
    </div>
  );
}
