export interface SitePageSection {
  title: string;
  body: string[];
}

export interface PublicSitePage {
  _id?: string;
  slug: "about-ajo-family" | "privacy-policy" | "terms-of-service" | "contact";
  title: string;
  intro: string;
  content?: string;
  updatedLabel?: string;
  sections: SitePageSection[];
  email?: string;
  phone?: string;
  address?: string;
  supportHours?: string;
}

export interface PublicTeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

export interface PublicTestimonial {
  _id: string;
  name: string;
  review: string;
  rating: number;
  location?: string;
  imageUrl?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000/api/v1";

function normalizePublicBranding<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replace(/Ajo Family\s+by\s+Ematony/gi, "Ajo Family")
      .replace(/Ematony\s+Ajo Family/gi, "Ajo Family")
      .replace(/\bEmatony\b/gi, "Ajo Family") as T;
  }

  if (Array.isArray(value)) {
    return value.map(normalizePublicBranding) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        normalizePublicBranding(entry),
      ]),
    ) as T;
  }

  return value;
}

async function getData<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) return fallback;
    const json = (await response.json()) as { data?: T };
    return normalizePublicBranding(json.data ?? fallback);
  } catch {
    return fallback;
  }
}

export function getPublicPage(slug: PublicSitePage["slug"], fallback: PublicSitePage) {
  return getData<PublicSitePage>(`/content/${slug}`, fallback);
}

export function getPublicTeam() {
  return getData<PublicTeamMember[]>("/content/team", []);
}

export function getPublicTestimonials() {
  return getData<PublicTestimonial[]>("/content/testimonials", []);
}

export const defaultAboutPage: PublicSitePage = {
  slug: "about-ajo-family",
  title: "A familiar tradition, made clearer",
  intro:
    "Ajo Family helps families, friends, and trusted communities organize rotating savings with shared visibility and a simple mobile experience.",
  sections: [
    { title: "The tradition", body: ["Ajo has helped people save together for generations. Members contribute on an agreed schedule, and each person receives the collected amount when their turn arrives."] },
    { title: "The problem", body: ["Traditional groups often depend on paper records, scattered messages, cash collection, and one person remembering every payment and payout. That can make progress hard to verify and disagreements harder to resolve."] },
    { title: "The Ajo Family solution", body: ["Ajo Family brings membership, contribution schedules, wallet activity, payout order, notifications, and support into one place so every member can understand what is happening."] },
  ],
};

export const defaultContactPage: PublicSitePage = {
  slug: "contact",
  title: "Contact Us",
  intro: "Questions about Ajo Family? Send our team a message or use the official contact details below.",
  email: "info@ajofamily.tech",
  phone: "",
  address: "",
  supportHours: "Monday to Friday, 9:00 AM–5:00 PM",
  sections: [],
};
