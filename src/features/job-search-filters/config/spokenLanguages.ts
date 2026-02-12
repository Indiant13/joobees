export const SPOKEN_LANGUAGES = [
  { value: "english", label: "English" },
  { value: "mandarin", label: "Mandarin Chinese" },
  { value: "hindi", label: "Hindi" },
  { value: "spanish", label: "Spanish" },
  { value: "arabic", label: "Arabic" },
  { value: "french", label: "French" },
  { value: "bengali", label: "Bengali" },
  { value: "portuguese", label: "Portuguese" },
  { value: "russian", label: "Russian" },
  { value: "urdu", label: "Urdu" },
] as const;

export type SpokenLanguageValue = (typeof SPOKEN_LANGUAGES)[number]["value"];

export const SPOKEN_LANGUAGE_OPTIONS = SPOKEN_LANGUAGES.map((language) => ({
  ...language,
}));

export const SPOKEN_LANGUAGE_VALUES = new Set<SpokenLanguageValue>(
  SPOKEN_LANGUAGES.map((language) => language.value),
);
