import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  align?: "left" | "center";
};

export function Section({ id, title, subtitle, children, align = "left" }: SectionProps) {
  return (
    <section id={id} className="py-10 md:py-12">
      <div className="container">
        <div className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">Pacific Pearl Hotels</p>
          <h2 className="mt-3 text-3xl font-display text-ink md:text-4xl">{title}</h2>
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-base text-ink/70 md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
