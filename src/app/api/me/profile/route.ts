import type { ProfileEditorDTO } from "@/types/profileEditor";

export async function GET() {
  const data: ProfileEditorDTO = {
    basic: {
      bio: "Remote product designer focused on fintech and collaboration tools.",
      skills: ["Product Design", "Figma", "Design Systems"],
      languages: ["English", "German"],
    },
    identity: {
      displayName: "Gina Urban",
      username: "gina",
    },
    location: {
      currentCountry: "Germany",
      residencyCountry: "Germany",
      nationality: "Italian",
    },
    contact: {
      email: "gina@joobees.com",
      emailNotifications: true,
      preferredContact: "@gina",
    },
    links: {
      website: "https://gina.design",
      telegram: "https://t.me/gina",
      github: "https://github.com/gina",
      x: "https://x.com/gina",
      linkedin: "https://linkedin.com/in/gina",
      nomadList: "https://nomadlist.com/@gina",
      instagram: "https://instagram.com/gina",
    },
    availability: {
      availableForWork: true,
      availableFrom: "2026-02-15",
      preferredTimezones: ["CET", "GMT"],
      minAnnualUsd: "90000",
      minHourlyUsd: "60",
    },
    portfolio: {
      employment: [
        {
          id: "emp-1",
          title: "Senior Product Designer",
          organization: "Nimbus Labs",
          start: "2023",
          end: "Present",
          summary: "Led design systems and onboarding",
        },
      ],
      projects: [
        {
          id: "proj-1",
          title: "Remote onboarding",
          organization: "Joobees",
          start: "2024",
          end: "2025",
          summary: "Designed remote-first onboarding flows",
        },
      ],
      education: [
        {
          id: "edu-1",
          title: "BA Industrial Design",
          organization: "Politecnico di Milano",
          start: "2016",
          end: "2020",
          summary: "Product design and research",
        },
      ],
    },
    meta: {
      lastSeen: "2026-02-10",
      signedUp: "2024-05-02",
      badges: ["Remote Ready", "Top 10%"],
    },
    avatarUrl: null,
  };

  return Response.json(data, {
    headers: {
      "Cache-Control": "private, max-age=30",
    },
  });
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as Partial<ProfileEditorDTO>;

  const data: ProfileEditorDTO = {
    basic: {
      bio: body.basic?.bio ?? "Remote product designer focused on fintech and collaboration tools.",
      skills: body.basic?.skills ?? ["Product Design", "Figma", "Design Systems"],
      languages: body.basic?.languages ?? ["English", "German"],
    },
    identity: {
      displayName: body.identity?.displayName ?? "Gina Urban",
      username: "gina",
    },
    location: {
      currentCountry: body.location?.currentCountry ?? "Germany",
      residencyCountry: body.location?.residencyCountry ?? "Germany",
      nationality: body.location?.nationality ?? "Italian",
    },
    contact: {
      email: "gina@joobees.com",
      emailNotifications: body.contact?.emailNotifications ?? true,
      preferredContact: body.contact?.preferredContact ?? "@gina",
    },
    links: {
      website: body.links?.website ?? "https://gina.design",
      telegram: body.links?.telegram ?? "https://t.me/gina",
      github: body.links?.github ?? "https://github.com/gina",
      x: body.links?.x ?? "https://x.com/gina",
      linkedin: body.links?.linkedin ?? "https://linkedin.com/in/gina",
      nomadList: body.links?.nomadList ?? "https://nomadlist.com/@gina",
      instagram: body.links?.instagram ?? "https://instagram.com/gina",
    },
    availability: {
      availableForWork: body.availability?.availableForWork ?? true,
      availableFrom: body.availability?.availableFrom ?? "2026-02-15",
      preferredTimezones: body.availability?.preferredTimezones ?? ["CET", "GMT"],
      minAnnualUsd: body.availability?.minAnnualUsd ?? "90000",
      minHourlyUsd: body.availability?.minHourlyUsd ?? "60",
    },
    portfolio: {
      employment: body.portfolio?.employment ?? [],
      projects: body.portfolio?.projects ?? [],
      education: body.portfolio?.education ?? [],
    },
    meta: {
      lastSeen: "2026-02-10",
      signedUp: "2024-05-02",
      badges: ["Remote Ready", "Top 10%"],
    },
    avatarUrl: null,
  };

  return Response.json(data);
}
