export const BENEFITS = [
  { value: "equity", label: "Equity" },
  { value: "401k", label: "401k" },
  { value: "401k-matching", label: "401k matching" },
  { value: "distributed-team", label: "Distributed team" },
  { value: "async", label: "Async" },
  { value: "vision-insurance", label: "Vision insurance" },
  { value: "dental-insurance", label: "Dental insurance" },
  { value: "medical-insurance", label: "Medical insurance" },
  { value: "unlimited-vacation", label: "Unlimited vacation" },
  { value: "paid-time-off", label: "Paid time off" },
  { value: "4-day-workweek", label: "4-day workweek" },
  { value: "company-retreats", label: "Company retreats" },
  { value: "coworking-budget", label: "Coworking budget" },
  { value: "learning-budget", label: "Learning budget" },
  { value: "free-gym-membership", label: "Free gym membership" },
  { value: "home-office-budget", label: "Home office budget" },
  { value: "conference-budget", label: "Conference budget" },
  { value: "paid-relocation", label: "Paid relocation" },
  { value: "crypto-pay", label: "Crypto pay" },
  { value: "no-degree-required", label: "No degree required" },
] as const;

export type BenefitValue = (typeof BENEFITS)[number]["value"];

export type BenefitOption = {
  value: BenefitValue;
  label: string;
  icon?: string;
};

export const BENEFIT_OPTIONS: BenefitOption[] = BENEFITS.map((benefit) => ({
  ...benefit,
}));

export const BENEFIT_VALUES = new Set<BenefitValue>(
  BENEFITS.map((benefit) => benefit.value),
);
