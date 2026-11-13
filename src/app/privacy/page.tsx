import type { Metadata } from "next";
import PrivacyPageContent from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy — OmniEye",
  description:
    "What OmniEye collects on this site (name, work email, role), why, where it is stored, and how to request deletion.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
