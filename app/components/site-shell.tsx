import Image from "next/image";
import Link from "next/link";
import { DownloadAppButton } from "@/app/components/download-modal";

const navItems = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#faqs", label: "FAQ" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms-of-service", label: "Terms" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#dbe8df] bg-[#fffcf6]/92 backdrop-blur">
      <div className="mx-auto flex min-h-[76px] w-full max-w-7xl items-center justify-between gap-3 overflow-hidden px-4 sm:gap-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Ematony home">
          <Image
            src="/brand/ajo-family-logo.png"
            alt="Ajo Family"
            width={116}
            height={96}
            priority
            className="h-[50px] w-auto object-contain sm:h-[58px]"
          />
        </Link>

        <nav className="hidden items-center gap-5 text-[15px] font-medium text-[#245446] lg:flex xl:gap-7">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#063627]">
              {item.label}
            </Link>
          ))}
        </nav>

        <DownloadAppButton className="hidden h-11 shrink-0 items-center justify-center rounded-[12px] bg-[#063627] px-5 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(6,54,39,0.18)] transition hover:bg-[#146456] sm:inline-flex">
          Get started
        </DownloadAppButton>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#04261d] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src="/brand/ajo-family-logo.png"
            alt="Ajo Family"
            width={132}
            height={110}
            className="h-[72px] w-auto object-contain"
          />
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-[#d7e7dd]">
            Ematony brings trusted savings circles, rotating payouts, wallets,
            and community investment planning into one calm mobile experience.
          </p>
        </div>

        <div>
          <h3 className="text-[16px] font-semibold text-white">Product</h3>
          <div className="mt-4 grid gap-3 text-[15px] text-[#d7e7dd]">
            <Link href="/#how-it-works" className="hover:text-white">
              How it works
            </Link>
            <Link href="/#features" className="hover:text-white">
              Features
            </Link>
            <Link href="/#security" className="hover:text-white">
              Trust and security
            </Link>
            <Link href="/#faqs" className="hover:text-white">
              FAQ
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-[16px] font-semibold text-white">Company</h3>
          <div className="mt-4 grid gap-3 text-[15px] text-[#d7e7dd]">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-[14px] text-[#bed1c5]">
        &copy; {new Date().getFullYear()} Ematony. All rights reserved.
      </div>
    </footer>
  );
}

export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: Array<{ title: string; body: string[] }>;
}) {
  return (
    <main className="bg-[#fffcf6]">
      <section className="border-b border-[#e4e7ec] bg-[#e8f5ec]">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-[14px] font-semibold uppercase text-[#146456]">
            Last updated: {updated}
          </p>
          <h1 className="mt-4 text-[40px] font-extrabold leading-[1.05] text-[#063627] sm:text-[56px]">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-[18px] leading-8 text-[#51645a]">
            {intro}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[8px] border border-[#e4e7ec] bg-white p-6 shadow-[0_12px_36px_rgba(6,54,39,0.06)]"
            >
              <h2 className="text-[24px] font-bold text-[#063627]">
                {section.title}
              </h2>
              <div className="mt-4 grid gap-4 text-[16px] leading-7 text-[#51645a]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
