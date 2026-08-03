"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export const storeLinks = [
  {
    label: "Download on the",
    store: "App Store",
    href: "https://apps.apple.com/search?term=Ematony",
    icon: "/brand/apple-logo.svg",
  },
  {
    label: "Get it on",
    store: "Google Play",
    href: "https://play.google.com/store/search?q=Ematony&c=apps",
    icon: "/brand/google-play-logo.svg",
  },
];

type DownloadAppButtonProps = {
  children?: ReactNode;
  className?: string;
};

export function StoreButtons({
  compact = false,
  stacked = false,
}: {
  compact?: boolean;
  stacked?: boolean;
}) {
  return (
    <div className={`grid w-full gap-3 ${stacked ? "grid-cols-2" : "sm:grid-cols-2"}`}>
      {storeLinks.map((item) => (
        <a
          key={item.store}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex h-[58px] w-full items-center justify-center gap-2 rounded-[10px] bg-black px-3 text-white transition hover:-translate-y-0.5 hover:bg-[#063627] sm:gap-3 sm:px-5 ${
            compact ? "sm:h-[50px]" : ""
          }`}
          aria-label={`${item.label} ${item.store}`}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] bg-white p-1.5">
            <Image
              src={item.icon}
              alt={`${item.store} logo`}
              width={24}
              height={24}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block text-[11px] font-semibold text-white/80">
              {item.label}
            </span>
            <span className="mt-1 block text-[15px] font-extrabold sm:text-[20px]">
              {item.store}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function DownloadAppButton({
  children = "Get started",
  className,
}: DownloadAppButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const openModal = () => {
    window.history.replaceState(null, "", "#get-started");
    setOpen(true);
  };

  const closeModal = () => {
    if (window.location.hash === "#get-started") {
      window.history.replaceState(null, "", window.location.pathname);
    }
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={className}
      >
        {children}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center overflow-y-auto bg-[#121827]/45 px-4 py-6 backdrop-blur-[6px] motion-safe:animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-modal-title"
          onClick={closeModal}
        >
          <div
            className="max-h-[calc(100dvh-48px)] w-full max-w-[500px] overflow-y-auto rounded-[18px] bg-white px-6 py-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.28)] motion-safe:animate-modal-pop sm:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[18px] bg-[#e8f5ec] p-3">
              <Image
                src="/brand/ajo-family-logo.png"
                alt="Ajo Family"
                width={96}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>

            <h2
              id="download-modal-title"
              className="mt-5 text-[24px] font-extrabold leading-tight text-[#101828]"
            >
              Continue in the app
            </h2>
            <p className="mx-auto mt-3 max-w-[320px] text-[16px] leading-7 text-[#53627a]">
              Group savings, messaging, wallet activity, and payout tracking
              happen in the Ematony app. Download it to connect with your
              savings circle.
            </p>

            <div className="mt-6">
              <StoreButtons stacked />
            </div>

            <button
              type="button"
              className="mt-5 text-[15px] font-semibold text-[#71809a] transition hover:text-[#063627]"
              onClick={closeModal}
            >
              Maybe later
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
