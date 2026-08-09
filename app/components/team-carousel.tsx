"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, X } from "lucide-react";
import type { PublicTeamMember } from "@/app/lib/content";

export function TeamCarousel({ members }: { members: PublicTeamMember[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const visionDialogRef = useRef<HTMLDialogElement>(null);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMember, setSelectedMember] = useState<PublicTeamMember | null>(null);
  const pageCount = Math.max(1, Math.ceil(members.length / itemsPerView));

  useEffect(() => {
    const dialog = visionDialogRef.current;
    if (selectedMember && dialog && !dialog.open) dialog.showModal();
  }, [selectedMember]);

  const closeVision = () => visionDialogRef.current?.close();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const tablet = window.matchMedia("(min-width: 640px)");
    const updateItemsPerView = () => {
      setItemsPerView(desktop.matches ? 3 : tablet.matches ? 2 : 1);
      setCurrentPage(0);
      trackRef.current?.scrollTo({ left: 0 });
    };

    updateItemsPerView();
    desktop.addEventListener("change", updateItemsPerView);
    tablet.addEventListener("change", updateItemsPerView);
    return () => {
      desktop.removeEventListener("change", updateItemsPerView);
      tablet.removeEventListener("change", updateItemsPerView);
    };
  }, []);

  const pageStartIndexes = useMemo(
    () => Array.from({ length: pageCount }, (_, index) => index * itemsPerView),
    [itemsPerView, pageCount],
  );

  const getPageScrollLeft = useCallback(
    (track: HTMLDivElement, page: number) => {
      const firstItem = track.children[0] as HTMLElement | undefined;
      const targetItem = track.children[pageStartIndexes[page]] as HTMLElement | undefined;
      if (!firstItem || !targetItem) return 0;

      const itemOffset = targetItem.offsetLeft - firstItem.offsetLeft;
      const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
      return Math.min(Math.max(0, itemOffset), maxScrollLeft);
    },
    [pageStartIndexes],
  );

  const scrollToPage = useCallback(
    (page: number) => {
      const track = trackRef.current;
      if (!track) return;
      const normalizedPage = (page + pageCount) % pageCount;
      track.scrollTo({ left: getPageScrollLeft(track, normalizedPage), behavior: "smooth" });
      setCurrentPage(normalizedPage);
    },
    [getPageScrollLeft, pageCount],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const updateCurrentPage = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const closestPage = pageStartIndexes.reduce((bestPage, _, page) => {
          const bestDistance = Math.abs(getPageScrollLeft(track, bestPage) - track.scrollLeft);
          const distance = Math.abs(getPageScrollLeft(track, page) - track.scrollLeft);
          return distance < bestDistance ? page : bestPage;
        }, 0);
        setCurrentPage(closestPage);
      });
    };

    track.addEventListener("scroll", updateCurrentPage, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      track.removeEventListener("scroll", updateCurrentPage);
    };
  }, [getPageScrollLeft, pageStartIndexes]);

  return (
    <div className="mt-12" role="region" aria-roledescription="carousel" aria-label="Ajo Family team">
      <div ref={trackRef} className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {members.map((member, index) => (
          <article
            key={member._id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${members.length}`}
            className="flex min-h-[330px] shrink-0 basis-full snap-start flex-col overflow-hidden rounded-[26px] border border-[#d6e4dc] bg-white p-6 shadow-[0_14px_35px_rgba(3,54,39,0.055)] sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-[#e7f4eb] bg-cover bg-center text-[24px] font-extrabold text-[#146456]"
              style={member.imageUrl ? { backgroundImage: `url(${member.imageUrl})` } : undefined}
            >
              {member.imageUrl ? <span className="sr-only">Photo of {member.name}</span> : member.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
            </div>
            <h3 className="mt-6 text-[25px] font-bold text-[#063627]">{member.name}</h3>
            <p className="mt-1 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#146456]">{member.role}</p>
            <p className="mt-4 line-clamp-5 whitespace-pre-line text-[15px] leading-7 text-[#587066]">{member.bio}</p>
            {member.bio.length > 280 ? (
              <button
                type="button"
                onClick={() => setSelectedMember(member)}
                className="mt-auto self-start pt-5 text-[14px] font-extrabold text-[#146456] underline decoration-[#9eb8aa] underline-offset-4 transition hover:text-[#063627] hover:decoration-[#146456]"
              >
                Read full vision
              </button>
            ) : null}
          </article>
        ))}
      </div>

      {pageCount > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-5">
          <div className="flex items-center gap-2" aria-label="Choose team page">
            {pageStartIndexes.map((_, page) => (
              <button
                key={page}
                type="button"
                aria-label={`Go to team page ${page + 1}`}
                aria-current={currentPage === page ? "true" : undefined}
                onClick={() => scrollToPage(page)}
                className={`h-2.5 rounded-full transition-all ${currentPage === page ? "w-8 bg-[#146456]" : "w-2.5 bg-[#9eb8aa] hover:bg-[#6f9582]"}`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => scrollToPage(currentPage - 1)} aria-label="Previous team members" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#b9ccc1] bg-white text-[#063627] transition hover:border-[#146456] hover:bg-[#e7f4eb]"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => scrollToPage(currentPage + 1)} aria-label="Next team members" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#063627] text-white transition hover:bg-[#0f5b46]"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      ) : null}

      <dialog
        ref={visionDialogRef}
        aria-labelledby="team-vision-title"
        onClose={() => setSelectedMember(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeVision();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[760px] overflow-y-auto rounded-[30px] border border-[#d6e4dc] bg-[#fffaf0] p-0 text-left text-[#063627] shadow-[0_30px_100px_rgba(3,54,39,0.28)] backdrop:bg-[#032f25]/70 backdrop:backdrop-blur-sm"
      >
        {selectedMember ? (
          <div className="relative p-6 sm:p-9">
            <button
              type="button"
              onClick={closeVision}
              aria-label="Close full vision"
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d6e4dc] bg-white text-[#063627] transition hover:border-[#146456] hover:bg-[#e7f4eb]"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e7f4eb] text-[#146456]">
              <Quote aria-hidden="true" className="h-6 w-6" />
            </div>
            <p className="mt-6 text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#146456]">
              Founder&apos;s vision
            </p>
            <h3 id="team-vision-title" className="mt-3 pr-12 text-[32px] font-bold leading-tight sm:text-[40px]">
              {selectedMember.name}
            </h3>
            <p className="mt-1 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#146456]">
              {selectedMember.role}
            </p>
            <p className="mt-7 whitespace-pre-line text-[16px] leading-8 text-[#587066] sm:text-[17px]">
              {selectedMember.bio}
            </p>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
