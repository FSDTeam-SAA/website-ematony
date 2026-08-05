import type { Metadata } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const title = "Ajo Family by Ematony | Save Together, Clearly";
const description =
  "Plan contributions, follow each payment, and coordinate rotating payouts with family, friends, and trusted communities in one mobile app.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Ajo Family by Ematony",
  title: {
    default: title,
    template: "%s | Ajo Family by Ematony",
  },
  description,
  keywords: [
    "Ajo Family",
    "Ematony",
    "ajo savings app",
    "group savings",
    "rotating savings",
    "family savings",
    "community contributions",
    "Nigeria savings app",
  ],
  creator: "Ematony",
  publisher: "Ematony",
  category: "finance",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Ajo Family by Ematony",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/brand/ajo-icon.png",
    apple: "/brand/ajo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
