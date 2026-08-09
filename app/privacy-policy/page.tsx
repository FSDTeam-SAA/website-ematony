import type { Metadata } from "next";
import { Footer, Header, LegalPage } from "@/app/components/site-shell";
import { getPublicPage } from "@/app/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Ajo Family savings and group contribution services.",
};

const sections = [
  {
    title: "Information we collect",
    body: [
      "We may collect account details such as your name, email address, phone number, password, profile photo, and other information you provide when creating or updating an Ajo Family account.",
      "When you use group savings, wallet, KYC, payment, notification, and support features, we may collect related transaction records, group membership details, verification status, device information, and support messages.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "We use your information to create and secure your account, verify members, process contributions, show group progress, manage rotating payout activity, send notifications, and respond to support requests.",
      "We may also use information to improve product reliability, prevent misuse, investigate suspicious activity, and meet legal or regulatory obligations that apply to financial and identity-related services.",
    ],
  },
  {
    title: "Payments and verification",
    body: [
      "Payment and identity verification services may be handled by trusted third-party providers. These providers process information needed to complete wallet funding, withdrawals, identity checks, fraud prevention, and payment reconciliation.",
      "Ajo Family does not ask you to share sensitive payment credentials outside approved payment or verification flows.",
    ],
  },
  {
    title: "Sharing information",
    body: [
      "We do not sell your personal information. We may share limited information with service providers, administrators, legal authorities, or other parties when needed to operate the service, enforce our terms, resolve disputes, or comply with law.",
      "Inside a savings group, certain member and contribution details may be visible to group participants or administrators so the group can operate transparently.",
    ],
  },
  {
    title: "Data security",
    body: [
      "We use reasonable technical and organizational safeguards to protect account, payment, group, and verification information. No online system can be guaranteed to be completely secure.",
      "You are responsible for keeping your login credentials private and for notifying us if you believe your account has been compromised.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You may update account information, manage notifications where available, or contact support to request help with account access, data correction, or account-related questions.",
      "Some records may need to be retained for security, fraud prevention, payment reconciliation, dispute handling, or legal compliance.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For privacy questions or requests, contact the Ajo Family support team through the app or the official support channel.",
    ],
  },
];

export default async function PrivacyPolicyPage() {
  const page = await getPublicPage("privacy-policy", {
    slug: "privacy-policy",
    title: "Privacy Policy",
    updatedLabel: "August 3, 2026",
    intro: "This Privacy Policy explains how Ajo Family collects, uses, protects, and shares information when people use its group savings, wallet, verification, notification, and support services.",
    sections,
  });

  return (
    <div className="min-h-screen bg-[#fffcf6]">
      <Header />
      <LegalPage
        title={page.title}
        content={page.content}
        updated={page.updatedLabel || "August 3, 2026"}
        intro={page.intro}
        sections={page.sections}
      />
      <Footer />
    </div>
  );
}
