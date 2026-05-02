"use client";

import { motion } from "framer-motion";
import { smoothReveal, smoothItem } from "./motionPresets";

const skills = [
  "Responsive UI",
  "Clean Code",
  "Scalable Systems",
  "Smooth UX",
  "Performance",
  "Communication",
];

const highlights = [
  {
    title: "Design",
    value: "UI/UX",
    text: "Clean interfaces that feel modern and easy to use.",
  },
  {
    title: "Code",
    value: "Full-Stack",
    text: "Frontend, backend, dashboards, and real app logic.",
  },
  {
    title: "Delivery",
    value: "Client-Ready",
    text: "Polished, responsive, and built for real use.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-32 text-white">
      <div className="pointer-events-none absolute left-[-12%] top-10 h-[300px] w-[300px] rounded-full bg-emerald-400/10 blur-2xl md:h-[520px] md:w-[520px] md:blur-3xl" />
      <div className="pointer-events-none absolute right-[-12%] bottom-0 h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-2xl md:h-[540px] md:w-[540px] md:blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={smoothReveal}
        >
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-300 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
            About Me
          </div>

          <h2 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight md:text-6xl">
            Clean design.
            <br />
            Scalable code.
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Real product thinking.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
            I build responsive websites, dashboards, and full-stack apps with a
            focus on clarity, performance, and smooth user experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                whileInView={smoothItem(index * 0.04)}
                viewport={{ once: true }}
                whileHover={{ y: -3, scale: 1.04 }}
                className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-slate-300 backdrop-blur-xl transition hover:border-emerald-300/30 hover:text-white"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={smoothReveal}
          className="glass relative overflow-hidden rounded-[2.35rem] p-7 md:p-9"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.12),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(34,211,238,0.1),transparent_35%)]" />

          <div className="relative">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">
              What I bring
            </p>

            <h3 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              Design + Code + Clarity
            </h3>

            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              A complete workflow for turning ideas into clean, usable digital
              products.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 22, scale: 0.98 }}
                  whileInView={smoothItem(index * 0.07)}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition hover:border-emerald-300/30"
                >
                  <p className="text-sm text-slate-400">{item.title}</p>
                  <h4 className="mt-2 text-xl font-black text-white">
                    {item.value}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[1fr_0.85fr]">
              <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">
                  Current focus
                </p>
                <p className="mt-3 leading-7 text-slate-300">
                  Full-stack products, admin dashboards, and scalable UI
                  systems.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                  Strength
                </p>
                <p className="mt-3 text-2xl font-black text-white">
                  Product-first development.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}