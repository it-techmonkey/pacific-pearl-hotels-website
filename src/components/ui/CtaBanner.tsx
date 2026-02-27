import { Button } from "./Button";
import { buildMailto } from "@/lib/mailto";

type CtaBannerProps = {
  title: string;
  body: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export function CtaBanner({
  title,
  body,
  primaryLabel = "Start a Conversation",
  secondaryLabel = "Careers",
}: CtaBannerProps) {
  return (
    <section className="py-10 md:py-12">
      <div className="container">
        <div className="rounded-3xl bg-ink px-8 py-12 text-sand md:px-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand/70">Connect</p>
              <h3 className="mt-3 text-3xl font-display md:text-4xl">{title}</h3>
              <p className="mt-3 max-w-2xl text-base text-sand/80 md:text-lg">{body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={buildMailto("general")} className="bg-sand text-ink hover:bg-sand/90">
                {primaryLabel}
              </Button>
              <Button href={buildMailto("career")} variant="secondary" className="border-sand text-sand hover:bg-sand hover:text-ink">
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
