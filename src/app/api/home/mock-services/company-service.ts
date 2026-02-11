type CompanyServiceCompany = {
  id: string;
  name: string;
  logoUrl?: string | null;
};

function createLogoUrl(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" rx="40" fill="#0f172a"/><text x="50%" y="54%" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#ffffff" font-weight="700">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const COMPANIES: CompanyServiceCompany[] = [
  { id: "company-1", name: "Nimbus Labs", logoUrl: createLogoUrl("Nimbus Labs") },
  { id: "company-2", name: "Signal Shore", logoUrl: createLogoUrl("Signal Shore") },
  { id: "company-3", name: "Aurora Stack", logoUrl: createLogoUrl("Aurora Stack") },
  { id: "company-4", name: "Crafted AI", logoUrl: createLogoUrl("Crafted AI") },
  { id: "company-5", name: "Orbitly", logoUrl: createLogoUrl("Orbitly") },
  { id: "company-6", name: "Lattice Ventures", logoUrl: createLogoUrl("Lattice Ventures") },
  { id: "company-7", name: "Beacon Works", logoUrl: createLogoUrl("Beacon Works") },
  { id: "company-8", name: "Prism Health", logoUrl: createLogoUrl("Prism Health") },
  { id: "company-9", name: "Horizon Labs", logoUrl: createLogoUrl("Horizon Labs") },
  { id: "company-10", name: "Threadline", logoUrl: createLogoUrl("Threadline") },
  { id: "company-11", name: "Clearpoint", logoUrl: createLogoUrl("Clearpoint") },
  { id: "company-12", name: "Nova Forge", logoUrl: createLogoUrl("Nova Forge") },
];

export function getMockCompanies(ids: string[]): CompanyServiceCompany[] {
  const idSet = new Set(ids);
  return COMPANIES.filter((company) => idSet.has(company.id));
}
