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
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#d6e4dc] bg-white p-6 shadow-[0_18px_50px_rgba(3,54,39,0.08)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-[14px] font-bold text-[#063627]">Full name<input name="name" required maxLength={120} className="h-12 rounded-xl border border-[#cddbd3] px-4 font-normal outline-none focus:border-[#146456]" /></label>
        <label className="grid gap-2 text-[14px] font-bold text-[#063627]">Email address<input name="email" type="email" required maxLength={180} className="h-12 rounded-xl border border-[#cddbd3] px-4 font-normal outline-none focus:border-[#146456]" /></label>
        <label className="grid gap-2 text-[14px] font-bold text-[#063627]">Phone number<input name="phone" maxLength={40} className="h-12 rounded-xl border border-[#cddbd3] px-4 font-normal outline-none focus:border-[#146456]" /></label>
        <label className="grid gap-2 text-[14px] font-bold text-[#063627]">Subject<input name="subject" maxLength={180} className="h-12 rounded-xl border border-[#cddbd3] px-4 font-normal outline-none focus:border-[#146456]" /></label>
      </div>
      <label className="mt-5 grid gap-2 text-[14px] font-bold text-[#063627]">Message<textarea name="message" required maxLength={3000} rows={6} className="rounded-xl border border-[#cddbd3] px-4 py-3 font-normal leading-6 outline-none focus:border-[#146456]" /></label>
      <label className="absolute -left-[9999px]" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {status === "error" ? <p role="alert" className="mt-4 text-[14px] font-semibold text-[#b42318]">{error}</p> : null}
      <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#063627] px-6 font-extrabold text-white transition hover:bg-[#0f5b46] disabled:cursor-wait disabled:opacity-60 sm:w-auto"><Send className="h-4 w-4" />{status === "sending" ? "Sending..." : "Send message"}</button>
    </form>
  );
}
