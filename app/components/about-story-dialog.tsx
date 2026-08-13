"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { BookOpenText, X } from "lucide-react";

export function AboutStoryDialog({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openDialog}
        className="mt-9 w-fit text-[15px] font-extrabold text-[#146456] underline decoration-[#9eb8aa] underline-offset-4 transition hover:text-[#063627] hover:decoration-[#146456] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32]"
      >
        Read full story
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="about-story-title"
        onClose={() => triggerRef.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[1100px] overflow-y-auto rounded-[28px] border border-[#d6e4dc] bg-[#fffaf0] p-0 text-left text-[#063627] shadow-[0_32px_110px_rgba(3,54,39,0.32)] backdrop:bg-[#032f25]/72 backdrop:backdrop-blur-sm sm:rounded-[34px]"
      >
        <div className="relative">
          <header className="sticky top-0 z-10 border-b border-[#d6e4dc] bg-[#fffaf0]/95 px-6 py-5 backdrop-blur-xl sm:px-9">
            <div className="flex items-center justify-between gap-5">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e7f4eb] text-[#146456]">
                  <BookOpenText aria-hidden="true" size={21} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#146456]">
                    About Ajo Family
                  </p>
                  <h2 id="about-story-title" className="mt-1 truncate text-[20px] font-bold text-[#063627] sm:text-[24px]">
                    {title}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close full About story"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d6e4dc] bg-white text-[#063627] transition hover:border-[#146456] hover:bg-[#e7f4eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e99a32]"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </header>

          <article className="bg-white px-6 py-7 sm:px-9 sm:py-9 lg:px-12 lg:py-11">
            {children}
          </article>
        </div>
      </dialog>
    </>
  );
}
