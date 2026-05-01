"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

const links = [
  { name: "GitHub", href: "https://github.com/fahimroy22", icon: FaGithub },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/fahim-roy-6082a634b", icon: FaLinkedinIn },
  { name: "Telegram", href: "https://t.me/@Mihafyor", icon: FaTelegramPlane },
  { name: "WhatsApp", href: "https://wa.me/8801863544623", icon: FaWhatsapp },
];

export default function Footer() {
  return (
    <footer className="relative px-6 pb-28 pt-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass mx-auto max-w-7xl overflow-hidden rounded-[2rem] p-8 md:p-10"
      >
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-300">
              Available for work
            </p>

            <h2 className="text-3xl font-black md:text-5xl">
              Let’s build something clean.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              Open to freelance projects, dashboards, portfolios, and full-stack
              web applications.
            </p>

            <a
              href="mailto:fahim.ahmed.roy@gmail.com"
              className="mt-6 inline-block text-emerald-300 hover:text-emerald-200"
            >
              fahim.ahmed.roy@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <div className="flex gap-3">
              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="premium-button flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl text-slate-300 hover:bg-emerald-400 hover:text-black"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>

            <a
              href="#"
              className="premium-button rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10"
            >
              Back to top ↑
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Fahim Ahmed.
        </div>
      </motion.div>
    </footer>
  );
}