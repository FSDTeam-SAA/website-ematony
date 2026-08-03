import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfitHeading = Outfit({
  variable: "--font-outfit-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Ematony | Ajo Family",
    template: "%s | Ematony",
  },
  description:
    "Ematony helps trusted circles save together, manage rotating payouts, and build community investments with confidence.",
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
      className={`${outfit.variable} ${outfitHeading.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
