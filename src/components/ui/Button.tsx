import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  shape?: "pill" | "rect";
  className?: string;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-ink text-sand hover:bg-ink/90",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-sand",
  ghost: "text-ink hover:text-ink/70",
};

export function Button({
  href,
  children,
  variant = "primary",
  shape = "pill",
  className,
}: ButtonProps) {
  const shapeClass = shape === "rect" ? "rounded-md" : "rounded-full";
  return (
    <Link href={href} className={`${baseClasses} ${shapeClass} ${variants[variant]} ${className ?? ""}`}>
      {children}
    </Link>
  );
}
