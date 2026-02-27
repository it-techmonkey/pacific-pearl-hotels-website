"use client";

import React, { useRef } from "react";
import Image from "next/image";

type ImageGridProps = {
  items: { src: string; title: string; description?: string; icon?: string }[];
  fullBleed?: boolean;
};

const iconMap: Record<string, JSX.Element> = {
  people: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  heart: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  ),
  hand: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 11V7a2 2 0 0 1 4 0v4" />
      <path d="M11 11V6a2 2 0 0 1 4 0v5" />
      <path d="M15 11V7a2 2 0 0 1 4 0v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6v-1" />
    </svg>
  ),
  network: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M8.5 7.5 10.5 10.5" />
      <path d="M15.5 7.5 13.5 10.5" />
      <path d="M10.5 16 8.5 13.5" />
      <path d="M13.5 16 15.5 13.5" />
    </svg>
  ),
  hotel: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21V3h12v18" />
      <path d="M15 9h6v12" />
      <path d="M6 7h3" />
      <path d="M6 11h3" />
      <path d="M6 15h3" />
      <path d="M9 21v-4" />
    </svg>
  ),
  leaf: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 3c-7 0-13 4-13 11 0 4 3 7 7 7 7 0 6-13 6-18z" />
      <path d="M3 21c4-4 9-6 15-6" />
    </svg>
  ),
  spark: (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z" />
    </svg>
  ),
};

export function ImageGrid({ items, fullBleed = false }: ImageGridProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (amount: number) => {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className={`relative overflow-hidden ${fullBleed ? "full-bleed" : ""}`}>
      <div
        ref={trackRef}
        className="flex w-full snap-x snap-mandatory overflow-x-auto pb-6 px-3 md:px-5 scrollbar-hide"
      >
        {items.map((item) => (
          <div
            key={item.src}
            className="group relative h-80 w-50 shrink-0 snap-center overflow-hidden md:h-90 md:w-60 lg:h-105 lg:w-70"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 240px"
            />
            <div className="absolute inset-0 bg-ink/10 transition-opacity duration-500 group-hover:opacity-0" />
            <div className="absolute inset-x-0 bottom-0 bg-ink/70 px-4 py-3 transition-opacity duration-500 group-hover:opacity-0">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sand">
                {item.title}
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#01172c] px-6 text-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#01172c]">
                {item.icon && iconMap[item.icon] ? iconMap[item.icon] : iconMap.people}
              </span>
              <p className="text-lg font-semibold">{item.title}</p>
              {item.description ? (
                <p className="text-sm text-white/80">{item.description}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollByAmount(-320)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:bg-ink hover:text-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByAmount(320)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:bg-ink hover:text-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
