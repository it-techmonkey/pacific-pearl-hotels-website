import Link from "next/link";
import { buildMailto } from "@/lib/mailto";

export function PartnerCta() {
  return (
    <section className="py-10 md:py-12">
      <div className="container">
        <div className="mx-auto max-w-5xl rounded-none bg-[#00162b] px-6 py-12 text-center text-white shadow-lg md:px-12">
          <h2 className="text-3xl font-display md:text-4xl">
            Partner with Us in Hospitality Success
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-white/80 md:text-lg">
            Partner with us to unlock exceptional investment opportunities and achieve remarkable returns. Our experienced
            team is ready to elevate your hospitality assets to new heights.
          </p>
          <Link
            href={buildMailto("general")}
            className="mt-6 inline-flex items-center justify-center border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#00162b]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
