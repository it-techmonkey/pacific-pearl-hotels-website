import Link from "next/link";
import type { Metadata } from "next";
import { heroContent, imageGridItems, featuredProjects } from "@/data/home";
import { partnerLogos } from "@/data/logos";
import { buildMailto } from "@/lib/mailto";
import { Button } from "@/components/ui/Button";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { ImageGrid } from "@/components/ui/ImageGrid";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Pacific Pearl Hotels provides hospitality management and asset stewardship for ambitious owners.",
};

export default function Home() {
  return (
    <div>
      <section className="relative min-h-screen overflow-hidden bg-ink text-sand">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/slide1.jpg"
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container relative z-10 flex min-h-[85vh] flex-col items-center justify-center pb-16 pt-28 text-center">
          <h1 className="mt-4 max-w-4xl text-4xl font-display md:text-6xl">
            {heroContent.title.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-3xl text-base text-sand/85 md:text-lg">
            {heroContent.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              href={buildMailto("career")}
              shape="rect"
              className="bg-white !text-[#000E22] font-light normal-case tracking-normal ring-1 ring-black/10 hover:bg-transparent hover:!text-white hover:ring-white"
            >
              {heroContent.primaryCta}
            </Button>
            <Button
              href={buildMailto("partner")}
              shape="rect"
              className="bg-[#000E22] text-sand font-light normal-case tracking-normal ring-1 ring-black/20 hover:bg-white hover:text-[#000E22]"
            >
              {heroContent.secondaryCta}
            </Button>
          </div>
        </div>
      </section>

      <LogoMarquee logos={partnerLogos} />

      <section className="bg-[#000103] py-10 text-white md:py-12">
        <div className="container text-center">
          <h2 className="mt-4 text-3xl font-display md:text-5xl">
            Our Impressive Portfolio of Hospitality Assets
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-sm text-white/80 md:text-base">
            For over 35 years, Pacific Pearl Hotels has combined top-tier hospitality expertise
            with an innovative mindset, continually evolving to meet the needs of today’s guests
            and owners. Based in San Diego, California, Pacific Pearl Hotels (PPH) is one of the
            nation’s largest independent hotel companies. Pacific Pearl Hotels owns and operates
            23 lodging properties, encompassing over 6,500 rooms and employing more than 3,200
            team members. We are proud to deliver exceptional experiences across diverse markets
            through our portfolio of full-service, select-service, extended-stay, boutique, and
            luxury resorts.
          </p>
          <Link
            href="/hotels"
            className="mt-8 inline-flex items-center justify-center border border-[#bda078] px-6 py-3 text-sm font-medium text-[#bda078] transition-colors hover:bg-[#bda078] hover:text-white"
          >
            Learn More
          </Link>
        </div>
      </section>

      <section className="bg-white py-10 md:py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-display text-ink md:text-5xl">
            Why We Stand Out in Hospitality
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-sm text-ink/70 md:text-base">
            At Pacific Pearl Hotels, our mission is to reimagine hotel management by blending
            timeless hospitality with forward-thinking innovation. We create spaces that honor
            local culture, elevate guest wellbeing, and deliver lasting value for owners and
            partners. Guided by sustainability, empowered by technology and data, and inspired by
            our deep hospitality roots, we aim to be more than operators. We are storytellers of
            place, architects of experience, and stewards of long-term growth.
          </p>
          <Link
            href={buildMailto("career")}
            className="mt-8 inline-flex items-center justify-center border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Join Us
          </Link>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container">
          <Reveal>
            <ImageGrid items={imageGridItems} fullBleed />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-10 md:py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-display text-ink md:text-5xl">
            Our Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-ink/70 md:text-base">
            Our commitment to proven performance ensures consistent success across our properties and diverse asset classes. We
            leverage data-driven strategies to maximize returns and enhance guest satisfaction.
          </p>
          <Link
            href="/hotels"
            className="mt-8 inline-flex items-center justify-center border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
          >
            View our Flagship Resorts
          </Link>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container">
          <Reveal>
            <FeatureGrid items={featuredProjects} />
          </Reveal>
        </div>
      </section>


    </div>
  );
}
