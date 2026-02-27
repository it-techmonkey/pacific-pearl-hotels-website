import Image from "next/image";
import type { Metadata } from "next";
import { HotelCard } from "@/components/ui/HotelCard";
import { Reveal } from "@/components/ui/Reveal";
import { HotelsClient } from "@/app/hotels/HotelsClient";

export const metadata: Metadata = {
  title: "Hotels",
  description: "Explore the Pacific Pearl Hotels portfolio of current and exited properties.",
};

export default function HotelsPage() {
  return (
    <div className="bg-sand">
      <section className="relative min-h-screen overflow-hidden bg-ink pb-20 pt-28 text-sand">
        <Image
          src="/assets/hotel-1.jpg"
          alt="Hotel exterior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container relative z-10 flex min-h-[70vh] flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-display uppercase tracking-[0.2em] md:text-6xl">
            Hotels
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-sand/85 md:text-base">
            Explore the diverse range of properties under our expert management—each one offering exceptional service, unique charm, and unforgettable guest experiences.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <HotelsClient />
        </div>
      </section>

    </div>
  );
}
