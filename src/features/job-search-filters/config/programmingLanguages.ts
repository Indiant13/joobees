export const PROGRAMMING_LANGUAGES = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
  { value: "c-sharp", label: "C#" },
  { value: "c-plus-plus", label: "C++" },
  { value: "c", label: "C" },
  { value: "go", label: "Go (Golang)" },
  { value: "rust", label: "Rust" },
  { value: "typescript", label: "TypeScript" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "php", label: "PHP" },
  { value: "sql", label: "SQL" },
  { value: "dart", label: "Dart" },
  { value: "matlab", label: "MATLAB" },
  { value: "r", label: "R" },
  { value: "scratch", label: "Scratch" },
  { value: "assembly", label: "Assembly" },
  { value: "groovy", label: "Groovy" },
  { value: "visual-basic", label: "Visual Basic (VBA / VB.NET)" },
] as const;

export type ProgrammingLanguageValue =
  (typeof PROGRAMMING_LANGUAGES)[number]["value"];

export const PROGRAMMING_LANGUAGE_OPTIONS = PROGRAMMING_LANGUAGES.map(
  (language) => ({
    ...language,
  }),
);

export const PROGRAMMING_LANGUAGE_VALUES = new Set<ProgrammingLanguageValue>(
  PROGRAMMING_LANGUAGES.map((language) => language.value),
);
