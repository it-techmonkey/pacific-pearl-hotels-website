import Image from "next/image";
import { Button } from "./Button";

type HotelCardProps = {
  id: number;
  name: string;
  location: string;
  stars: string;
  phone: string;
  rooms: number;
  status: string;
  image: string;
  website?: string;
};

export function HotelCard({ name, location, stars, phone, rooms, status, image, website }: HotelCardProps) {
  const statusLabel = status === "current" ? "Current" : "Exited";
  const roomsLabel = rooms > 0 ? `${rooms} Rooms` : "Rooms N/A";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-ink/10 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
      <div className="relative h-48">
        <Image
          src={image}
          alt={`${name} exterior`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-normal text-ink md:text-xl">{name}</h3>
        </div>
        <div className="grid gap-2 text-sm text-ink/70 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <span className="text-ink/50" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 0 0-6 6c0 4.1 6 10 6 10s6-5.9 6-10a6 6 0 0 0-6-6Zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
              </svg>
            </span>
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-ink/50" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path d="m10 1.7 2.3 4.6 5 .7-3.6 3.5.9 5-4.6-2.4-4.6 2.4.9-5L2.7 7l5-.7L10 1.7Z" />
              </svg>
            </span>
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-ink/50" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.6 3.2c.5-.5 1.3-.6 1.9-.1l2 1.7c.6.5.8 1.4.5 2.1l-.7 1.5a9.2 9.2 0 0 0 4.3 4.3l1.5-.7c.7-.3 1.6-.1 2.1.5l1.7 2c.5.6.4 1.4-.1 1.9l-1.2 1.2c-.7.7-1.7 1-2.7.8-3.2-.6-6.4-2.7-9-5.3-2.6-2.6-4.7-5.8-5.3-9-.2-1 .1-2 .8-2.7l1.2-1.2Z" />
              </svg>
            </span>
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-ink/50" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7h1v2H2v-2h1V6Zm2 0v7h10V6H5Zm2 4h2v2H7v-2Zm4 0h2v2h-2v-2Z" />
              </svg>
            </span>
            <span>{roomsLabel}</span>
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-3 pt-2 md:flex-row md:items-center md:justify-between">
          <span
            className={`inline-flex w-full items-center justify-center rounded-md border px-4 py-2 text-xs font-semibold md:w-fit ${
              status === "current"
                ? "border-[#6bbf59] bg-[#e8f6e7] text-[#2f8f2f]"
                : "border-[#d96a6a] bg-[#fdecec] text-[#c02626]"
            }`}
          >
            {statusLabel}
          </span>
          {status === "current" && website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-md bg-[#00162b] py-2 text-sm text-white shadow-[0_6px_12px_rgba(0,22,43,0.2)] hover:bg-[#00162b]/90 md:w-auto md:min-w-60 md:px-14 inline-flex items-center justify-center"
            >
              Visit Site
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
