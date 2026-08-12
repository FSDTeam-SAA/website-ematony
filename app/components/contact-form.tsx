"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000/api/v1";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(`${baseUrl}/content/contact/issues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message || "Unable to send your message");
      form.reset();
      setStatus("sent");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to send your message");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[360px] flex-col items-center justify-center rounded-[28px] border border-[#bcd8c8] bg-white p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-[#146456]" />
        <h3 className="mt-5 text-[28px] font-bold text-[#063627]">Message sent</h3>
        <p className="mt-3 max-w-sm text-[16px] leading-7 text-[#587066]">Thank you for contacting Ajo Family. Our team will review your message.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 rounded-full bg-[#063627] px-6 py-3 font-bold text-white">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[30px] border border-white bg-white p-6 shadow-[0_26px_70px_rgba(3,54,39,0.12)] sm:p-8 lg:p-9">
      <div className="mb-7 border-b border-[#e4ede8] pb-6">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#146456]">Send a message</p>
        <h3 className="mt-2 text-[27px] font-bold text-[#063627] sm:text-[30px]">How can we help?</h3>
        <p className="mt-2 text-[15px] leading-6 text-[#6a7e75]">Fill in the form and our team will get back to you.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-[14px] font-bold text-[#063627]">Full name<input name="name" required maxLength={120} autoComplete="name" className="h-12 rounded-xl border border-[#cadbd2] bg-[#fbfdfc] px-4 font-normal outline-none transition focus:border-[#146456] focus:bg-white focus:ring-4 focus:ring-[#146456]/10" /></label>
        <label className="grid gap-2 text-[14px] font-bold text-[#063627]">Email address<input name="email" type="email" required maxLength={180} autoComplete="email" className="h-12 rounded-xl border border-[#cadbd2] bg-[#fbfdfc] px-4 font-normal outline-none transition focus:border-[#146456] focus:bg-white focus:ring-4 focus:ring-[#146456]/10" /></label>
        <label className="grid gap-2 text-[14px] font-bold text-[#063627]">Phone number <span className="sr-only">(optional)</span><input name="phone" type="tel" maxLength={40} autoComplete="tel" className="h-12 rounded-xl border border-[#cadbd2] bg-[#fbfdfc] px-4 font-normal outline-none transition focus:border-[#146456] focus:bg-white focus:ring-4 focus:ring-[#146456]/10" /></label>
        <label className="grid gap-2 text-[14px] font-bold text-[#063627]">Subject<input name="subject" maxLength={180} className="h-12 rounded-xl border border-[#cadbd2] bg-[#fbfdfc] px-4 font-normal outline-none transition focus:border-[#146456] focus:bg-white focus:ring-4 focus:ring-[#146456]/10" /></label>
      </div>
      <label className="mt-5 grid gap-2 text-[14px] font-bold text-[#063627]">Message<textarea name="message" required maxLength={3000} rows={5} className="resize-y rounded-xl border border-[#cadbd2] bg-[#fbfdfc] px-4 py-3 font-normal leading-6 outline-none transition focus:border-[#146456] focus:bg-white focus:ring-4 focus:ring-[#146456]/10" /></label>
      <label className="absolute -left-[9999px]" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {status === "error" ? <p role="alert" className="mt-4 text-[14px] font-semibold text-[#b42318]">{error}</p> : null}
      <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#063627] px-7 font-extrabold text-white shadow-[0_10px_24px_rgba(3,54,39,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0f5b46] disabled:cursor-wait disabled:opacity-60 sm:w-auto"><Send className="h-4 w-4" />{status === "sending" ? "Sending..." : "Send message"}</button>
    </form>
  );
}
