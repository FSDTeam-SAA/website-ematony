export interface PublicFaq {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
  sortOrder?: number;
}

export async function getPublicFaqs(): Promise<PublicFaq[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000/api/v1";

  try {
    const response = await fetch(`${baseUrl}/faqs`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) return [];

    const json = (await response.json()) as { data?: PublicFaq[] };
    return json.data ?? [];
  } catch {
    return [];
  }
}
