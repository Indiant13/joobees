export type TimelineEntry = {
  id: string;
  title: string;
  organization: string;
  start: string;
  end?: string;
  summary?: string;
};

export type ProfileEditorDTO = {
  basic: {
    bio: string;
    skills: string[];
    languages: string[];
  };
  identity: {
    displayName: string;
    username: string;
  };
  location: {
    currentCountry: string;
    residencyCountry: string;
    nationality: string;
  };
  contact: {
    email: string;
    emailNotifications: boolean;
    preferredContact: string;
  };
  links: {
    website: string;
    telegram: string;
    github: string;
    x: string;
    linkedin: string;
    nomadList: string;
    instagram: string;
  };
  availability: {
    availableForWork: boolean;
    availableFrom: string;
    preferredTimezones: string[];
    minAnnualUsd: string;
    minHourlyUsd: string;
  };
  portfolio: {
    employment: TimelineEntry[];
    projects: TimelineEntry[];
    education: TimelineEntry[];
  };
  meta: {
    lastSeen: string;
    signedUp: string;
    badges: string[];
  };
  avatarUrl: string | null;
};

export type ProfilePatchDTO = Partial<{
  basic: Partial<ProfileEditorDTO["basic"]>;
  identity: Partial<ProfileEditorDTO["identity"]>;
  location: Partial<ProfileEditorDTO["location"]>;
  contact: Partial<ProfileEditorDTO["contact"]>;
  links: Partial<ProfileEditorDTO["links"]>;
  availability: Partial<ProfileEditorDTO["availability"]>;
  portfolio: Partial<ProfileEditorDTO["portfolio"]>;
}>;

