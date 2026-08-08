import type { Metadata } from "next";
import { Footer, Header, LegalPage } from "@/app/components/site-shell";
import { getPublicPage } from "@/app/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Ematony Ajo Family savings and rotating contribution services.",
};

const sections = [
  {
    title: "Using Ematony",
    body: [
      "Ematony provides digital tools for trusted savings circles, group contributions, wallet activity, rotating payouts, member verification, notifications, and support workflows.",
      "You must provide accurate information, keep your account secure, and use the service only for lawful savings, contribution, and community investment activities.",
    ],
  },
  {
    title: "Account responsibility",
    body: [
      "You are responsible for activity that occurs under your account. Do not share your password, OTP, or other authentication details with another person.",
      "Ematony may restrict, suspend, or close accounts that appear fraudulent, abusive, blocked by administrators, or inconsistent with these terms.",
    ],
  },
  {
    title: "Groups and contributions",
    body: [
      "Each savings group may define its own member rules, contribution schedule, rotation order, payout expectations, and participation requirements. Members should review group details before joining or contributing.",
      "Group visibility is provided to help members understand payment status and upcoming rotations. Members remain responsible for understanding their obligations to their group.",
    ],
  },
  {
    title: "Payments and wallets",
    body: [
      "Wallet funding, withdrawals, payment processing, and payment status updates may depend on third-party payment providers, banking partners, network availability, and compliance checks.",
      "Fees, limits, processing times, reversals, failed payments, and verification requirements may apply depending on the payment method and provider.",
    ],
  },
  {
    title: "Verification and compliance",
    body: [
      "Ematony may require identity verification, KYC review, or other checks before certain account, wallet, group, or payout features are available.",
      "You agree not to provide false identity information, use another person's account, avoid verification checks, or use Ematony for prohibited activity.",
    ],
  },
  {
    title: "Support and disputes",
    body: [
      "Members can use support channels to report payment issues, group concerns, account access problems, or other service questions.",
      "Ematony may review records, group activity, payment information, and admin actions to help resolve issues, but group agreements between members may remain the responsibility of the group.",
    ],
  },
  {
    title: "Changes to the service",
    body: [
      "We may update features, policies, fees, integrations, or these terms as the product develops or as legal and operational needs change.",
      "If you continue using Ematony after updates become effective, you accept the updated terms.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For questions about these Terms of Service, contact the Ematony support team through the app or the official support channel provided by Ematony.",
    ],
  },
];

export default async function TermsOfServicePage() {
  const page = await getPublicPage("terms-of-service", {
    slug: "terms-of-service",
    title: "Terms of Service",
    updatedLabel: "August 3, 2026",
    intro: "These Terms of Service describe the rules for using Ematony Ajo Family tools for group savings, rotating contributions, wallet activity, verification, notifications, and support.",
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
