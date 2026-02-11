export type JobDetailsDTO = {
  id: string;
  title: string;
  company: {
    name: string;
    logoUrl?: string | null;
  };
  location: string;
  salary?: string | null;
  employmentType: string;
  seniority: string;
  description: string;
  tags: string[];
  applyUrl: string;
  promotions?: string[];
  shareCard: {
    company: {
      name: string;
      logoUrl?: string | null;
    };
    shortUrl: string;
    qrCodeUrl: string;
    promoted?: boolean;
  };
};
