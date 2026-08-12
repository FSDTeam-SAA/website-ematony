import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarClock,
  Check,
  Eye,
  Fingerprint,
  Headphones,
  Layers3,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareQuote,
  Phone,
  RotateCw,
  Sparkles,
  UserCheck,
  Users,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  DownloadAppButton,
  StoreButtons,
} from "@/app/components/download-modal";
import { FaqAccordion } from "@/app/components/faq-accordion";
import { ContactForm } from "@/app/components/contact-form";
import { RichText } from "@/app/components/rich-text";
import { TestimonialCarousel } from "@/app/components/testimonial-carousel";
import { TeamCarousel } from "@/app/components/team-carousel";
import {
  MotionPage,
  Reveal,
  SavingsCycle,
  SavingsOrbit,
} from "@/app/components/landing-interactions";
import { Footer, Header } from "@/app/components/site-shell";
import { getPublicFaqs } from "@/app/lib/faqs";
import {
  defaultAboutPage,
  defaultContactPage,
  getPublicPage,
  getPublicTeam,
  getPublicTestimonials,
} from "@/app/lib/content";

export const revalidate = 300;

type Pathway = {
  number: string;
  title: string;
  label: string;
  description: string;
  detail: string;
  image: string;
  width: number;
  height: number;
  accent: string;
};

const pathways: Pathway[] = [
  {
    number: "01",
    title: "Family circles",
    label: "For the people closest to you",
    description:
      "Keep school plans, celebrations, emergencies, and shared family goals moving with one visible contribution rhythm.",
    detail: "Everyday goals",
    image: "/brand/campaign/path-family.jpg",
    width: 951,
    height: 1654,
    accent: "bg-[#fff1d7] text-[#8a4b08]",
  },
  {
    number: "02",
    title: "Friends circles",
    label: "For your trusted crew",
    description:
      "Turn regular saving into a shared habit everyone can follow—whether your circle is nearby or across borders.",
    detail: "Nigeria + diaspora",
    image: "/brand/campaign/path-friends.jpg",
    width: 1024,
    height: 1536,
    accent: "bg-[#e7f4eb] text-[#146456]",
  },
  {
    number: "03",
    title: "Community circles",
    label: "For goals with a wider reach",
    description:
      "Coordinate contributions around a trusted group and create a clearer path toward meaningful community projects.",
    detail: "Shared progress",
    image: "/brand/campaign/path-community.jpg",
    width: 1023,
    height: 1537,
    accent: "bg-[#ede9fe] text-[#5b3ca0]",
  },
];

const productFeatures: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  kind: "group" | "wheel" | "wallet" | "contributions";
  layout: string;
}> = [
  {
    title: "Group",
    description:
      "Keep members, the circle purpose, and shared progress in one place.",
    icon: Layers3,
    kind: "group",
    layout: "sm:col-span-2 lg:col-span-1",
  },
  {
    title: "Wheel",
    description:
      "See the rotation and understand whose payout turn is coming next.",
    icon: RotateCw,
    kind: "wheel",
    layout: "",
  },
  {
    title: "Wallet",
    description:
      "Follow wallet activity in the context of the circle it belongs to.",
    icon: WalletCards,
    kind: "wallet",
    layout: "",
  },
  {
    title: "Contributions",
    description:
      "Keep complete, upcoming, and scheduled contribution states easy to scan.",
    icon: CalendarClock,
    kind: "contributions",
    layout: "sm:col-span-2 lg:col-span-1",
  },
];

const trustPoints: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Member verification",
    description:
      "Identity checks support clearer participation before important wallet and payout actions.",
    icon: Fingerprint,
  },
  {
    title: "Visible activity",
    description:
      "Members can follow contribution status and upcoming group activity without relying on scattered messages.",
    icon: Eye,
  },
  {
    title: "Timely reminders",
    description:
      "Notifications bring due dates, group updates, and important payment moments back into view.",
    icon: BellRing,
  },
  {
    title: "A route to support",
    description:
      "When something needs attention, members can raise an issue and follow it through the app.",
    icon: Headphones,
  },
];

function HeroVisual() {
  return (
    <div className="relative mx-auto min-h-[440px] w-full max-w-[680px] sm:min-h-[580px] lg:min-h-[650px]">
      <div className="absolute inset-x-0 top-5 overflow-hidden rounded-[38px] border border-white/15 bg-[#174f42] shadow-[0_45px_120px_rgba(0,0,0,0.30)] lg:inset-x-4 lg:top-0">
        <div className="relative h-[420px] w-full sm:h-[540px] lg:h-[620px]">
          <Image
            src="/brand/campaign/hero-circle.jpg"
            alt="Campaign artwork of a Nigerian family and friends circle looking at a phone together"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="object-cover object-[62%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03261d]/85 via-transparent to-transparent" />
          <div className="absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-[#03261d]/55 to-transparent" />
        </div>
      </div>

      <div className="absolute -left-1 bottom-2 z-20 w-[140px] rotate-[-4deg] sm:bottom-3 sm:w-[205px] lg:-left-5 lg:w-[232px]">
        <div className="phone-frame gold-ring aspect-[390/720] w-full">
          <Image
            src="/brand/wheel-screen.png"
            alt="Ajo Family savings pool and payout wheel screen"
            width={390}
            height={1472}
            sizes="232px"
            className="h-full w-full rounded-[23px] object-cover object-top"
          />
        </div>
      </div>

      <div className="absolute -right-3 top-0 z-20 hidden h-44 w-44 lg:block">
        <SavingsOrbit />
      </div>

      <div className="glass-panel absolute bottom-4 left-[116px] right-3 z-20 rounded-[22px] p-3 text-white sm:bottom-7 sm:left-[190px] sm:right-4 sm:p-4 lg:left-[215px] lg:right-0 lg:p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="hidden text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#f6cb78] sm:block">
              Your circle at a glance
            </p>
            <p className="text-[14px] font-semibold leading-5 sm:mt-1 sm:text-[19px] sm:leading-6">
              Contributions, payout order, and members—together.
            </p>
          </div>
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f5b94b] text-[#063627] sm:flex">
            <RotateCw aria-hidden="true" size={22} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PathwayCard({ pathway }: { pathway: Pathway }) {
  return (
    <article className="pathway-card group flex h-full flex-col overflow-hidden rounded-[30px] border border-[#dbe5de] bg-white">
      <div className="relative aspect-[4/4.7] overflow-hidden">
        <Image
          src={pathway.image}
          alt={`Campaign artwork for ${pathway.title.toLowerCase()}, showing people planning a savings goal together`}
          width={pathway.width}
          height={pathway.height}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03261d]/90 via-[#03261d]/5 to-transparent" />
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className={`rounded-full px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] ${pathway.accent}`}>
            {pathway.detail}
          </span>
        </div>
        <span className="absolute bottom-4 right-5 font-heading text-[54px] font-bold leading-none text-white/20">
          {pathway.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.13em] text-[#8a4b08]">
          {pathway.label}
        </p>
        <h3 className="mt-3 text-[30px] font-bold leading-none text-[#063627]">
          {pathway.title}
        </h3>
        <p className="mt-4 flex-1 text-[16px] leading-7 text-[#587066]">
          {pathway.description}
        </p>
        <DownloadAppButton className="mt-6 inline-flex items-center gap-2 text-[15px] font-bold text-[#063627] transition group-hover:text-[#146456]">
          Start in the app
          <ArrowRight aria-hidden="true" size={17} />
        </DownloadAppButton>
      </div>
    </article>
  );
}

function ProductPhone() {
  return (
    <div className="relative mx-auto w-full max-w-[430px]">
      <div className="absolute inset-x-8 bottom-3 top-16 rounded-full bg-[#f5b94b]/25 blur-3xl" />
      <div className="relative mx-auto w-[76%] rotate-[-2deg] transition duration-700 hover:rotate-0 sm:w-[72%]">
        <div className="phone-frame border-[10px] shadow-[0_42px_120px_rgba(0,0,0,0.42)]">
          <div className="max-h-[720px] overflow-hidden rounded-[22px] bg-white">
            <Image
              src="/brand/wheel-screen.png"
              alt="Ajo Family app showing the current pool, payout wheel, and member progress"
              width={390}
              height={1472}
              sizes="(max-width: 1023px) 72vw, 310px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="absolute -left-1 top-[18%] rounded-2xl border border-white/15 bg-white/[0.12] px-4 py-3 text-white shadow-xl backdrop-blur-md sm:-left-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#f6cb78]">
          Current pool
        </p>
        <p className="mt-1 text-[15px] font-semibold">Visible to the circle</p>
      </div>
      <div className="absolute -right-1 bottom-[20%] rounded-2xl border border-white/15 bg-[#03261d]/90 px-4 py-3 text-white shadow-xl backdrop-blur-md sm:-right-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#f6cb78]">
          What comes next
        </p>
        <p className="mt-1 text-[15px] font-semibold">Payout order stays clear</p>
      </div>
    </div>
  );
}

function FeatureProof({ kind }: { kind: (typeof productFeatures)[number]["kind"] }) {
  if (kind === "group") {
    return (
      <div aria-hidden="true" className="mt-6 rounded-[20px] bg-[#03261d]/45 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#f6cb78]">
            Circle members
          </span>
          <span className="rounded-full bg-[#d9efe4]/10 px-2.5 py-1 text-[10px] font-bold text-[#d9efe4]">
            Together
          </span>
        </div>
        <div className="mt-5 flex items-center">
          {["AO", "NE", "TI", "+"].map((initials, index) => (
            <span
              key={initials}
              className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#164f41] bg-[#f4ecde] text-[11px] font-extrabold text-[#063627] first:ml-0"
              style={{ zIndex: 4 - index }}
            >
              {initials}
            </span>
          ))}
          <span className="ml-3 text-[12px] font-semibold text-white/70">
            One shared view
          </span>
        </div>
      </div>
    );
  }

  if (kind === "wheel") {
    return (
      <div aria-hidden="true" className="mt-5 flex justify-center">
        <svg viewBox="0 0 180 180" className="h-36 w-36 drop-shadow-[0_18px_28px_rgba(0,0,0,0.2)]">
          <circle cx="90" cy="90" r="69" fill="#fffaf0" />
          <path d="M90 90V21A69 69 0 0 1 159 90Z" fill="#f5b94b" />
          <path d="M90 90H159A69 69 0 0 1 90 159Z" fill="#d8efe5" />
          <path d="M90 90V159A69 69 0 0 1 21 90Z" fill="#e6952f" />
          <path d="M90 90H21A69 69 0 0 1 90 21Z" fill="#94cbb5" />
          <circle cx="90" cy="90" r="27" fill="#063627" stroke="#fffaf0" strokeWidth="6" />
          <path d="M90 72L99 94H81Z" fill="#f5b94b" />
          <circle cx="90" cy="90" r="69" fill="none" stroke="#fff" strokeOpacity=".24" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  if (kind === "wallet") {
    return (
      <div aria-hidden="true" className="mt-6 grid gap-2.5">
        {[
          ["Group contribution", "In context"],
          ["Payout activity", "Visible"],
        ].map(([label, state]) => (
          <div key={label} className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.08] px-3.5 py-3">
            <span className="text-[12px] font-semibold text-white/80">{label}</span>
            <span className="rounded-full bg-[#f5b94b] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#063627]">
              {state}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="mt-6 grid grid-cols-3 gap-2">
      {[
        ["Complete", "bg-[#d8efe5] text-[#07513d]"],
        ["Due next", "bg-[#fff1d7] text-[#744107]"],
        ["Scheduled", "bg-white/10 text-white/75"],
      ].map(([label, tone]) => (
        <div key={label} className={`rounded-2xl px-2 py-4 text-center text-[10px] font-extrabold uppercase tracking-[0.08em] ${tone}`}>
          <span className="mx-auto mb-2 flex h-6 w-6 items-center justify-center rounded-full border border-current/20">
            <Check size={13} strokeWidth={3} />
          </span>
          {label}
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  const [faqs, about, team, testimonials, contactPage] = await Promise.all([
    getPublicFaqs(),
    getPublicPage("about-ajo-family", defaultAboutPage),
    getPublicTeam(),
    getPublicTestimonials(),
    getPublicPage("contact", defaultContactPage),
  ]);
  const contact = {
    ...contactPage,
    phone: "+234 707 769 6521",
    address: "Nigeria",
  };

  return (
    <div className="min-h-screen bg-[#fffaf0]">
      <Header />

      <MotionPage>
        <main id="main-content">
          <section className="brand-grid brand-noise relative overflow-hidden bg-[#032f25] text-white">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[760px] lg:hidden">
              <Image
                src="/brand/campaign/hero-circle.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-[66%_center] opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#032f25]/25 via-[#032f25]/75 to-[#032f25]" />
            </div>
            <div className="absolute -left-32 top-24 h-80 w-80 rounded-full border border-[#f5b94b]/20" />
            <div className="absolute -left-20 top-36 h-56 w-56 rounded-full border border-[#f5b94b]/15" />
            <div className="section-shell relative z-[1] grid min-h-[calc(100svh-76px)] items-center gap-12 py-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 lg:py-16">
              <Reveal className="relative z-10 max-w-[650px]" delay={0.05} eager>
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#f6cb78] backdrop-blur">
                  <Sparkles aria-hidden="true" size={16} />
                  Ajo Family
                </div>

                <h1 className="text-balance mt-7 text-[48px] font-bold leading-[0.95] sm:text-[68px] lg:text-[78px] xl:text-[88px]">
                  Your people.
                  <span className="mt-1 block text-[#f5b94b]">Your savings.</span>
                  <span className="mt-1 block">One clear circle.</span>
                </h1>

                <p className="text-pretty mt-7 max-w-[600px] text-[17px] leading-8 text-[#d6e7dd] sm:text-[19px]">
                  Bring family and friends together to contribute on schedule,
                  see whose turn is next, and keep shared goals moving across
                  Nigeria and the diaspora.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:items-start lg:flex-col xl:flex-row">
                  <DownloadAppButton className="inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#f5b94b] px-7 text-[16px] font-extrabold text-[#063627] shadow-[0_20px_50px_rgba(230,149,47,0.25)] transition hover:-translate-y-1 hover:bg-[#ffd47a]">
                    Download the app
                    <ArrowRight aria-hidden="true" size={18} />
                  </DownloadAppButton>
                  <Link
                    href="#how-it-works"
                    className="inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/[0.06] px-7 text-[16px] font-bold text-white transition hover:-translate-y-1 hover:bg-white/[0.12]"
                  >
                    See how it works
                  </Link>
                </div>

                <div className="mt-9 grid gap-3 text-[14px] text-[#d6e7dd] sm:grid-cols-3">
                  {[
                    "Contributions in one view",
                    "Payout order stays visible",
                    "Built for trusted circles",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f5b94b] text-[#063627]">
                        <Check aria-hidden="true" size={12} strokeWidth={3} />
                      </span>
                      <span className="font-semibold leading-5">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal className="relative z-10" delay={0.16} eager>
                <HeroVisual />
              </Reveal>
            </div>

            <div className="relative h-16 overflow-hidden sm:h-24">
              <div className="absolute -bottom-16 left-[-5%] h-28 w-[110%] rounded-[50%_50%_0_0/100%_100%_0_0] bg-[#fffaf0] sm:-bottom-24 sm:h-40" />
            </div>
          </section>

          <section id="about" className="bg-[#fffaf0] py-24 sm:py-28">
            <div className="section-shell">
              <Reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <p className="section-kicker text-[#146456]">About Ajo Family</p>
                  <h2 className="text-balance mt-5 text-[42px] font-bold leading-[1] text-[#063627] sm:text-[58px] lg:text-[66px]">
                    {about.title}
                  </h2>
                </div>
                <RichText content={about.intro} className="text-pretty max-w-[660px] text-[18px] leading-8 text-[#587066] lg:justify-self-end" />
              </Reveal>
              {about.content ? (
                <Reveal className="mt-12">
                  <article className="rounded-[28px] border border-[#d6e4dc] bg-white p-6 shadow-[0_18px_50px_rgba(3,54,39,0.07)] sm:p-9">
                    <RichText content={about.content} className="text-[16px] leading-8 text-[#587066] sm:text-[17px]" />
                  </article>
                </Reveal>
              ) : (
                <div className="mt-12 grid gap-5 lg:grid-cols-3">
                  {about.sections.map((section, index) => (
                  <Reveal key={`${section.title}-${index}`} delay={index * 0.07}>
                    <article className={`h-full rounded-[26px] border p-6 sm:p-7 ${index === 1 ? "border-[#efd4aa] bg-[#fff1d7]" : index === 2 ? "border-[#bcd8c8] bg-[#e7f4eb]" : "border-[#dce6df] bg-white"}`}>
                      <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#146456]">0{index + 1}</span>
                      <h3 className="mt-4 text-[25px] font-bold text-[#063627]">{section.title}</h3>
                      <RichText content={section.body} className="mt-4 text-[16px] leading-7 text-[#587066]" />
                    </article>
                  </Reveal>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section id="how-it-works" className="bg-[#fffaf0] pb-24 pt-14 sm:pb-28">
            <div className="section-shell">
              <Reveal className="grid items-end gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <p className="section-kicker text-[#146456]">How it works</p>
                  <h2 className="text-balance mt-5 max-w-[720px] text-[42px] font-bold leading-[1] text-[#063627] sm:text-[58px] lg:text-[66px]">
                    A familiar tradition, with a clearer rhythm.
                  </h2>
                </div>
                <p className="text-pretty max-w-[620px] text-[18px] leading-8 text-[#587066] lg:justify-self-end">
                  Ajo Family keeps the important moments in one place—from forming
                  your circle to following contributions and understanding the next
                  payout.
                </p>
              </Reveal>

              <div className="mt-14">
                <SavingsCycle />
              </div>
            </div>
          </section>

          <section id="team" className="bg-[#f4ecde] py-24 sm:py-28">
            <div className="section-shell">
              <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div><p className="section-kicker text-[#146456]">Our Team</p><h2 className="text-balance mt-5 text-[42px] font-bold leading-[1] text-[#063627] sm:text-[58px]">People behind the circle.</h2></div>
                <p className="max-w-[520px] text-[17px] leading-8 text-[#587066]">Meet the people building a clearer and more dependable way to save together.</p>
              </Reveal>
              {team.length ? (
                <TeamCarousel members={team} />
              ) : (
                <div className="mt-12 flex min-h-[220px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[#b9ccc1] bg-white/60 p-8 text-center"><Users className="h-8 w-8 text-[#146456]" /><p className="mt-4 max-w-md text-[16px] leading-7 text-[#587066]">Team profiles are being prepared and will appear here soon.</p></div>
              )}
            </div>
          </section>

          <section id="testimonials" className="brand-grid bg-[#063627] py-24 text-white sm:py-28">
            <div className="section-shell">
              <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div><p className="section-kicker text-[#f6cb78]">Testimonials</p><h2 className="text-balance mt-5 text-[42px] font-bold leading-[1] sm:text-[58px]">What our community says.</h2></div>
                <MessageSquareQuote className="hidden h-14 w-14 text-[#f5b94b] lg:block" />
              </Reveal>
              {testimonials.length ? (
                <TestimonialCarousel testimonials={testimonials} />
              ) : (
                <div className="mt-12 rounded-[26px] border border-white/12 bg-white/[0.07] p-8 text-center text-[#c9ddd2]">Community reviews will appear here as they are published.</div>
              )}
            </div>
          </section>

          <section id="pathways" className="bg-[#f4ecde] py-24 sm:py-28">
            <div className="section-shell">
              <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div>
                  <p className="section-kicker text-[#146456]">Choose your circle</p>
                  <h2 className="text-balance mt-5 max-w-[760px] text-[42px] font-bold leading-[1] text-[#063627] sm:text-[58px] lg:text-[66px]">
                    One app. Different ways to move together.
                  </h2>
                </div>
                <p className="max-w-[480px] text-[17px] leading-8 text-[#587066]">
                  These are not separate plans or prices. They are the everyday ways
                  trusted groups use Ajo Family.
                </p>
              </Reveal>

              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pathways.map((pathway, index) => (
                  <Reveal
                    key={pathway.title}
                    delay={index * 0.08}
                    className={`h-full ${index === 2 ? "md:col-span-2 md:w-[calc(50%_-_0.75rem)] md:justify-self-center lg:col-span-1 lg:w-full" : ""}`}
                  >
                    <PathwayCard pathway={pathway} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="features" className="brand-grid overflow-hidden bg-[#063627] py-24 text-white sm:py-28">
            <div className="section-shell grid items-center gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
              <Reveal className="order-2 lg:order-1">
                <ProductPhone />
              </Reveal>

              <div className="contents lg:order-2 lg:block">
                <Reveal className="order-1">
                  <p className="section-kicker text-[#f6cb78]">Inside the app</p>
                  <h2 className="text-balance mt-5 max-w-[720px] text-[42px] font-bold leading-[1] sm:text-[58px] lg:text-[66px]">
                    One view. No guesswork.
                  </h2>
                  <p className="text-pretty mt-6 max-w-[650px] text-[18px] leading-8 text-[#d6e7dd]">
                    The mobile experience turns the moving parts of a savings circle
                    into a visual flow your members can understand at a glance.
                  </p>
                </Reveal>

                <div className="order-3 mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2">
                  {productFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Reveal key={feature.title} className={feature.layout} delay={index * 0.06}>
                        <article className="group h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.07] p-6 transition hover:-translate-y-1 hover:border-[#f5b94b]/40 hover:bg-white/[0.11]">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5b94b] text-[#063627]">
                              <Icon aria-hidden="true" size={21} />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-white/45">
                              Product view
                            </span>
                          </div>
                          <h3 className="mt-5 text-[23px] font-bold tracking-[-0.03em]">
                            {feature.title}
                          </h3>
                          <p className="mt-3 text-[15px] leading-7 text-[#c9ddd2]">
                            {feature.description}
                          </p>
                          <FeatureProof kind={feature.kind} />
                        </article>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section id="security" className="bg-[#fffaf0] py-24 sm:py-28">
            <div className="section-shell">
              <Reveal className="rounded-[36px] border border-[#d6e4dc] bg-[#e7f4eb] p-6 sm:p-10 lg:p-14">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#063627] text-[#f5b94b]">
                      <LockKeyhole aria-hidden="true" size={26} />
                    </div>
                    <p className="section-kicker mt-8 text-[#146456]">Clarity builds trust</p>
                    <h2 className="text-balance mt-5 text-[40px] font-bold leading-[1] text-[#063627] sm:text-[56px]">
                      Everyone can understand the plan.
                    </h2>
                    <p className="text-pretty mt-6 max-w-[540px] text-[17px] leading-8 text-[#587066]">
                      Ajo Family is designed to make participation easier to follow:
                      who belongs, what is happening, and where to go when something
                      needs attention.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {trustPoints.map((point) => {
                      const Icon = point.icon;
                      return (
                        <article key={point.title} className="rounded-[24px] border border-[#cfe0d6] bg-white p-6">
                          <Icon aria-hidden="true" className="text-[#146456]" size={24} />
                          <h3 className="mt-5 text-[22px] font-bold text-[#063627]">
                            {point.title}
                          </h3>
                          <p className="mt-3 text-[15px] leading-7 text-[#587066]">
                            {point.description}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="faqs" className="bg-white py-24 sm:py-28">
            <div className="section-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <Reveal>
                <p className="section-kicker text-[#146456]">Questions, answered</p>
                <h2 className="text-balance mt-5 text-[42px] font-bold leading-[1] text-[#063627] sm:text-[58px]">
                  Know what to expect before your first circle.
                </h2>
                <p className="text-pretty mt-6 text-[17px] leading-8 text-[#587066]">
                  Learn how groups, contributions, verification, payouts, and support
                  fit together before you begin.
                </p>
                <div className="mt-8 rounded-[22px] bg-[#f4ecde] p-5">
                  <div className="flex items-start gap-4">
                    <UserCheck aria-hidden="true" className="mt-1 shrink-0 text-[#146456]" size={23} />
                    <div>
                      <p className="font-bold text-[#063627]">Still deciding?</p>
                      <p className="mt-1 text-[14px] leading-6 text-[#587066]">
                        Download the app when you are ready and explore the member flow
                        from your phone.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <FaqAccordion faqs={faqs} />
              </Reveal>
            </div>
          </section>

          <section id="contact" className="relative overflow-hidden bg-[#e7f4eb] py-24 sm:py-28">
            <div aria-hidden="true" className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#bfe3cf]/45 blur-3xl" />
            <div aria-hidden="true" className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#f6cb78]/15 blur-3xl" />
            <div className="section-shell relative grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">
              <Reveal className="lg:pt-3">
                <p className="section-kicker text-[#146456]">Contact Us</p>
                <h2 className="text-balance mt-5 text-[42px] font-bold leading-[1] text-[#063627] sm:text-[58px]">{contact.title}</h2>
                <p className="mt-6 max-w-[520px] text-[17px] leading-8 text-[#587066]">{contact.intro}</p>

                <div className="mt-8 rounded-[28px] border border-white/80 bg-white/85 p-3 shadow-[0_22px_60px_rgba(3,54,39,0.09)] backdrop-blur-sm sm:p-4">
                  {contact.email ? (
                    <a href={`mailto:${contact.email}`} className="group flex items-center gap-4 rounded-[20px] px-3 py-4 transition hover:bg-[#f1f8f4] sm:px-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e3f2e9] text-[#146456] transition group-hover:bg-[#146456] group-hover:text-white"><Mail className="h-5 w-5" /></span>
                      <span className="min-w-0"><span className="block text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#6c827a]">Email us</span><span className="mt-1 block truncate text-[16px] font-bold text-[#063627]">{contact.email}</span></span>
                    </a>
                  ) : null}

                  <div className="grid gap-2 sm:grid-cols-2">
                    {contact.phone ? (
                      <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="group flex items-center gap-3 rounded-[20px] bg-[#f5faf7] px-3 py-4 transition hover:-translate-y-0.5 hover:bg-[#edf7f1] sm:px-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#146456] shadow-sm"><Phone className="h-[18px] w-[18px]" /></span>
                        <span className="min-w-0"><span className="block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#6c827a]">Call us</span><span className="mt-1 block whitespace-nowrap text-[14px] font-bold text-[#063627]">{contact.phone}</span></span>
                      </a>
                    ) : null}
                    <a href="https://wa.me/2347077696521" target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-[20px] bg-[#e9f8ee] px-3 py-4 transition hover:-translate-y-0.5 hover:bg-[#dcf3e4] sm:px-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#16894d] shadow-sm"><MessageCircle className="h-[18px] w-[18px]" /></span>
                      <span className="min-w-0"><span className="block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#588267]">WhatsApp</span><span className="mt-1 block whitespace-nowrap text-[14px] font-bold text-[#063627]">Chat with us</span></span>
                    </a>
                  </div>

                  <div className="mt-3 grid gap-3 border-t border-[#e1ebe5] px-3 pb-2 pt-4 text-[14px] text-[#587066] sm:grid-cols-[0.7fr_1.3fr] sm:px-4">
                    {contact.address ? <div className="flex items-center gap-3"><MapPin className="h-[18px] w-[18px] shrink-0 text-[#146456]" /><span>{contact.address}</span></div> : null}
                    {contact.supportHours ? <div className="flex items-start gap-3"><Headphones className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#146456]" /><span className="leading-5">{contact.supportHours}</span></div> : null}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.08}><ContactForm /></Reveal>
            </div>
          </section>

          <section id="get-started" className="bg-[#f4ecde] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="brand-grid brand-noise relative mx-auto max-w-[1280px] overflow-hidden rounded-[36px] bg-[#032f25] text-white">
              <div className="woven-lines absolute -right-24 -top-24 h-80 w-80 rotate-12 rounded-full opacity-70" />
              <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1fr_0.72fr] lg:px-16 lg:py-20">
                <Reveal>
                  <p className="section-kicker text-[#f6cb78]">Put your circle in motion</p>
                  <h2 className="text-balance mt-5 max-w-[760px] text-[44px] font-bold leading-[0.98] sm:text-[62px] lg:text-[72px]">
                    Your next shared goal starts together.
                  </h2>
                  <p className="text-pretty mt-6 max-w-[660px] text-[18px] leading-8 text-[#d6e7dd]">
                    Download Ajo Family and bring contributions, payout
                    order, wallet activity, and group progress into one place.
                  </p>
                  <div className="mt-8 max-w-[520px]">
                    <StoreButtons />
                  </div>
                </Reveal>

                <Reveal className="relative hidden min-h-[360px] lg:block" delay={0.1}>
                  <div className="absolute right-0 top-[-40px] h-64 w-64 opacity-70">
                    <SavingsOrbit />
                  </div>
                  <div className="absolute bottom-[-120px] left-1/2 w-[230px] -translate-x-1/2 rotate-3">
                    <div className="phone-frame gold-ring aspect-[390/720]">
                      <Image
                        src="/brand/wheel-screen.png"
                        alt="Ajo Family payout wheel screen"
                        width={390}
                        height={1472}
                        sizes="230px"
                        className="h-full w-full rounded-[22px] object-cover object-top"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </main>
      </MotionPage>

      <Footer />
    </div>
  );
}
