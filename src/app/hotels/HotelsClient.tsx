"use client";

import { useMemo, useState } from "react";
import { hotels } from "../../../public/hotels";
import { HotelCard } from "@/components/ui/HotelCard";
import { Reveal } from "@/components/ui/Reveal";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Current", value: "current" },
  { label: "Exited", value: "exited" },
] as const;

type FilterValue = (typeof FILTERS)[number]["value"];

export function HotelsClient() {
  const [statusFilter, setStatusFilter] = useState<FilterValue>("all");

  const filteredHotels = useMemo(() => {
    if (statusFilter === "all") {
      return hotels;
    }
    return hotels.filter((hotel) => hotel.status === statusFilter);
  }, [statusFilter]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setStatusFilter(option.value)}
            className={`px-5 py-2 text-sm font-medium transition-colors ${
              statusFilter === option.value
                ? "bg-[#00162b] text-white"
                : "border border-ink/10 bg-white text-ink/70 hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHotels.map((hotel) => (
          <Reveal key={hotel.id}>
            <HotelCard
              id={hotel.id}
              name={hotel.name}
              location={hotel.location}
              stars={hotel.stars}
              phone={hotel.phone}
              rooms={hotel.rooms}
              status={hotel.status}
              image={hotel.image}
              website={"website" in hotel ? hotel.website : undefined}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
