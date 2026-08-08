"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { PublicTestimonial } from "@/app/lib/content";

export function TestimonialCarousel({ testimonials }: { testimonials: PublicTestimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(testimonials.length / itemsPerView));

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const tablet = window.matchMedia("(min-width: 640px)");
    const updateItemsPerView = () => {
      const nextValue = desktop.matches ? 3 : tablet.matches ? 2 : 1;
      setItemsPerView(nextValue);
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
    <div className="mt-12" role="region" aria-roledescription="carousel" aria-label="Customer testimonials">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((testimonial, index) => (
          <figure
            key={testimonial._id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${testimonials.length}`}
            className="flex min-h-[360px] shrink-0 basis-full snap-start flex-col rounded-[26px] border border-white/12 bg-white/[0.08] p-6 backdrop-blur-sm sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]"
          >
            <Quote className="h-8 w-8 text-[#f5b94b]" />
            <div className="mt-5 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, star) => (
                <Star key={star} className={`h-4 w-4 ${star < testimonial.rating ? "fill-[#f5b94b] text-[#f5b94b]" : "text-white/25"}`} />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 text-[17px] leading-8 text-[#e2eee8]">“{testimonial.review}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5b94b] bg-cover bg-center text-[13px] font-extrabold text-[#063627]"
                style={testimonial.imageUrl ? { backgroundImage: `url(${testimonial.imageUrl})` } : undefined}
              >
                {testimonial.imageUrl ? <span className="sr-only">Photo of {testimonial.name}</span> : testimonial.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-white">{testimonial.name}</div>
                {testimonial.location ? <div className="mt-1 text-[13px] text-white/55">{testimonial.location}</div> : null}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {pageCount > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-5">
          <div className="flex items-center gap-2" aria-label="Choose testimonial page">
            {pageStartIndexes.map((_, page) => (
              <button
                key={page}
                type="button"
                aria-label={`Go to testimonial page ${page + 1}`}
                aria-current={currentPage === page ? "true" : undefined}
                onClick={() => scrollToPage(page)}
                className={`h-2.5 rounded-full transition-all ${currentPage === page ? "w-8 bg-[#f5b94b]" : "w-2.5 bg-white/30 hover:bg-white/55"}`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => scrollToPage(currentPage - 1)} aria-label="Previous testimonials" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white transition hover:border-[#f5b94b] hover:bg-white/[0.14] hover:text-[#f5b94b]"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => scrollToPage(currentPage + 1)} aria-label="Next testimonials" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f5b94b] text-[#063627] transition hover:bg-[#ffd47a]"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
