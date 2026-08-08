import Image from "next/image";
import Link from "next/link";
import { DownloadAppButton } from "@/app/components/download-modal";
import { SiteHeader } from "@/app/components/site-header";
import { RichText } from "@/app/components/rich-text";

const footerNavigation = [
  { href: "/#about", label: "About Ajo Family" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pathways", label: "Pathways" },
  { href: "/#features", label: "Features" },
  { href: "/#security", label: "Trust" },
  { href: "/#team", label: "Our Team" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact Us" },
  { href: "/#faqs", label: "FAQ" },
];

export function Header() {
  return <SiteHeader />;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#031f18] pb-24 text-white lg:pb-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-8 h-80 w-80 rounded-full border border-[#e99a32]/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-20 h-56 w-56 rounded-full border border-[#e99a32]/10"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-7 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#f4bd63]">
              Your circle, in your pocket
            </p>
            <h2 className="mt-3 max-w-[720px] text-[34px] font-extrabold leading-[1.03] tracking-[-0.035em] text-white sm:text-[48px]">
              Keep saving together, wherever life takes everyone.
            </h2>
          </div>
          <DownloadAppButton className="inline-flex h-[54px] w-full shrink-0 items-center justify-center rounded-full bg-[#e99a32] px-7 text-[15px] font-extrabold text-[#082b21] shadow-[0_16px_36px_rgba(232,140,36,0.18)] transition hover:-translate-y-0.5 hover:bg-[#f4b95d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:w-auto">
            Download the app
          </DownloadAppButton>
        </div>

        <div className="grid gap-10 py-11 md:grid-cols-[1.15fr_0.7fr_0.75fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32] focus-visible:ring-offset-4 focus-visible:ring-offset-[#031f18]"
            >
              <span className="flex h-[68px] w-[84px] items-center justify-center rounded-2xl bg-[#fffaf0] p-2">
                <Image
                  src="/brand/ajo-family-logo.png"
                  alt=""
                  width={147}
                  height={132}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-[19px] font-extrabold text-white">
                  Ajo Family
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-white/55">
                  by Ematony
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-[#bcd0c8]">
              A clearer way for families, friends, and communities to organize
              contributions and follow rotating payouts together.
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#f4bd63]">
              Explore
            </h3>
            <nav aria-label="Footer product navigation" className="mt-5">
              <ul className="grid gap-3.5 text-[15px] font-semibold text-[#d5e2dc]">
                {footerNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-md transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#f4bd63]">
              Legal
            </h3>
            <nav aria-label="Legal" className="mt-5">
              <ul className="grid gap-3.5 text-[15px] font-semibold text-[#d5e2dc]">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="rounded-md transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32]"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="rounded-md transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32]"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </nav>
            <p className="mt-6 max-w-xs text-[13px] leading-6 text-white/50">
              Need help? Use the Contact Us form or support inside the Ajo Family app.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Ematony. All rights reserved.</p>
          <p>Built around the people you already trust.</p>
        </div>
      </div>
    </footer>
  );
}

export function LegalPage({
  title,
  intro,
  content,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  content?: string;
  updated: string;
  sections: Array<{ title: string; body: string[] }>;
}) {
  return (
    <main id="main-content" className="bg-[#fffaf0]">
      <section className="relative overflow-hidden border-b border-[#0c3d2f]/10 bg-[#e7f3e9]">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-28 h-96 w-96 rounded-full border-[48px] border-[#0f5b46]/5"
        />
        <div className="relative mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f684f]">
            Last updated: {updated}
          </p>
          <h1 className="mt-4 max-w-[14ch] text-[42px] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#063627] sm:text-[62px]">
            {title}
          </h1>
          <RichText content={intro} className="mt-5 max-w-3xl text-[17px] leading-8 text-[#50675e] sm:text-[18px]" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="grid gap-5">
          {content ? (
            <article className="rounded-[22px] border border-[#0c3d2f]/10 bg-white p-6 shadow-[0_14px_40px_rgba(6,54,39,0.055)] sm:p-8">
              <RichText content={content} className="text-[15px] leading-7 text-[#536960] sm:text-[16px]" />
            </article>
          ) : sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[22px] border border-[#0c3d2f]/10 bg-white p-6 shadow-[0_14px_40px_rgba(6,54,39,0.055)] sm:p-8"
            >
              <h2 className="text-[24px] font-bold tracking-[-0.02em] text-[#063627] sm:text-[27px]">
                {section.title}
              </h2>
              <RichText content={section.body} className="mt-4 text-[15px] leading-7 text-[#536960] sm:text-[16px]" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
