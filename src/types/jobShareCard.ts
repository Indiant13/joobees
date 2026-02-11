export type JobShareCardDTO = {
  company: {
    name: string;
    logoUrl?: string | null;
  };
  shortUrl: string;
  qrCodeUrl: string;
  promoted?: boolean;
};
