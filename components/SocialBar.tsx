"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
  FaLinkedinIn,
} from "react-icons/fa";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/fahimroy22",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fahim-roy-6082a634b",
    icon: FaLinkedinIn,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/fahim__roy",
    icon: FaInstagram,
  },
  {
    label: "Telegram",
    href: "https://t.me/Mihafyor",
    icon: FaTelegramPlane,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801863544623",
    icon: FaWhatsapp,
  },
];

export default function SocialBar() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 transition-all duration-300 ease-out md:block ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-400/20 via-cyan-400/10 to-blue-500/20 opacity-60 blur-xl" />

      <div
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        className="relative flex items-end gap-3 rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md"
      >
        {socials.map((social) => (
          <DockIcon key={social.label} social={social} mouseX={mouseX} />
        ))}
      </div>
    </div>
  );
}

function DockIcon({
  social,
  mouseX,
}: {
  social: {
    label: string;
    href: string;
    icon: React.ElementType;
  };
  mouseX: number | null;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const Icon = social.icon;

  let scale = 1;
  let pull = 0;

  if (mouseX !== null && ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const distanceRaw = mouseX - center;
    const distance = Math.abs(distanceRaw);
    const maxDistance = 60;

    scale = Math.max(1, 1.28 - distance / maxDistance);

    if (distance < maxDistance) {
      pull = distanceRaw * 0.06;
    }
  }

  return (
    <a
      ref={ref}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      style={{
        transform: `
          translateX(${pull}px)
          translateY(${scale > 1 ? "-6px" : "0px"})
          scale(${scale})
        `,
      }}
      className="group relative flex h-12 w-12 origin-bottom items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl text-slate-300 transition-[transform,background-color,color,box-shadow] duration-100 ease-out will-change-transform hover:bg-emerald-400 hover:text-black hover:shadow-[0_14px_40px_rgba(52,211,153,0.35)]"
    >
      <Icon />

      <span className="pointer-events-none absolute -top-11 rounded-xl border border-white/10 bg-slate-950/90 px-3 py-1.5 text-xs text-white opacity-0 shadow-xl backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100">
        {social.label}
      </span>
    </a>
  );
}