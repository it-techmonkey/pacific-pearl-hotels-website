import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Pacific Pearl Hotels privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#f6f5f2]">
      <section className="relative min-h-[70vh] overflow-hidden bg-ink pb-20 pt-28 text-sand">
        <div className="container relative z-10 flex min-h-[70vh] flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-display uppercase tracking-[0.2em] md:text-6xl">
                 Privacy Policy
          </h1>
        </div>
      </section>
      {/* ...rest of privacy content... */}
    </div>
  );
}
