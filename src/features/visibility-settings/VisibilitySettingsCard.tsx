"use client";

import { useEffect, useState } from "react";
import type { VisibilitySettingsDTO } from "@/types/visibilitySettings";

const DEFAULT_SETTINGS: VisibilitySettingsDTO = {
  showAvatar: true,
  showBio: true,
  showLocation: true,
  showTimezone: true,
  showLinks: true,
  showBadges: true,
  showStats: true,
};

const FIELDS: { key: keyof VisibilitySettingsDTO; label: string }[] = [
  { key: "showAvatar", label: "Show avatar" },
  { key: "showBio", label: "Show bio" },
  { key: "showLocation", label: "Show location" },
  { key: "showTimezone", label: "Show timezone" },
  { key: "showLinks", label: "Show links" },
  { key: "showBadges", label: "Show badges" },
  { key: "showStats", label: "Show stats" },
];

export function VisibilitySettingsCard() {
  const [settings, setSettings] = useState<VisibilitySettingsDTO>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/me/visibility", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : DEFAULT_SETTINGS))
      .then((data: VisibilitySettingsDTO) => {
        if (isMounted) {
          setSettings(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSettings(DEFAULT_SETTINGS);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleSetting = (key: keyof VisibilitySettingsDTO) => {
    const nextValue = !settings[key];
    const next = { ...settings, [key]: nextValue };
    setSettings(next);
    setIsSaving(true);
    fetch("/api/me/visibility", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: nextValue }),
    })
      .then(() => setIsSaving(false))
      .catch(() => setIsSaving(false));
  };

  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Public profile visibility</h2>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">
            Choose what appears on your public profile.
          </p>
        </div>
        {isSaving ? (
          <span className="text-xs text-[rgb(var(--muted))]">Saving…</span>
        ) : null}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {FIELDS.map((field) => (
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
                  settings[field.key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
