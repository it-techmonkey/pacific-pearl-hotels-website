import Image from "next/image";

type LogoMarqueeProps = {
  logos: ReadonlyArray<{ src: string; alt: string }>;
};

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-white py-12">
      <div className="container">
        <h2 className="text-center text-3xl font-display font-normal text-ink md:text-4xl">Brand Affiliations</h2>
      </div>
      <div className="mt-6">
        <div className="marquee flex items-center gap-12">
          {[...logos, ...logos].map((logo, index) => (
            <div key={`${logo.alt}-${index}`} className="relative h-16 w-40 md:h-20 md:w-48">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="(min-width: 768px) 192px, 160px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
