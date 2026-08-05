"use client";

import {
  CircleCheckBig,
  HandCoins,
  PiggyBank,
  RotateCw,
  Route,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import type { KeyboardEvent, ReactNode } from "react";
import { useId, useRef, useState } from "react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const savingsStages = [
  {
    title: "Contribution",
    description:
      "Each member follows the circle's agreed schedule and records their contribution in one shared place.",
    benefit:
      "Everyone can understand what has been contributed and what is still coming up.",
    icon: HandCoins,
  },
  {
    title: "Rotation",
    description:
      "The agreed order keeps moving from one member to the next as the circle progresses.",
    benefit:
      "A visible rotation helps the group stay aligned on whose turn is now and next.",
    icon: RotateCw,
  },
  {
    title: "Payout",
    description:
      "When a member's turn arrives, the payout step is connected to the same group activity and order.",
    benefit:
      "The circle can follow the current payout moment without piecing together separate messages.",
    icon: Route,
  },
  {
    title: "Growth",
    description:
      "The rhythm continues, helping every member keep moving toward a personal or shared goal.",
    benefit:
      "One completed turn becomes momentum for the next person and the wider circle.",
    icon: PiggyBank,
  },
] as const;

type MotionPageProps = {
  children: ReactNode;
};

/** Keeps the landing-page motion policy in one deliberately small client island. */
export function MotionPage({ children }: MotionPageProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.56, ease: smoothEase }}
    >
      {children}
    </MotionConfig>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  eager?: boolean;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  eager = false,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={eager ? false : { opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      animate={eager ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.64,
        delay: shouldReduceMotion ? 0 : delay,
        ease: smoothEase,
      }}
    >
      {children}
    </motion.div>
  );
}

export function SavingsCycle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const activeStage = savingsStages[activeIndex];
  const ActiveIcon = activeStage.icon;
  const progress = activeIndex / (savingsStages.length - 1);

  const selectFromKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % savingsStages.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + savingsStages.length) % savingsStages.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = savingsStages.length - 1;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    buttonsRef.current[nextIndex]?.focus();
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-4 shadow-[0_24px_80px_rgba(4,38,29,0.08)] sm:p-6 lg:rounded-[36px] lg:p-8">
      <p className="sr-only">
        Choose a step to learn how an Ajo Family savings circle works. Use the
        arrow keys to move between steps.
      </p>

      <div className="relative">
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 1000 150"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-[6%] right-[6%] top-0 z-0 hidden h-[120px] w-[88%] overflow-visible md:block"
          initial={false}
          animate={{ opacity: shouldReduceMotion ? 0.42 : [0.34, 0.62, 0.34] }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 5.5, ease: "easeInOut", repeat: Infinity }
          }
        >
          <defs>
            <marker
              id="cycle-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0 0L8 4L0 8Z" fill="var(--gold)" />
            </marker>
          </defs>
          <path
            d="M125 43H875C938 43 956 113 884 122H116C44 113 62 43 125 43Z"
            fill="none"
            stroke="var(--mint-strong)"
            strokeWidth="3"
            strokeDasharray="7 10"
            markerEnd="url(#cycle-arrow)"
          />
        </motion.svg>

        <div
          aria-hidden="true"
          className="absolute bottom-9 left-6 top-9 z-20 w-[2px] bg-[var(--mint-strong)] md:hidden"
        >
          <motion.span
            className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-[var(--gold)]"
            initial={false}
            animate={{ scaleY: progress }}
          />
          <motion.span
            className="absolute left-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--gold)]/50 bg-[var(--gold)]/10 shadow-[0_0_0_7px_rgba(232,140,36,0.08)]"
            initial={false}
            animate={{ top: `${progress * 100}%` }}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-6 z-20 hidden h-[2px] bg-[var(--mint-strong)] md:block"
        >
          <motion.span
            className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-[var(--gold)]"
            initial={false}
            animate={{ scaleX: progress }}
          />
          <motion.span
            className="absolute top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--gold)]/50 bg-[var(--gold)]/10 shadow-[0_0_0_7px_rgba(232,140,36,0.08)]"
            initial={false}
            animate={{ left: `${progress * 100}%` }}
          />
        </div>

        <ol
          className="relative z-10 grid gap-3 md:grid-cols-4 md:gap-0"
          aria-label="Savings circle stages"
        >
          {savingsStages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = index === activeIndex;

            return (
              <li key={stage.title} className="min-w-0">
                <motion.button
                  ref={(node) => {
                    buttonsRef.current[index] = node;
                  }}
                  id={`savings-cycle-step-${index}`}
                  type="button"
                  aria-controls="savings-cycle-detail"
                  aria-current={isActive ? "step" : undefined}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => selectFromKeyboard(event, index)}
                  className={`grid min-h-[72px] w-full grid-cols-[48px_minmax(0,1fr)] items-center gap-3 rounded-2xl pr-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 md:flex md:min-h-0 md:flex-col md:gap-3 md:rounded-none md:bg-transparent md:px-2 md:py-0 md:text-center md:shadow-none ${
                    isActive
                      ? "bg-[var(--green-dark)] text-white shadow-[0_12px_30px_rgba(4,38,29,0.16)] md:text-[var(--green-dark)]"
                      : "bg-[var(--cream)] text-[var(--green-dark)] hover:bg-[var(--mint)]"
                  }`}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                >
                  <span
                    className={`relative z-30 flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isActive
                        ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--green-deep)]"
                        : "border-[var(--mint-strong)] bg-white text-[var(--green)]"
                    }`}
                  >
                    <Icon aria-hidden="true" size={21} strokeWidth={2.2} />
                  </span>
                  <span>
                    <span
                      className={`block text-[11px] font-bold uppercase tracking-[0.14em] ${
                        isActive
                          ? "text-white/65 md:text-[var(--green)]"
                          : "text-[var(--green)]"
                      }`}
                    >
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block text-[15px] font-bold leading-tight sm:text-[16px]">
                      {stage.title}
                    </span>
                  </span>
                </motion.button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 min-h-[250px] md:mt-8 lg:min-h-[236px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={activeStage.title}
            id="savings-cycle-detail"
            role="region"
            aria-live="polite"
            aria-labelledby={`savings-cycle-step-${activeIndex}`}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 14, scale: 0.99 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{
              duration: shouldReduceMotion ? 0.12 : 0.42,
              ease: smoothEase,
            }}
            className="relative grid min-h-[250px] overflow-hidden rounded-[24px] bg-[var(--green-deep)] px-5 py-6 text-white sm:px-7 sm:py-7 lg:min-h-[236px] lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.72fr)] lg:items-center lg:gap-10 lg:rounded-[28px] lg:px-10"
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-24 size-72 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-12 size-52 rounded-full border border-[var(--gold)]/25"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.17em] text-[var(--gold)]">
                <span className="flex size-9 items-center justify-center rounded-full bg-white/10">
                  <ActiveIcon aria-hidden="true" size={18} />
                </span>
                Contribution → rotation → payout → growth
              </div>
              <h3 className="mt-4 text-[28px] font-semibold leading-[1.05] sm:text-[34px]">
                {activeStage.title}
              </h3>
              <p className="mt-3 max-w-[610px] text-[16px] leading-7 text-white/72 sm:text-[17px]">
                {activeStage.description}
              </p>
            </div>

            <div className="relative z-10 mt-6 rounded-2xl border border-white/12 bg-white/[0.07] p-4 backdrop-blur-sm lg:mt-0 lg:p-5">
              <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--gold)]">
                <CircleCheckBig aria-hidden="true" size={17} />
                Why it matters
              </div>
              <p className="mt-3 text-[15px] leading-6 text-white/82 sm:text-[16px] sm:leading-7">
                {activeStage.benefit}
              </p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SavingsOrbit({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const gradientId = useId();
  const glowId = useId();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative aspect-square w-full select-none ${className}`}
    >
      <svg
        viewBox="0 0 520 520"
        fill="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="105"
            y1="80"
            x2="430"
            y2="455"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F6B85C" />
            <stop offset="0.5" stopColor="#E88C24" />
            <stop offset="1" stopColor="#D8EFE5" />
          </linearGradient>
          <radialGradient id={glowId} cx="0" cy="0" r="1">
            <stop stopColor="#F6B85C" stopOpacity="0.34" />
            <stop offset="1" stopColor="#F6B85C" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="260" cy="260" r="245" fill={`url(#${glowId})`} />
        <circle
          cx="260"
          cy="260"
          r="194"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          strokeDasharray="5 12"
        />
        <circle
          cx="260"
          cy="260"
          r="145"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeOpacity="0.72"
        />
        <circle
          cx="260"
          cy="260"
          r="101"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth="1"
          strokeDasharray="3 8"
        />

        <path
          d="M97 160C158 89 244 67 333 98C402 122 448 181 455 249"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M423 363C358 438 252 463 166 421C107 392 72 338 67 281"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.55"
        />

        <motion.g
          initial={false}
          animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 24, ease: "linear", repeat: Infinity }
          }
          style={{ transformOrigin: "260px 260px" }}
        >
          <circle
            cx="454"
            cy="260"
            r="12"
            fill="#E88C24"
            stroke="#FFF7E9"
            strokeWidth="4"
          />
        </motion.g>

        <motion.g
          initial={false}
          animate={{ rotate: shouldReduceMotion ? 0 : -360 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 18, ease: "linear", repeat: Infinity }
          }
          style={{ transformOrigin: "260px 260px" }}
        >
          <circle
            cx="260"
            cy="115"
            r="8"
            fill="#D8EFE5"
            stroke="#146456"
            strokeWidth="3"
          />
        </motion.g>

        <motion.circle
          cx="260"
          cy="260"
          r="74"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.17)"
          animate={
            shouldReduceMotion
              ? { opacity: 0.8, scale: 1 }
              : { opacity: [0.58, 0.9, 0.58], scale: [0.97, 1.03, 0.97] }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 4.8, ease: "easeInOut", repeat: Infinity }
          }
          style={{ transformOrigin: "260px 260px" }}
        />

        <g strokeLinecap="round" strokeLinejoin="round">
          <circle cx="260" cy="239" r="16" stroke="#FFF7E9" strokeWidth="4" />
          <path
            d="M227 289C230 270 243 259 260 259C277 259 290 270 293 289"
            stroke="#FFF7E9"
            strokeWidth="4"
          />
          <circle cx="218" cy="252" r="10" stroke="#F6B85C" strokeWidth="3" />
          <circle cx="302" cy="252" r="10" stroke="#F6B85C" strokeWidth="3" />
        </g>

        {[
          [123, 260],
          [397, 260],
          [260, 123],
          [260, 397],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle
              cx={cx}
              cy={cy}
              r="8"
              fill="#063627"
              stroke="#F9F1DF"
              strokeWidth="3"
            />
            <circle cx={cx} cy={cy} r="2.5" fill="#E88C24" />
          </g>
        ))}
      </svg>
    </div>
  );
}
