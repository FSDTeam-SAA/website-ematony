"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Download, QrCode, Smartphone, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

const DOWNLOAD_EVENT = "ajo-family:open-download";
const DOWNLOAD_HASH = "#get-started";
const DOWNLOAD_HISTORY_KEY = "ajoFamilyDownload";
const BODY_LOCK_COUNT = "data-ajo-body-lock-count";
const BODY_OVERFLOW = "data-ajo-body-overflow";
const ROOT_OVERFLOW = "data-ajo-root-overflow";

const APP_STORE_FALLBACK = "https://apps.apple.com/search?term=Ematony";
const PLAY_STORE_FALLBACK =
  "https://play.google.com/store/search?q=Ematony&c=apps";

export const storeLinks = [
  {
    label: "Download on the",
    store: "App Store",
    href: process.env.NEXT_PUBLIC_APP_STORE_URL || APP_STORE_FALLBACK,
    icon: "/brand/apple-logo.svg",
  },
  {
    label: "Get it on",
    store: "Google Play",
    href: process.env.NEXT_PUBLIC_PLAY_STORE_URL || PLAY_STORE_FALLBACK,
    icon: "/brand/google-play-logo.svg",
  },
];

type DownloadEventDetail = {
  trigger?: HTMLElement;
};

type DownloadAppButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "type"
> & {
  children?: ReactNode;
};

function focusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(
    (element) =>
      element.getAttribute("aria-hidden") !== "true" &&
      element.getClientRects().length > 0,
  );
}

function useHydrated() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

/**
 * Locks page scrolling without fighting another open overlay. The shared DOM
 * counter lets the mobile menu hand off to the download sheet cleanly.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const root = document.documentElement;
    const currentCount = Number(root.getAttribute(BODY_LOCK_COUNT) || "0");

    if (currentCount === 0) {
      root.setAttribute(BODY_OVERFLOW, document.body.style.overflow);
      root.setAttribute(ROOT_OVERFLOW, root.style.overflow);
      document.body.style.overflow = "hidden";
      root.style.overflow = "hidden";
    }

    root.setAttribute(BODY_LOCK_COUNT, String(currentCount + 1));

    return () => {
      const nextCount = Math.max(
        0,
        Number(root.getAttribute(BODY_LOCK_COUNT) || "1") - 1,
      );

      if (nextCount > 0) {
        root.setAttribute(BODY_LOCK_COUNT, String(nextCount));
        return;
      }

      document.body.style.overflow = root.getAttribute(BODY_OVERFLOW) || "";
      root.style.overflow = root.getAttribute(ROOT_OVERFLOW) || "";
      root.removeAttribute(BODY_LOCK_COUNT);
      root.removeAttribute(BODY_OVERFLOW);
      root.removeAttribute(ROOT_OVERFLOW);
    };
  }, [active]);
}

export function StoreButtons({
  compact = false,
  stacked = false,
}: {
  compact?: boolean;
  stacked?: boolean;
}) {
  return (
    <div
      className={`grid w-full gap-3 ${
        stacked ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
      }`}
    >
      {storeLinks.map((item) => (
        <a
          key={item.store}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#081c17] px-4 text-left text-white shadow-[0_12px_28px_rgba(4,38,29,0.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#063627] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8a33a] focus-visible:ring-offset-2 ${
            compact ? "h-[54px]" : "h-[64px]"
          }`}
          aria-label={`${item.label} ${item.store} (opens in a new tab)`}
        >
          <span className="flex min-w-0 items-center gap-3">
            <span
              className={`flex shrink-0 items-center justify-center rounded-xl bg-white ${
                compact ? "h-8 w-8 p-1.5" : "h-10 w-10 p-2"
              }`}
            >
              <Image
                src={item.icon}
                alt=""
                width={28}
                height={28}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="min-w-0 leading-none">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-white/65">
                {item.label}
              </span>
              <span
                className={`mt-1 block truncate font-bold ${
                  compact ? "text-[15px]" : "text-[18px]"
                }`}
              >
                {item.store}
              </span>
            </span>
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-white/55 transition group-hover:text-[#f4bd63]"
          />
        </a>
      ))}
    </div>
  );
}

export function DownloadAppButton({
  children = "Download app",
  className = "inline-flex h-12 items-center justify-center rounded-full bg-[#e99a32] px-6 text-[15px] font-bold text-[#082b21] shadow-[0_14px_32px_rgba(232,140,36,0.25)] transition hover:-translate-y-0.5 hover:bg-[#f4b95d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32] focus-visible:ring-offset-2",
  onClick,
  ...props
}: DownloadAppButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        const nextUrl = `${window.location.pathname}${window.location.search}${DOWNLOAD_HASH}`;
        const historyState =
          window.history.state && typeof window.history.state === "object"
            ? window.history.state
            : {};
        window.history.pushState(
          { ...historyState, [DOWNLOAD_HISTORY_KEY]: true },
          "",
          nextUrl,
        );
        window.dispatchEvent(
          new CustomEvent<DownloadEventDetail>(DOWNLOAD_EVENT, {
            detail: { trigger: event.currentTarget },
          }),
        );
      }}
    >
      {children}
    </button>
  );
}

/**
 * Render once near the page shell. Every DownloadAppButton communicates with
 * this host, so a page can contain many CTAs without mounting duplicate dialogs.
 */
export function DownloadExperience() {
  const mounted = useHydrated();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const restoreAfterExitRef = useRef(false);
  const titleId = useId();
  const descriptionId = useId();
  const reduceMotion = useReducedMotion();

  const openDialog = useCallback((trigger?: HTMLElement) => {
    const activeElement = document.activeElement;
    triggerRef.current =
      trigger ??
      (activeElement instanceof HTMLElement && activeElement !== document.body
        ? activeElement
        : null);
    openRef.current = true;
    setOpen(true);
  }, []);

  const restoreFocus = useCallback(() => {
    window.requestAnimationFrame(() => {
      const previousTrigger = triggerRef.current;
      if (previousTrigger?.isConnected && previousTrigger.getClientRects().length) {
        previousTrigger.focus();
        triggerRef.current = null;
        return;
      }

      const fallback = Array.from(
        document.querySelectorAll<HTMLElement>("[data-download-focus-fallback]"),
      ).find((element) => element.getClientRects().length > 0);
      fallback?.focus();
      triggerRef.current = null;
    });
  }, []);

  const closeDialog = useCallback(
    (updateHash = true) => {
      const wasOpen = openRef.current;
      openRef.current = false;
      setOpen(false);

      if (updateHash && window.location.hash === DOWNLOAD_HASH) {
        if (window.history.state?.[DOWNLOAD_HISTORY_KEY]) {
          window.history.back();
        } else {
          window.history.replaceState(
            window.history.state,
            "",
            `${window.location.pathname}${window.location.search}`,
          );
        }
      }

      if (wasOpen) restoreAfterExitRef.current = true;
    },
    [],
  );

  useBodyScrollLock(open);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const detail = (event as CustomEvent<DownloadEventDetail>).detail;
      openDialog(detail?.trigger);
    };

    const syncWithHash = () => {
      if (window.location.hash === DOWNLOAD_HASH) {
        openDialog();
      } else {
        closeDialog(false);
      }
    };

    window.addEventListener(DOWNLOAD_EVENT, handleOpen);
    window.addEventListener("hashchange", syncWithHash);
    window.addEventListener("popstate", syncWithHash);
    const initialHashCheck = window.setTimeout(syncWithHash, 0);

    return () => {
      window.clearTimeout(initialHashCheck);
      window.removeEventListener(DOWNLOAD_EVENT, handleOpen);
      window.removeEventListener("hashchange", syncWithHash);
      window.removeEventListener("popstate", syncWithHash);
    };
  }, [closeDialog, openDialog]);

  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("[data-dialog-autofocus]")
        ?.focus();
    }, 0);

    return () => window.clearTimeout(focusTimer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleDocumentEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      closeDialog();
    };

    document.addEventListener("keydown", handleDocumentEscape);
    return () => document.removeEventListener("keydown", handleDocumentEscape);
  }, [closeDialog, open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
      return;
    }

    if (event.key !== "Tab" || !panelRef.current) return;

    const focusable = focusableElements(panelRef.current);
    if (focusable.length === 0) {
      event.preventDefault();
      panelRef.current.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!mounted || typeof document === "undefined") return null;

  const qrDestination = `${window.location.origin}/#get-started`;

  return createPortal(
    <>
      <div
        aria-hidden={open || undefined}
        inert={open || undefined}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#062f24]/96 p-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(3,29,22,0.18)] backdrop-blur-xl lg:hidden"
      >
        <DownloadAppButton data-download-focus-fallback className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#e99a32] px-6 text-[15px] font-extrabold text-[#082b21] shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          <Download aria-hidden="true" className="h-4 w-4" />
          Download Ajo Family
        </DownloadAppButton>
      </div>

      <AnimatePresence
        initial={false}
        onExitComplete={() => {
          if (!restoreAfterExitRef.current) return;
          restoreAfterExitRef.current = false;
          restoreFocus();
        }}
      >
        {open ? (
        <motion.div
          className="fixed inset-0 z-[150] flex items-end justify-center overflow-y-auto bg-[#031d16]/72 px-0 pt-8 backdrop-blur-md sm:items-center sm:px-5 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            className="relative max-h-[calc(100dvh-32px)] w-full overflow-y-auto overscroll-contain rounded-t-[30px] bg-[#fffaf0] p-5 pb-[max(24px,env(safe-area-inset-bottom))] text-left shadow-[0_32px_100px_rgba(0,0,0,0.38)] outline-none sm:max-h-[calc(100dvh-64px)] sm:max-w-[760px] sm:rounded-[32px] sm:p-8"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 40, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 28, scale: 0.985 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <div
              aria-hidden="true"
              className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#0c3d2f]/18 sm:hidden"
            />

            <button
              type="button"
              data-dialog-autofocus
              onClick={() => closeDialog()}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0c3d2f]/10 bg-white text-[#0a3b2d] shadow-sm transition hover:bg-[#e9f5ec] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32] sm:right-6 sm:top-6"
              aria-label="Close download options"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>

            <div className="pr-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0f5b46]/12 bg-[#e7f3e9] px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0b5a43]">
                <Smartphone aria-hidden="true" className="h-3.5 w-3.5" />
                Ajo Family by Ematony
              </div>
              <h2
                id={titleId}
                className="mt-4 max-w-[14ch] text-[30px] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#062f24] sm:text-[42px]"
              >
                Your circle goes wherever you do.
              </h2>
              <p
                id={descriptionId}
                className="mt-3 max-w-[580px] text-[15px] leading-6 text-[#52665e] sm:text-[17px] sm:leading-7"
              >
                Download the app to join a savings circle, follow contributions,
                and see every payout step in one clear place.
              </p>
            </div>

            <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-[210px_1fr]">
              <div className="hidden flex-col items-center justify-center rounded-[24px] border border-[#0c3d2f]/10 bg-white p-5 sm:flex">
                <div className="rounded-[18px] border border-[#0c3d2f]/10 bg-white p-3 shadow-[0_12px_30px_rgba(6,54,39,0.08)]">
                  <QRCodeSVG
                    value={qrDestination}
                    size={148}
                    level="M"
                    marginSize={0}
                    bgColor="#ffffff"
                    fgColor="#063627"
                    title="QR code to open Ajo Family download options"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-[13px] font-bold text-[#0b5a43]">
                  <QrCode aria-hidden="true" className="h-4 w-4" />
                  Scan with your phone
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-[24px] bg-[#e7f3e9] p-4 sm:p-5">
                <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[#0b5a43]">
                  Choose your store
                </p>
                <StoreButtons stacked />
                <p className="mt-3 text-[12px] leading-5 text-[#405c52]">
                  Store availability may vary by region. Links open in a new
                  tab.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        ) : null}
      </AnimatePresence>
    </>,
    document.body,
  );
}
