"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { navLinks } from "@/data/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <motion.header
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-ink/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-3">
        {/* Desktop Nav - left of logo */}
        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-end">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.1 + index * 0.05 }}
            >
              <Link
                href={link.href}
                className="group relative text-sm font-medium uppercase tracking-[0.18em] text-sand transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-sand transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Logo center */}
        <Link href="/" className="flex items-center justify-center text-sand mx-8">
          <div className="relative h-8 w-12 sm:w-20 md:w-28">
            <Image
              src="/assets/Logo.png"
              alt="Pacific Pearl Hotels"
              fill
              className="object-contain"
              sizes="128px"
              priority
            />
          </div>
        </Link>

        {/* Desktop language/phone - right of logo */}
        <div className="hidden lg:flex items-center gap-4 flex-1 justify-start">
          <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-sand/80">
            <span className="sr-only">Select language</span>
            <select
              name="language"
              className="rounded-sm border border-white/60 bg-white/90 px-2 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ink"
              defaultValue=""
            >
              <option value="" disabled>
                Select Language
              </option>
              <option value="es">Spanish</option>
            </select>
          </label>
          <span className="h-5 w-px bg-white/40" aria-hidden="true" />
          <a
            href="tel:+18589645500"
            className="text-sm font-medium uppercase tracking-[0.18em] text-sand transition-colors hover:text-sand/70"
          >
            +1 (858) 964-5500
          </a>
        </div>

        {/* Hamburger right on mobile */}
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-sand transition-colors lg:hidden ml-auto focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="relative w-6 h-6">
            <span
              className={`absolute left-0 top-2.5 h-0.5 ${menuOpen ? 'w-4 rotate-45 top-4 left-1' : 'w-6'} bg-current transition-all duration-200 ease-in-out`}
            />
            <span
              className={`absolute left-0 top-5 h-0.5 ${menuOpen ? 'w-4 left-1 opacity-0' : 'w-6'} bg-current transition-all duration-200 ease-in-out`}
            />
            <span
              className={`absolute left-0 top-7.5 h-0.5 ${menuOpen ? 'w-4 -rotate-45 top-4 left-1' : 'w-6'} bg-current transition-all duration-200 ease-in-out`}
            />
          </div>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={reduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-ink/95 text-sand lg:hidden"
          >
            <div className="container flex flex-col gap-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold uppercase tracking-[0.2em]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand/80">
                <span>Language</span>
                <select
                  name="language"
                  className="rounded-full border border-sand/40 bg-transparent px-2 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sand"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Language
                  </option>
                  <option value="es">Spanish</option>
                </select>
              </label>
              <a
                href="tel:+18589645500"
                className="flex items-center gap-3 text-lg font-normal text-white px-1 py-2"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" fill="url(#phone-gradient)"/>
                  <defs>
                    <linearGradient id="phone-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#ff5f6d"/>
                      <stop offset="1" stop-color="#ffc371"/>
                    </linearGradient>
                  </defs>
                </svg>
                +1 (858) 964-5500
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
