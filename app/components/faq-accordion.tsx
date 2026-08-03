import type { PublicFaq } from "@/app/lib/faqs";

export function FaqAccordion({ faqs }: { faqs: PublicFaq[] }) {
  if (!faqs.length) {
    return (
      <div className="rounded-[8px] border border-dashed border-[#cfe3d8] bg-white p-6 text-[16px] leading-7 text-[#51645a]">
        FAQs are managed from the admin dashboard. Published questions will
        appear here after they are added through the API.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {faqs.map((faq, index) => (
        <details
          key={faq._id ?? `${faq.question}-${index}`}
          className="group rounded-[8px] border border-[#e4e7ec] bg-white shadow-[0_10px_30px_rgba(6,54,39,0.05)] transition duration-300 open:border-[#cfe3d8] hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(6,54,39,0.10)]"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 p-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#e8f5ec] text-[15px] font-extrabold text-[#063627]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-bold uppercase text-[#146456]">
                {faq.category ?? "General"}
              </span>
              <span className="mt-1 block text-[20px] font-bold leading-[1.2] text-[#063627] sm:text-[22px]">
                {faq.question}
              </span>
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f9f1df] text-[24px] font-semibold leading-none text-[#063627] transition group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="border-t border-[#e4e7ec] px-5 pb-5 pt-4 motion-safe:animate-answer-open sm:ml-14">
            <p className="text-[16px] leading-7 text-[#51645a]">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
