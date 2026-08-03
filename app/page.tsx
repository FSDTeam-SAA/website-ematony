import Image from "next/image";
import Link from "next/link";
import {
  DownloadAppButton,
  StoreButtons,
} from "@/app/components/download-modal";
import { FaqAccordion } from "@/app/components/faq-accordion";
import { Footer, Header } from "@/app/components/site-shell";
import { getPublicFaqs } from "@/app/lib/faqs";

export const dynamic = "force-dynamic";

const trustStats = [
  { value: "7%", label: "year-end interest goal" },
  { value: "4", label: "core money flows" },
  { value: "24/7", label: "mobile access" },
];

const steps = [
  {
    title: "Create or join a circle",
    body: "Start with people you already trust: family, friends, colleagues, or a community group.",
  },
  {
    title: "Contribute on schedule",
    body: "Members top up, track payments, and keep every contribution visible inside the app.",
  },
  {
    title: "Rotate payouts fairly",
    body: "The savings wheel keeps payout order clear, so everyone knows what is next.",
  },
  {
    title: "Build toward projects",
    body: "Groups can plan bigger goals such as markets, schools, hospitals, or production hubs.",
  },
];

const features = [
  "Group savings and rotating payout management",
  "Wallet top up, withdrawals, and upcoming payment reminders",
  "KYC flow for safer member verification",
  "Notifications, support tickets, and admin oversight",
  "Progress tracking for active groups and payment completion",
  "Designed for families, friends, teams, and local communities",
];

const investmentCards = [
  {
    title: "Family savings",
    image: "/brand/family-savings.png",
    body: "Keep shared goals visible and make regular saving feel natural.",
  },
  {
    title: "Friend circles",
    image: "/brand/friends-saving.png",
    body: "Pool contributions with people you know and rotate access to funds.",
  },
  {
    title: "Community projects",
    image: "/brand/group-mobile.png",
    body: "Move from small savings habits into meaningful shared investment.",
  },
];

function PhonePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="absolute inset-x-0 bottom-0 top-12 rounded-[32px] bg-[#e8f5ec] shadow-[inset_0_0_0_1px_rgba(6,54,39,0.08)]" />
      <div className="absolute -left-8 top-16 hidden h-28 w-28 rounded-full bg-[#f9f1df] blur-2xl lg:block" />
      <div className="absolute -right-6 bottom-20 hidden h-32 w-32 rounded-full bg-[#d8efe5] blur-2xl lg:block" />

      <div className="relative mx-auto w-full max-w-[350px] rounded-[34px] border-[9px] border-[#063627] bg-[#063627] p-2 shadow-[0_32px_90px_rgba(6,54,39,0.28)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_42px_110px_rgba(6,54,39,0.34)] sm:max-w-[380px]">
        <div className="relative max-h-[720px] overflow-hidden rounded-[26px] bg-white">
          <Image
            src="/brand/wheel-screen.png"
            alt="Ematony mobile app screen showing savings pool, payout wheel, and members"
            width={390}
            height={844}
            className="h-auto w-full object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
      </div>

      <div className="absolute -left-2 top-[20%] hidden w-[190px] rounded-[8px] border border-[#d4e7dc] bg-white/95 p-4 text-[#063627] shadow-[0_18px_40px_rgba(6,54,39,0.14)] backdrop-blur lg:block">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#146456]" />
          <p className="text-[13px] font-bold uppercase text-[#146456]">
            Savings pool
          </p>
        </div>
        <p className="mt-2 text-[15px] font-semibold leading-5">
          Members instantly see the active pool and next wheel date.
        </p>
      </div>

      <div className="absolute -right-3 top-[48%] hidden w-[200px] rounded-[8px] border border-[#f0e1be] bg-[#f9f1df]/95 p-4 text-[#063627] shadow-[0_18px_40px_rgba(6,54,39,0.14)] backdrop-blur lg:block">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e88c24]" />
          <p className="text-[13px] font-bold uppercase text-[#146456]">
            Wheel rotation
          </p>
        </div>
        <p className="mt-2 text-[15px] font-semibold leading-5">
          The spin view makes payout order easy to understand.
        </p>
      </div>

      <div className="absolute bottom-8 left-4 right-4 hidden rounded-[8px] border border-[#e4e7ec] bg-white/95 p-4 shadow-[0_18px_40px_rgba(6,54,39,0.12)] backdrop-blur sm:block lg:left-12 lg:right-12">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[22px] font-extrabold text-[#063627]">08</p>
            <p className="mt-1 text-[12px] font-semibold text-[#6b7280]">
              members
            </p>
          </div>
          <div>
            <p className="text-[22px] font-extrabold text-[#063627]">April 27</p>
            <p className="mt-1 text-[12px] font-semibold text-[#6b7280]">
              next wheel
            </p>
          </div>
          <div>
            <p className="text-[22px] font-extrabold text-[#063627]">Live</p>
            <p className="mt-1 text-[12px] font-semibold text-[#6b7280]">
              status
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const faqs = await getPublicFaqs();

  return (
    <div className="min-h-screen bg-[#fffcf6]">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#fffcf6]">
          <div className="mx-auto grid min-h-[calc(100vh-76px)] w-full max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
            <div className="min-w-0 max-w-2xl motion-safe:animate-rise-in">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#d8efe5] bg-white px-4 py-2 text-[14px] font-semibold text-[#146456] shadow-[0_10px_28px_rgba(6,54,39,0.06)]">
                <Image
                  src="/brand/ajo-icon.png"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
                Trusted circles for modern Ajo saving
              </div>

              <h1 className="mt-7 max-w-[10ch] text-[38px] font-extrabold leading-[1.02] text-[#063627] sm:max-w-none sm:text-[72px] sm:leading-[0.98] lg:text-[84px]">
                Ematony Ajo Family
              </h1>
              <p className="mt-6 max-w-full text-[18px] leading-8 text-[#51645a] sm:max-w-xl sm:text-[20px]">
                Save together. Win together. Join trusted circles, manage
                scheduled contributions, rotate payouts fairly, and grow toward
                bigger community goals.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <DownloadAppButton className="inline-flex h-[52px] items-center justify-center rounded-[12px] bg-[#063627] px-7 text-[16px] font-semibold text-white shadow-[0_18px_40px_rgba(6,54,39,0.22)] transition hover:bg-[#146456]">
                  Start your circle
                </DownloadAppButton>
                <Link
                  href="#how-it-works"
                  className="inline-flex h-[52px] items-center justify-center rounded-[12px] border border-[#cfe3d8] bg-white px-7 text-[16px] font-semibold text-[#063627] transition hover:bg-[#e8f5ec]"
                >
                  See how it works
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                {trustStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[8px] border border-[#e4e7ec] bg-white p-4 transition hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(6,54,39,0.10)]"
                  >
                    <p className="text-[28px] font-extrabold text-[#063627]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[13px] leading-5 text-[#6b7280]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-w-0 motion-safe:animate-float-in">
              <div className="relative overflow-hidden rounded-[8px] border border-[#e4e7ec] bg-white shadow-[0_24px_70px_rgba(6,54,39,0.16)]">
                <Image
                  src="/brand/group-mobile.png"
                  alt="A group of friends using Ematony together"
                  width={626}
                  height={626}
                  priority
                  className="aspect-[1.04/1] h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="relative mx-5 -mt-10 rounded-[8px] border border-[#f0e1be] bg-[#f9f1df] p-5 shadow-[0_18px_42px_rgba(6,54,39,0.16)] motion-safe:animate-soft-pulse sm:absolute sm:bottom-[-34px] sm:left-10 sm:right-auto sm:mx-0 sm:mt-0 sm:w-[330px]">
                <p className="text-[14px] font-semibold text-[#146456]">
                  Rotating savings made visible
                </p>
                <p className="mt-2 text-[23px] font-extrabold leading-[1.25] text-[#063627] sm:text-[28px]">
                  Know who pays, who receives, and what comes next.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 bg-[#e8f5ec] py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-[15px] font-bold uppercase text-[#146456]">
                How it works
              </p>
              <h2 className="mt-3 text-[38px] font-extrabold leading-[1.05] text-[#063627] sm:text-[56px]">
                A familiar savings tradition, organized for mobile.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[8px] border border-[#d4e7dc] bg-[#fffcf6] p-6 transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(6,54,39,0.12)] motion-safe:animate-rise-in"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#063627] text-[16px] font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-7 text-[24px] font-bold text-[#063627]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-7 text-[#51645a]">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-[#fffcf6] py-20">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <PhonePreview />

            <div className="relative">
              <div className="absolute -left-8 -top-10 hidden h-24 w-24 rounded-full bg-[#e8f5ec] blur-2xl lg:block" />
              <p className="text-[15px] font-bold uppercase text-[#146456]">
                Product features
              </p>
              <h2 className="mt-3 max-w-2xl text-[38px] font-extrabold leading-[1.05] text-[#063627] sm:text-[56px]">
                A clear app flow for every savings circle.
              </h2>
              <p className="mt-5 max-w-2xl text-[18px] leading-8 text-[#51645a]">
                Ematony makes the Ajo process visual: users select their group,
                review the current savings pool, check the next wheel date, spin
                for payout order, and follow every member status from the app.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div
                    key={feature}
                    className="rounded-[8px] border border-[#e4e7ec] bg-white p-5 text-[16px] font-semibold leading-6 text-[#063627] transition duration-300 hover:-translate-y-1 hover:border-[#cfe3d8] hover:bg-[#f8fffb] hover:shadow-[0_12px_32px_rgba(6,54,39,0.08)]"
                  >
                    <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#e8f5ec] text-[13px] font-extrabold text-[#146456]">
                      {index + 1}
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-mt-24 bg-[#063627] py-20 text-white" id="security">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div>
              <p className="text-[15px] font-bold uppercase text-[#fcd68d]">
                Trust and oversight
              </p>
              <h2 className="mt-3 text-[38px] font-extrabold leading-[1.05] sm:text-[56px]">
                Built for groups that need clarity before speed.
              </h2>
              <p className="mt-5 text-[18px] leading-8 text-[#d7e7dd]">
                Member verification, payment visibility, admin reviews, and
                issue handling help communities run savings circles with less
                confusion and fewer manual follow-ups.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "KYC review flow for member confidence",
                "Admin dashboard for users, groups, issues, and transactions",
                "Notifications for important payment and group updates",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[8px] border border-white/[0.12] bg-white/[0.08] p-5 text-[18px] font-semibold text-white transition hover:-translate-y-1 hover:bg-white/[0.12]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffcf6] py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-[15px] font-bold uppercase text-[#146456]">
                  Community goals
                </p>
                <h2 className="mt-3 max-w-3xl text-[38px] font-extrabold leading-[1.05] text-[#063627] sm:text-[56px]">
                  Small circles can grow into lasting projects.
                </h2>
              </div>
              <p className="max-w-xl text-[18px] leading-8 text-[#51645a]">
                The product is shaped around real relationships: people saving
                together today, then planning larger investments tomorrow.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {investmentCards.map((card) => (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-[8px] border border-[#e4e7ec] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(6,54,39,0.12)]"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={626}
                    height={626}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-[26px] font-bold text-[#063627]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-7 text-[#51645a]">
                      {card.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faqs" className="scroll-mt-24 bg-[#fffcf6] py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:px-8">
            <div>
              <p className="text-[15px] font-bold uppercase text-[#146456]">
                App user FAQ
              </p>
              <h2 className="mt-3 text-[38px] font-extrabold leading-[1.05] text-[#063627] sm:text-[56px]">
                Answers before users start saving.
              </h2>
              <p className="mt-5 text-[18px] leading-8 text-[#51645a]">
                Admins can add, update, delete, and publish these questions
                from the dashboard FAQ Management page. Published items appear
                here for app users and new visitors.
              </p>
              <div className="mt-8">
                <StoreButtons />
              </div>
            </div>

            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        <section id="get-started" className="bg-[#e8f5ec] py-20">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
            <div>
              <h2 className="max-w-3xl text-[40px] font-extrabold leading-[1.05] text-[#063627] sm:text-[60px]">
                Ready to bring your savings circle online?
              </h2>
              <p className="mt-5 max-w-2xl text-[18px] leading-8 text-[#51645a]">
                Use Ematony to organize contributions, payout rotations, wallet
                activity, support, and growth goals from one trusted place.
              </p>
              <div className="mt-8">
                <StoreButtons />
              </div>
            </div>

            <div className="rounded-[8px] border border-[#d4e7dc] bg-white p-6 shadow-[0_18px_46px_rgba(6,54,39,0.09)]">
              <Image
                src="/brand/woven-pattern.png"
                alt=""
                width={280}
                height={280}
                className="mx-auto h-32 w-32 rounded-full object-cover"
              />
              <h3 className="mt-6 text-center text-[28px] font-extrabold text-[#063627]">
                Ajo Family
              </h3>
              <p className="mt-3 text-center text-[16px] leading-7 text-[#51645a]">
                Community saving with structure, transparency, and room to grow.
              </p>
              <Link
                href="/terms-of-service"
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-[12px] bg-[#063627] text-[16px] font-semibold text-white transition hover:bg-[#146456]"
              >
                Review member terms
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
