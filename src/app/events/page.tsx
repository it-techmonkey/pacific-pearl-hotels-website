
import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = {
  title: "Events",
  description: "Pacific Pearl Hotels events and hospitality gatherings.",
};

export default function EventsPage() {
  return (
    <PlaceholderPage
      eyebrow="Events"
      title="Upcoming Events"
      body="Stay up to date with the latest events and happenings at Pacific Pearl Hotels."
    />
  );
}
