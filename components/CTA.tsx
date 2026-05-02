"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="relative px-6 py-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="glass mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] p-8 md:p-12"
      >
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-300">
              Start a project
            </p>

            <h2 className="text-3xl font-black md:text-5xl">
              Need a portfolio, dashboard, or full-stack app?
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Send me your idea and I’ll help turn it into a clean, responsive,
              client-ready web product.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <a
              href="#contact"
              className="premium-button rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950 hover:bg-emerald-300"
            >
              Contact Me
            </a>

            <a
              href="https://wa.me/8801863544623"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold text-white hover:bg-white/10"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}