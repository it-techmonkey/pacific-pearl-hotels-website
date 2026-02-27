import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Pacific Pearl Hotels terms and conditions.",
};

export default function TermsPage() {
  return (
    <PlaceholderPage
      eyebrow="Terms & Conditions"
      title="Terms of Service"
      body="Read the terms and conditions for using Pacific Pearl Hotels' website and services."
    />
  );
}
