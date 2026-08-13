"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Download,
  Menu,
  X,
} from "lucide-react";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  DownloadAppButton,
  DownloadExperience,
  useBodyScrollLock,
} from "@/app/components/download-modal";

const navigation = [
  { href: "/#about", label: "About" },
  { href: "/#how-it-works", label: "How it works"},
  { href: "/#pathways", label: "Pathways"},
  { href: "/#features", label: "Features"},
  { href: "/#security", label: "Trust"},
  { href: "/#team", label: "Team"},
  { href: "/#testimonials", label: "Reviews"},
  { href: "/#faqs", label: "FAQ"},
  { href: "/#contact", label: "Contact"},
];

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(
    (element) =>
      element.getAttribute("aria-hidden") !== "true" &&
      element.getClientRects().length > 0,
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const restoreMenuFocusRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useBodyScrollLock(menuOpen);

  const closeMenu = useCallback((restoreFocus = true) => {
    restoreMenuFocusRef.current = restoreFocus;
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeAtDesktop = () => {
      if (desktop.matches) closeMenu(false);
    };

    closeAtDesktop();
    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, [closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;

    const focusTimer = window.setTimeout(() => {
      menuPanelRef.current
        ?.querySelector<HTMLElement>("[data-menu-autofocus]")
        ?.focus();
    }, 0);

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      closeMenu();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeMenu, menuOpen]);

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab" || !menuPanelRef.current) return;

    const focusable = getFocusableElements(menuPanelRef.current);
    if (focusable.length === 0) {
      event.preventDefault();
      menuPanelRef.current.focus();
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

  const mobileMenu =
    typeof document === "undefined"
      ? null
      : createPortal(
          <AnimatePresence
            initial={false}
            onExitComplete={() => {
              if (!restoreMenuFocusRef.current) return;
              restoreMenuFocusRef.current = false;
              menuTriggerRef.current?.focus();
            }}
          >
            {menuOpen ? (
              <div className="fixed inset-0 z-[100] xl:hidden">
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#031d16]/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  onPointerDown={() => closeMenu()}
                />

                <motion.div
                  id="mobile-navigation"
                  ref={menuPanelRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site navigation"
                  tabIndex={-1}
                  onKeyDown={handleMenuKeyDown}
                  className="absolute inset-y-0 right-0 flex w-[min(90vw,400px)] flex-col overflow-y-auto bg-[#fffaf0] p-5 pb-[max(24px,env(safe-area-inset-bottom))] shadow-[-24px_0_80px_rgba(0,0,0,0.26)] outline-none"
                  initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-[#0c3d2f]/10 pb-5">
                    <Link
                      href="/"
                      className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32]"
                      aria-label="Ajo Family home"
                      onClick={() => closeMenu(false)}
                    >
                      <Image
                        src="/brand/ajo-family-logo.png"
                        alt=""
                        width={147}
                        height={132}
                        className="h-11 w-auto shrink-0 object-contain"
                      />
                    </Link>
                    <button
                      type="button"
                      data-menu-autofocus
                      onClick={() => closeMenu()}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0c3d2f]/10 bg-white text-[#07372a] shadow-sm transition hover:bg-[#e8f4ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32]"
                      aria-label="Close menu"
                    >
                      <X aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>

                  <nav aria-label="Mobile navigation" className="py-5">
                    <ul className="grid gap-1">
                      {navigation.map((item) => {
                        return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => closeMenu(false)}
                            className="group flex min-h-14 items-center justify-between rounded-2xl px-4 text-[19px] font-bold text-[#0a3b2d] transition hover:bg-[#e8f4ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32]"
                          >
                            <span className="flex items-center gap-4">
                              {item.label}
                            </span>
                            <ArrowRight
                              aria-hidden="true"
                              className="h-4 w-4 text-[#6c827a] transition group-hover:translate-x-1 group-hover:text-[#0a3b2d]"
                            />
                          </Link>
                        </li>
                        );
                      })}
                    </ul>
                  </nav>

                  <div className="mt-auto rounded-[24px] bg-[#07372a] p-5 text-white">
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#f4bd63]">
                      Save together, clearly
                    </p>
                    <p className="mt-2 text-[16px] leading-6 text-white/75">
                      Contributions, rotation, and payout progress in one mobile
                      experience.
                    </p>
                    <DownloadAppButton
                      onClick={() => closeMenu(false)}
                      className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#e99a32] px-5 text-[15px] font-extrabold text-[#082b21] transition hover:bg-[#f4b95d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Download aria-hidden="true" className="h-4 w-4" />
                      Download the app
                    </DownloadAppButton>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>,
          document.body,
        );

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[200] -translate-y-24 rounded-full bg-[#fffaf0] px-5 py-3 text-[14px] font-bold text-[#063627] shadow-xl transition focus:translate-y-0"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 border-b border-[#0c3d2f]/10 bg-[#fffaf0]/92 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[78px] w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32] focus-visible:ring-offset-4"
            aria-label="Ajo Family home"
          >
            <Image
              src="/brand/ajo-family-logo.png"
              alt=""
              width={147}
              height={132}
              priority
              className="h-12 w-auto shrink-0 object-contain sm:h-[54px]"
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {navigation.map((item) => {
              return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2.5 text-[13px] font-bold text-[#315b50] transition hover:bg-[#e8f4ea] hover:text-[#07372a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32] xl:px-3 xl:text-[14px]"
              >
                {item.label}
              </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <DownloadAppButton data-download-focus-fallback className="hidden h-12 items-center justify-center gap-2 rounded-full bg-[#07372a] px-6 text-[14px] font-extrabold text-white shadow-[0_14px_34px_rgba(6,54,39,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0f5b46] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32] focus-visible:ring-offset-2 xl:inline-flex">
              Download app
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </DownloadAppButton>
            <button
              ref={menuTriggerRef}
              type="button"
              data-download-focus-fallback
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#0c3d2f]/12 bg-white text-[#07372a] shadow-sm transition hover:bg-[#e8f4ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32] xl:hidden"
              aria-label="Open menu"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenu}

      <DownloadExperience />
    </>
  );
}
