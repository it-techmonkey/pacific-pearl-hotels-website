"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function RouteLoader() {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShow(true);
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShow(false), 300); // fade out
    }, 900); // show loader for at least 900ms
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        inset: 0,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.3s",
        pointerEvents: loading ? "auto" : "none",
        opacity: loading ? 1 : 0,
      }}
      aria-label="Loading"
    >
      <div
        style={{
          animation: "pph-bounce 1.4s cubic-bezier(0.77, 0, 0.175, 1) infinite",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src="/assets/Logo.png"
          alt="Pacific Pearl Hotels"
          width={80}
          height={80}
          style={{ objectFit: "contain" }}
        />
      </div>
      <style jsx global>{`
        @keyframes pph-bounce {
          0%   { transform: translateY(0);    animation-timing-function: cubic-bezier(0.77,0,0.175,1); }
          20%  { transform: translateY(-28px); animation-timing-function: cubic-bezier(0.77,0,0.175,1); }
          50%  { transform: translateY(-40px); animation-timing-function: cubic-bezier(0.77,0,0.175,1); }
          80%  { transform: translateY(-28px); animation-timing-function: cubic-bezier(0.77,0,0.175,1); }
          100% { transform: translateY(0);    animation-timing-function: cubic-bezier(0.77,0,0.175,1); }
        }
      `}</style>
    </div>
  );
}
