import Image from "next/image";
import type { Metadata } from "next";
import { serviceSections } from "@/data/services";
import { ScrollSpyLayout } from "@/components/layout/ScrollSpyLayout";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore hospitality management services spanning strategy, operations, revenue, and owner support.",
};

const scrollSections = serviceSections.map((section) => ({
  id: section.id,
  label: section.title,
}));

const getImageForCard = (title: string) => {
  switch (title) {
    case "Human Resources": return "/assets/slide1.jpg";
    case "Centralized Accounting": return "/assets/slide2.jpg";
    case "Food & Beverage": return "/assets/slide3.jpg";
    case "Centralized and Collaborative Hotel Revenue Management": return "/assets/slide4.jpg";
    case "Asset Management": return "/assets/Owner Mindset.avif";
    case "Sales & Marketing": return "/assets/slide5.jpg";
    case "Hotel Development & Design Consulting": return "/assets/updatedproject1.jpg";
    case "Operational & Management Consulting": return "/assets/updatedproject2.jpg";
    case "Investment & Asset Consulting": return "/assets/updatedproject3.jpg";
    default: return "/assets/samplehotel.webp";
  }
};

export default function ServicesPage() {
  return (
    <div className="bg-[#f6f5f2]">
      <section className="relative min-h-[70vh] overflow-hidden bg-ink pb-20 pt-28 text-sand">
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
            Services
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-sand/85 md:text-base">
            At Pacific Pearl Hotels, we combine deep industry expertise with a hands-on ownership approach to unlock value, revive operations, and build lasting success for every property we manage.
          </p>
        </div>
      </section>

      <ScrollSpyLayout sections={scrollSections}>
        {serviceSections.map((section) => (
          <Reveal key={section.id}>
            <div id={section.id} className="scroll-mt-24 py-1 md:py-2">
              <div className="grid gap-1">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-2 bg-ink" aria-hidden />
                    <h3 className="text-xl font-normal text-ink md:text-2xl">{section.title}</h3>
                  </div>
                  {section.description && (
                    <p className="mt-4 text-sm leading-7 text-ink/70 md:text-base md:leading-7 whitespace-pre-line">
                      {section.description}
                    </p>
                  )}
                  {'cards' in section && (section as any).cards && (section as any).cards.length > 0 && (
                    <div className="mt-10 space-y-12 lg:space-y-16">
                      {(section as any).cards.map((card: any) => {
                        const hasParagraph = card.body.includes('\n\n');
                        let paragraph = "";
                        let listItems: string[] = [];

                        if (hasParagraph) {
                          const parts = card.body.split('\n\n');
                          paragraph = parts[0];
                          listItems = parts[1].split('\n').filter(Boolean);
                        } else {
                          if (card.body.includes('\n')) {
                            listItems = card.body.split('\n').filter(Boolean);
                          } else {
                            paragraph = card.body;
                          }
                        }

                        if (card.type === 'custom-box') {
                          return (
                            <div key={card.title} className="bg-white rounded-md p-6 lg:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_0px_4px_rgba(0,0,0,0.02)] border border-ink/5">
                              <h4 className="text-[22px] lg:text-[24px] font-normal text-[#334155] tracking-tight mb-6">{card.title}</h4>
                              <div className="border border-[#00224b] bg-[#f7fbff] p-6 text-[#00224b] text-[17px] leading-[1.7] whitespace-pre-line">
                                {card.body}
                              </div>
                            </div>
                          );
                        }
                        // ...existing code for standard cards...
                        return (
                          <div key={card.title} className="bg-white rounded-md p-6 lg:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_0px_4px_rgba(0,0,0,0.02)] flex flex-col gap-6 lg:gap-8 border border-ink/5">
                            {/* Main Content Area */}
                            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                              {/* Image Column */}
                              <div className="relative w-full lg:w-[42%] aspect-3/2 shrink-0">
                                <Image
                                  src={card.image || getImageForCard(card.title)}
                                  alt={card.title}
                                  fill
                                  className="object-cover rounded-xs shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                                />
                              </div>
                              {/* Text Column */}
                              <div className="flex flex-col w-full lg:w-[58%] pt-1 lg:pt-2">
                                <h4 className="text-[22px] lg:text-[24px] font-normal text-[#334155] tracking-tight">{card.title}</h4>
                                {paragraph && (
                                  <p className="mt-4 text-[15px] lg:text-[16px] leading-[1.7] text-[#475569]">
                                    {paragraph}
                                  </p>
                                )}
                                {/* Bullets for Consulting Cards */}
                                {section.id === 'consulting' && listItems.length > 0 && (
                                  <ul className="mt-5 space-y-3">
                                    {listItems.map((item, i) => (
                                      <li key={i} className="flex items-start gap-3 text-[15px] lg:text-[16px] leading-[1.6] text-[#475569]">
                                        <span className="mt-2.5 h-1.25 w-1.25 shrink-0 rounded-full bg-[#475569]" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>

                            {/* Tags Area for Non-Consulting */}
                            {section.id !== 'consulting' && listItems.length > 0 && (
                              <div className="flex flex-wrap gap-4 mt-2">
                                {listItems.map((item, i) => (
                                  <div
                                    key={i}
                                    className="flex-auto border border-[#00224b] bg-[#f7fbff] px-5 py-2 text-[15px] leading-snug text-[#00224b] font-normal text-left max-w-full min-h-8"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {section.bullets.length > 0 && (
                    <ul className="mt-6 space-y-2 text-sm text-ink/70 md:text-base">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 bg-ink" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ScrollSpyLayout>

    </div>
  );
}
