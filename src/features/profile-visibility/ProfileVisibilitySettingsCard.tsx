"use client";

import { useEffect, useState } from "react";
import type { ProfileVisibilitySettings } from "@/types/profileVisibility";
import { DEFAULT_VISIBILITY } from "@/features/profile-visibility/defaults";

const SECTIONS: {
  title: string;
  fields: { key: keyof ProfileVisibilitySettings; label: string }[];
}[] = [
  {
    title: "Profile basics",
    fields: [
      { key: "showAvatar", label: "Avatar" },
      { key: "showLocation", label: "Location" },
      { key: "showBio", label: "Bio" },
      { key: "showSkills", label: "Skills" },
      { key: "showLanguages", label: "Languages" },
    ],
  },
  {
    title: "Social links",
    fields: [
      { key: "showWebsite", label: "Website" },
      { key: "showGithub", label: "GitHub" },
      { key: "showLinkedin", label: "LinkedIn" },
    ],
  },
  {
    title: "Portfolio",
    fields: [
      { key: "showPortfolio", label: "Portfolio section" },
      { key: "showEmployment", label: "Employment" },
      { key: "showEducation", label: "Education" },
    ],
  },
  {
    title: "Activity",
    fields: [
      { key: "showAvailability", label: "Availability" },
      { key: "showLastSeen", label: "Last seen" },
    ],
  },
];

export function ProfileVisibilitySettingsCard() {
  const [settings, setSettings] =
    useState<ProfileVisibilitySettings>(DEFAULT_VISIBILITY);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/me/profile/visibility", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : DEFAULT_VISIBILITY))
      .then((data: ProfileVisibilitySettings) => {
        if (isMounted) {
          setSettings(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSettings(DEFAULT_VISIBILITY);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleSetting = (key: keyof ProfileVisibilitySettings) => {
    const nextValue = !settings[key];
    const next = { ...settings, [key]: nextValue };
    setSettings(next);
    setIsSaving(true);
    fetch("/api/me/profile/visibility", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: nextValue }),
    })
      .then(() => setIsSaving(false))
      .catch(() => setIsSaving(false));
  };

  const allEnabled = Object.values(settings).every(Boolean);

  const toggleAll = () => {
    const next = allEnabled
      ? { ...DEFAULT_VISIBILITY }
      : Object.fromEntries(
          Object.keys(DEFAULT_VISIBILITY).map((key) => [key, true]),
        );
    setSettings(next as ProfileVisibilitySettings);
    setIsSaving(true);
    fetch("/api/me/profile/visibility", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    })
      .then(() => setIsSaving(false))
      .catch(() => setIsSaving(false));
  };

  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Profile visibility</h2>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">
            Choose which fields appear on your public profile.
          </p>
        </div>
        {isSaving ? (
          <span className="text-xs text-[rgb(var(--muted))]">Saving…</span>
        ) : null}
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={toggleAll}
          className="flex w-full items-center justify-between rounded-xl border border-[rgb(var(--border))] px-4 py-3 text-sm text-[rgb(var(--fg))] transition hover:border-blue-500/40 hover:bg-blue-50/20"
        >
          <span>Make profile fully public</span>
          <span
            className={`h-5 w-10 rounded-full p-0.5 transition ${
              allEnabled ? "bg-blue-500" : "bg-[rgb(var(--border))]"
            }`}
          >
            <span
              className={`block h-4 w-4 rounded-full bg-white transition ${
                allEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </span>
        </button>
      </div>
      <div className="mt-6 grid gap-6">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
              {section.title}
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {section.fields.map((field) => (
                <button
                  key={field.key}
                  type="button"
                  onClick={() => toggleSetting(field.key)}
                  className="flex items-center justify-between rounded-xl border border-[rgb(var(--border))] px-4 py-3 text-sm text-[rgb(var(--fg))] transition hover:border-blue-500/40 hover:bg-blue-50/20"
                >
                  <span>{field.label}</span>
                  <span
                    className={`h-5 w-10 rounded-full p-0.5 transition ${
                      settings[field.key]
                        ? "bg-blue-500"
                        : "bg-[rgb(var(--border))]"
                    }`}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white transition ${
                        settings[field.key]
                          ? "translate-x-5"
                          : "translate-x-0"
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
