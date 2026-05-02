"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Full-Stack Web Apps",
    desc: "Modern web apps with clean UI, backend logic, database structure, and responsive layouts.",
    items: ["Next.js / React", "API routes", "MongoDB", "Auth-ready"],
  },
  {
    title: "Dashboards & Admin Panels",
    desc: "Professional dashboards for managing projects, content, users, messages, and workflows.",
    items: ["Analytics UI", "CRUD flows", "Admin systems", "Clean UX"],
  },
  {
    title: "Portfolio Websites",
    desc: "Premium personal or business portfolios designed to impress clients and recruiters.",
    items: ["Landing pages", "Case studies", "Animations", "SEO-ready"],
  },
  {
    title: "UI/UX + Frontend Polish",
    desc: "Improve existing websites with better design, smoother interactions, and mobile responsiveness.",
    items: ["Responsive design", "Framer Motion", "Performance", "Mobile polish"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden px-6 py-28 text-white">
      <div className="pointer-events-none absolute left-[-10%] top-20 h-[280px] w-[280px] rounded-full bg-emerald-400/10 blur-2xl md:h-[520px] md:w-[520px] md:blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-14 max-w-3xl"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-300">
            Services
          </p>

          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            What I can build for you.
          </h2>

          <p className="mt-5 leading-7 text-slate-300">
            Clear, client-ready development services focused on real business
            value, clean design, and scalable code.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.06,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="glass premium-card rounded-[2rem] p-6 md:p-8"
            >
              <p className="text-sm text-emerald-300">0{index + 1}</p>

              <h3 className="mt-4 text-2xl font-black md:text-3xl">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                {service.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}