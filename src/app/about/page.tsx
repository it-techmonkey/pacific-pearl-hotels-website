import Image from "next/image";
import type { Metadata } from "next";
import { aboutSections } from "@/data/about";
import { ScrollSpyLayout } from "@/components/layout/ScrollSpyLayout";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { buildMailto } from "@/lib/mailto";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Pacific Pearl Hotels, our leadership, and values-driven approach to hospitality management.",
};

const scrollSections = aboutSections.map((section) => ({
  id: section.id,
  label: section.id === "leadership" ? "Leadership" : section.title,
}));

const ACCOLADE_LABEL = "Accolades Earned";

const extractAccolades = (description: string) => {
  const blocks = description
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const number = lines.find((line) => /^\d+(st|nd|rd|th)$/i.test(line)) ?? "";
    const text = lines.filter(
      (line) =>
        line !== number &&
        line.toLowerCase() !== "left laurel" &&
        line.toLowerCase() !== "right laurel" &&
        line.toLowerCase() !== ACCOLADE_LABEL.toLowerCase()
    ).join(" ");
    return { number, text };
  });
};

const extractStrengthBlocks = (description: string) =>
  description
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const [titleLine, ...rest] = block.split("\n");
      return {
        title: (titleLine ?? "").trim(),
        body: rest.join(" ").trim(),
      };
    })
    .filter((item) => item.title && item.body);

export default function AboutPage() {
  return (
    <div className="bg-[#f6f5f2]">
      <section className="relative min-h-[60vh] overflow-hidden bg-ink pb-10 pt-16 text-sand">
        <Image
          src="/assets/hotel-1.jpg"
          alt="Hotel exterior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container relative z-10 flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-display uppercase tracking-[0.2em] md:text-6xl">
            About Us
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-sand/85 md:text-base">
            Based in San Diego, California, Pacific Pearl Hotels is one of the nation’s leading independent hotel companies. With a portfolio of 23 properties totaling over 6,500 rooms, Pacific Pearl Hotels operates globally and employs more than 3,200 hospitality professionals.
          </p>
        </div>
      </section>

      <ScrollSpyLayout sections={scrollSections}>
        {aboutSections.map((section) => (
          <Reveal key={section.id}>
            <div id={section.id} className="scroll-mt-24 py-1 md:py-2">
              <div
                className={
                  section.id === "leadership"
                    ? "grid gap-1 md:grid-cols-[1fr_240px] md:items-start"
                    : "grid gap-1"
                }
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-2 bg-ink" aria-hidden />
                    <h3 className="text-xl font-normal text-ink md:text-2xl">{section.id === "recognition" ? ACCOLADE_LABEL : section.title}</h3>
                  </div>
                  {section.id === "recognition" ? (
                    <div className="mt-4 space-y-5">
                      <div className="grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {extractAccolades(section.description)
                          .filter((item) => item.number && item.text)
                          .map((item) => (
                            <div
                              key={`${item.number}-${item.text.slice(0, 12)}`}
                              className="flex h-full min-h-105 max-w-52 flex-col items-center border border-[#c9b487] bg-[#f8f3ec] px-4 py-6 text-center shadow-[0_10px_30px_rgba(201,180,135,0.18)]"
                            >
                              <div className="flex items-center justify-center gap-3">
                                <Image
                                  src="/assets/Vector_Left.svg"
                                  alt=""
                                  width={34}
                                  height={34}
                                />
                                <p className="text-3xl font-semibold text-[#d08700]">{item.number}</p>
                                <Image
                                  src="/assets/Vector_Right.svg"
                                  alt=""
                                  width={34}
                                  height={34}
                                  style={{ transform: "scaleX(-1)" }}
                                />
                              </div>
                              <p className="mt-auto pt-4 text-lg leading-8 text-ink/70">{item.text}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : section.id === "strengths" ? (
                    <div className="mt-4 space-y-6">
                      {extractStrengthBlocks(section.description).map((block) => (
                        <div
                          key={block.title}
                          className="border border-ink/10 bg-white/70 px-5 py-4"
                        >
                          <h4 className="text-base font-normal text-ink md:text-lg">{block.title}</h4>
                          <p className="mt-2 text-sm leading-7 text-ink/70 md:text-base md:leading-7">
                            {block.body}
                          </p>
                          {block.title === "Technology & Data" && (
                            <div className="mt-4">
                              <Button
                                href={buildMailto("general")}
                                shape="rect"
                                className="bg-ink text-white hover:bg-ink/90"
                              >
                                See Case Studies
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : section.id === "careers" ? (
                    <div className="mt-4 space-y-6">
                      <p className="text-sm leading-7 text-ink/70 md:text-base md:leading-7 whitespace-pre-line">
                        {section.description.replace(/\n\nJoin our Team\s*$/i, "")}
                      </p>
                      <Button
                        href={buildMailto("career")}
                        shape="rect"
                        className="bg-ink text-white hover:bg-ink/90"
                      >
                        Join our Team
                      </Button>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm leading-7 text-ink/70 md:text-base md:leading-7 whitespace-pre-line">
                      {section.description}
                    </p>
                  )}
                </div>
                {section.id === "leadership" && (
                  <div className="w-full">
                    <div className="border border-ink/15 bg-white px-3 py-4">
                      <div className="relative mx-auto aspect-3/4 w-full max-w-50 overflow-hidden bg-[#f2f2ef]">
                        <Image
                          src="/assets/CEO.jpg"
                          alt="Michael Gallegos"
                          fill
                          className="object-contain"
                          sizes="(min-width: 768px) 45vw, 100vw"
                        />
                      </div>
                      <div className="mt-3 text-sm leading-relaxed text-ink/70">
                        <p className="text-sm font-semibold text-ink md:text-base">Michael Gallegos, CHA</p>
                        <p className="text-xs text-ink/60 md:text-sm">
                          CHA is President and CEO, Pacific Pearl Hotels, LLC (PPH).
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </ScrollSpyLayout>

    </div>
  );
}
