"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("#about");
  const [scrolled, setScrolled] = useState(false);

  // 🔹 Scroll shrink effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔹 Active section detection (improved)
  useEffect(() => {
    const sections = links.map((link) =>
      document.querySelector(link.href)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => section && observer.observe(section));

    return () => {
      sections.forEach((section) => section && observer.unobserve(section));
    };
  }, []);

  // 🔹 Smooth scroll handler
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.pushState(null, "", href);
    setActive(href);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-6 z-50 px-4 sm:px-6"
    >
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden lg:block" />

        <motion.nav
          animate={{
            scale: scrolled ? 0.94 : 1,
            y: scrolled ? -6 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 28,
          }}
          className="glass justify-self-center rounded-[1.4rem] border border-white/10 bg-white/[0.035] px-2 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl lg:translate-x-6 lg:w-fit"
        >
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {links.map((link) => {
              const isActive = active === link.href;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`relative whitespace-nowrap overflow-hidden rounded-xl px-3 py-2 text-xs transition duration-300 sm:px-4 sm:py-2.5 sm:text-sm ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {/* Active glass pill */}
                  {isActive && (
                    <motion.span
                      layoutId="navGlassPill"
                      className="absolute inset-0 rounded-xl border border-emerald-300/25 bg-emerald-300/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_24px_rgba(52,211,153,0.18)]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  <span className="relative z-10">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}