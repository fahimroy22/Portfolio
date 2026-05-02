"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("#about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((link) => document.querySelector(link.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => section && observer.observe(section));

    return () => {
      sections.forEach((section) => section && observer.unobserve(section));
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
    setActive(href);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 right-0 top-4 z-50 px-4 sm:px-6 md:top-6"
    >
      <div className="mx-auto flex max-w-7xl justify-center md:justify-end">
        <motion.nav
          animate={{
            scale: scrolled ? 0.97 : 1,
            y: scrolled ? -2 : 0,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="w-full max-w-[92vw] overflow-x-auto rounded-full border border-white/10 bg-slate-950/70 px-2 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl md:w-fit md:max-w-none"
        >
          <div className="flex min-w-max items-center justify-center gap-1">
            {links.map((link) => {
              const isActive = active === link.href;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`relative whitespace-nowrap rounded-full px-3 py-2 text-sm transition sm:px-4 ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navGlassPill"
                      className="absolute inset-0 rounded-full border border-emerald-300/25 bg-emerald-300/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_24px_rgba(52,211,153,0.18)]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}