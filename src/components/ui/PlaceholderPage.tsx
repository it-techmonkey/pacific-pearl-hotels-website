
import Image from "next/image";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function PlaceholderPage({ eyebrow, title, body }: PlaceholderPageProps) {
  return (
    <div className="bg-[#f6f5f2]">
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
        <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-display uppercase tracking-[0.2em] md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-sand/85 md:text-base">{body}</p>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-2xl border border-ink/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">Coming soon</p>
                <h2 className="mt-3 text-2xl font-display text-ink">New updates in progress</h2>
                <p className="mt-3 text-sm text-ink/70">
                  We are preparing tailored content for this section. In the meantime, our team is available for questions and partnerships.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
