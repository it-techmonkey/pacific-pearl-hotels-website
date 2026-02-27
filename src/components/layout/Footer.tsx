import Link from "next/link";
import Image from "next/image";
import { footerLinks, legalLinks, socialLinks } from "@/data/footer";

export function Footer() {

  return (
    <footer className="border-t border-white/10 bg-[#000926] text-white">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_1fr] md:items-start">
          <div className="space-y-4">
            <div className="relative h-14 w-14">
              <Image
                src="/assets/Logo_2.png"
                alt="Pacific Pearl Hotels"
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-white">Quick Links</p>
            <ul className="mt-4 space-y-3 text-base text-white/85">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white/70">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-white">Social Media</p>
            <ul className="mt-4 space-y-3 text-base text-white/85">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white/70">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-base text-white/85">
          <div className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white/70">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-white/60">
          Pacific Pearl Hotels © 2026. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
