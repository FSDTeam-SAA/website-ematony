"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PublicTeamMember } from "@/app/lib/content";

export function TeamCarousel({ members }: { members: PublicTeamMember[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(members.length / itemsPerView));

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

  const scrollToPage = useCallback(
    (page: number) => {
      const track = trackRef.current;
      if (!track) return;
      const normalizedPage = (page + pageCount) % pageCount;
      const target = track.children[pageStartIndexes[normalizedPage]] as HTMLElement | undefined;
      track.scrollTo({ left: target?.offsetLeft ?? 0, behavior: "smooth" });
      setCurrentPage(normalizedPage);
    },
    [pageCount, pageStartIndexes],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const updateCurrentPage = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        const closestPage = pageStartIndexes.reduce((bestPage, itemIndex, page) => {
          const bestIndex = pageStartIndexes[bestPage];
          const bestDistance = Math.abs((children[bestIndex]?.offsetLeft ?? 0) - track.scrollLeft);
          const distance = Math.abs((children[itemIndex]?.offsetLeft ?? 0) - track.scrollLeft);
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
  }, [pageStartIndexes]);

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
            <p className="mt-4 text-[15px] leading-7 text-[#587066]">{member.bio}</p>
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
    </div>
  );
}
