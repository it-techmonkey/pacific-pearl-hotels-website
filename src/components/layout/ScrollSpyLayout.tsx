"use client";

import { ReactNode } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export type ScrollSection = {
  id: string;
  label: string;
};

type ScrollSpyLayoutProps = {
  title?: string;
  subtitle?: string;
  sections: ScrollSection[];
  children: ReactNode;
};

export function ScrollSpyLayout({ title, subtitle, sections, children }: ScrollSpyLayoutProps) {
  const activeId = useScrollSpy(sections.map((section) => section.id));

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            {(subtitle || title) && (
              <div>
                {subtitle && (
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">{subtitle}</p>
                )}
                {title && (
                  <h2 className="mt-3 text-3xl font-display text-ink">{title}</h2>
                )}
              </div>
            )}
            <div
              className={(subtitle || title)
                ? "mt-8 overflow-hidden border border-ink/10 bg-[#f4f4f2]"
                : "overflow-hidden border border-ink/10 bg-[#f4f4f2]"}
            >
              {sections.map((section, index) => {
                const isActive = activeId === section.id;
                const isLast = index === sections.length - 1;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => {
                      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`block w-full px-4 py-4 text-center text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-[#00162b] text-white"
                        : "bg-transparent text-ink hover:bg-white"
                    } ${isLast ? "border-b-0" : "border-b border-ink/10"}`}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>
          </aside>
          <div className="space-y-16">{children}</div>
        </div>
      </div>
    </section>
  );
}
