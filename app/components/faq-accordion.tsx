import type { PublicFaq } from "@/app/lib/faqs";

export function FaqAccordion({ faqs }: { faqs: PublicFaq[] }) {
  if (!faqs.length) {
    return (
      <div
        role="status"
        className="rounded-[24px] border border-dashed border-[#b9d6c7] bg-[#f8fcf9] p-6 text-[16px] leading-7 text-[#405c52] shadow-[0_14px_40px_rgba(6,54,39,0.05)] sm:p-8"
      >
        FAQs are being refreshed. If you need help now, in-app support is
        available in Ajo Family.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {faqs.map((faq, index) => (
        <details
          key={faq._id ?? `${faq.question}-${index}`}
          className="group rounded-[24px] border border-[#dce6df] bg-white shadow-[0_10px_30px_rgba(6,54,39,0.05)] transition duration-300 open:border-[#b9d6c7] open:shadow-[0_18px_42px_rgba(6,54,39,0.09)] hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(6,54,39,0.10)]"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 p-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#e8f5ec] text-[15px] font-extrabold text-[#063627]">
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
            <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f9f1df] text-[24px] font-semibold leading-none text-[#063627] transition group-open:rotate-45">
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
