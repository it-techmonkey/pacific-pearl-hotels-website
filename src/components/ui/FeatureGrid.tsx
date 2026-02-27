import Image from "next/image";

type FeatureGridProps = {
  items: { title: string; location: string; src: string }[];
};

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="group overflow-hidden bg-white">
          <div className="relative h-64">
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="pt-4">
            <h3 className="text-3xl font-normal leading-tight text-ink md:text-[1.9rem]">
              {item.title}
            </h3>
            <p className="mt-2 text-base font-normal text-ink/70">{item.location}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
