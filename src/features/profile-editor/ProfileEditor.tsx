"use client";

import type { ProfileEditorDTO } from "@/types/profileEditor";
import { AvatarUploader } from "@/features/profile-editor/AvatarUploader";
import { BasicInfoSection } from "@/features/profile-editor/sections/BasicInfoSection";
import { IdentitySection } from "@/features/profile-editor/sections/IdentitySection";
import { LocationSection } from "@/features/profile-editor/sections/LocationSection";
import { ContactSection } from "@/features/profile-editor/sections/ContactSection";
import { LinksSection } from "@/features/profile-editor/sections/LinksSection";
import { AvailabilitySection } from "@/features/profile-editor/sections/AvailabilitySection";
import { PortfolioSection } from "@/features/profile-editor/sections/PortfolioSection";
import { useProfileEditor } from "@/features/profile-editor/useProfileEditor";

export type ProfileEditorProps = {
  initialData: ProfileEditorDTO;
};

export function ProfileEditor({ initialData }: ProfileEditorProps) {
  const { profile, saveState, updateSection, retry, updateAvatar, retryAvatar } =
    useProfileEditor(initialData);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold">Edit profile</h1>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          Update each section independently. Changes save automatically.
        </p>
      </header>

      <AvatarUploader
        avatarUrl={profile.avatarUrl}
        state={saveState.avatar}
        onUpload={updateAvatar}
        onRetry={retryAvatar}
        canRetry={saveState.avatar === "error"}
      />

      <IdentitySection
        displayName={profile.identity.displayName}
        username={profile.identity.username}
        state={saveState.identity}
        onSave={(value) =>
          updateSection("identity", { identity: value }, {
            ...profile,
            identity: { ...profile.identity, ...value },
          })
        }
        onRetry={() => retry("identity")}
      />

      <BasicInfoSection
        bio={profile.basic.bio}
        skills={profile.basic.skills}
        languages={profile.basic.languages}
        state={saveState.basic}
        onSave={(value) =>
          updateSection("basic", { basic: value }, {
            ...profile,
            basic: { ...profile.basic, ...value },
          })
        }
        onRetry={() => retry("basic")}
      />

      <LocationSection
        currentCountry={profile.location.currentCountry}
        residencyCountry={profile.location.residencyCountry}
        nationality={profile.location.nationality}
        state={saveState.location}
        onSave={(value) =>
          updateSection("location", { location: value }, {
            ...profile,
            location: { ...profile.location, ...value },
          })
        }
        onRetry={() => retry("location")}
      />

      <ContactSection
        email={profile.contact.email}
        emailNotifications={profile.contact.emailNotifications}
        preferredContact={profile.contact.preferredContact}
        state={saveState.contact}
        onSave={(value) =>
          updateSection("contact", { contact: value }, {
            ...profile,
            contact: { ...profile.contact, ...value },
          })
        }
        onRetry={() => retry("contact")}
      />

      <LinksSection
        links={profile.links}
        state={saveState.links}
        onSave={(value) =>
          updateSection("links", { links: value }, { ...profile, links: value })
        }
        onRetry={() => retry("links")}
      />

      <AvailabilitySection
        availableForWork={profile.availability.availableForWork}
        availableFrom={profile.availability.availableFrom}
        preferredTimezones={profile.availability.preferredTimezones}
        minAnnualUsd={profile.availability.minAnnualUsd}
        minHourlyUsd={profile.availability.minHourlyUsd}
        state={saveState.availability}
        onSave={(value) =>
          updateSection("availability", { availability: value }, {
            ...profile,
            availability: { ...profile.availability, ...value },
          })
        }
        onRetry={() => retry("availability")}
      />

      <PortfolioSection
        title="Employment"
        items={profile.portfolio.employment}
        state={saveState.employment}
        onSave={(items) =>
          updateSection(
            "employment",
            { portfolio: { employment: items } },
            {
              ...profile,
              portfolio: { ...profile.portfolio, employment: items },
            },
          )
        }
        onRetry={() => retry("employment")}
      />

      <PortfolioSection
        title="Projects"
        items={profile.portfolio.projects}
        state={saveState.projects}
        onSave={(items) =>
          updateSection(
            "projects",
            { portfolio: { projects: items } },
            {
              ...profile,
              portfolio: { ...profile.portfolio, projects: items },
            },
          )
        }
        onRetry={() => retry("projects")}
      />

      <PortfolioSection
        title="Education"
        items={profile.portfolio.education}
        state={saveState.education}
        onSave={(items) =>
          updateSection(
            "education",
            { portfolio: { education: items } },
            {
              ...profile,
              portfolio: { ...profile.portfolio, education: items },
            },
          )
        }
        onRetry={() => retry("education")}
      />

      <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 text-sm text-[rgb(var(--muted))] shadow-sm">
        <h2 className="text-sm font-semibold">Meta</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p>Last seen: {profile.meta.lastSeen}</p>
          <p>Signed up: {profile.meta.signedUp}</p>
          <p>Badges: {profile.meta.badges.join(", ") || "None"}</p>
        </div>
      </section>
    </div>
  );
}

