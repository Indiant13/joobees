type CompanyServiceCompany = {
  id: string;
  name: string;
  logoUrl?: string | null;
};

const COMPANIES: CompanyServiceCompany[] = [
  { id: "company-1", name: "Nimbus Labs", logoUrl: null },
  { id: "company-2", name: "Signal Shore", logoUrl: null },
  { id: "company-3", name: "Aurora Stack", logoUrl: null },
  { id: "company-4", name: "Crafted AI", logoUrl: null },
  { id: "company-5", name: "Orbitly", logoUrl: null },
  { id: "company-6", name: "Lattice Ventures", logoUrl: null },
  { id: "company-7", name: "Beacon Works", logoUrl: null },
  { id: "company-8", name: "Prism Health", logoUrl: null },
  { id: "company-9", name: "Horizon Labs", logoUrl: null },
  { id: "company-10", name: "Threadline", logoUrl: null },
  { id: "company-11", name: "Clearpoint", logoUrl: null },
  { id: "company-12", name: "Nova Forge", logoUrl: null },
];

export function getMockCompanies(ids: string[]): CompanyServiceCompany[] {
  const idSet = new Set(ids);
  return COMPANIES.filter((company) => idSet.has(company.id));
}
