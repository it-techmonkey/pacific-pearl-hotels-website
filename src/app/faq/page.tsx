import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Pacific Pearl Hotels services.",
};

export default function FAQPage() {
  return (
    <PlaceholderPage
      eyebrow="FAQ"
      title="Frequently Asked Questions"
      body="Find answers to common questions about Pacific Pearl Hotels, our services, and your stay."
    />
  );
}
