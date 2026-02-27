import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PartnerCta } from "@/components/ui/PartnerCta";
import { RouteLoader } from "@/components/ui/RouteLoader";

const generalSans = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "../../public/assets/GeneralSans_Regular-s.p.19285e36.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/GeneralSans_Bold-s.p.1a77bf4f.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

const satoshi = localFont({
  variable: "--font-support",
  src: [
    {
      path: "../../public/assets/Satoshi_Regular-s.p.60f3af6d.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/Satoshi_Bold-s.p.7cb24862.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Pacific Pearl Hotels",
    template: "%s | Pacific Pearl Hotels",
  },
  description:
    "Pacific Pearl Hotels partners with owners to elevate hospitality performance, guest experience, and long-term asset value.",
  metadataBase: new URL("https://www.pacificpearlhotels.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${generalSans.variable} ${satoshi.variable} text-ink antialiased`}>
        <RouteLoader />
        <Header />
        <main>{children}</main>
        <PartnerCta />
        <Footer />
      </body>
    </html>
  );
}
