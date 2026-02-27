"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          : {}
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
