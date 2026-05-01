"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    year: "Now",
    title: "Building Full-Stack Products",
    tag: "Current Focus",
    description:
      "Focused on building scalable web apps, clean dashboards, modern portfolios, and client-ready full-stack applications.",
    skills: ["Next.js", "React", "MongoDB", "UI/UX"],
  },
  {
    year: "2026",
    title: "PeerLearn Project",
    tag: "Featured Project",
    description:
      "Designed and developed PeerLearn, a peer-to-peer learning platform concept focused on collaboration, resource sharing, and student learning.",
    skills: ["Full-Stack", "Product Thinking", "Collaboration"],
  },
  {
    year: "2025",
    title: "CSE Student Journey",
    tag: "Academic Growth",
    description:
      "Strengthened programming fundamentals, data structures, algorithms, object-oriented programming, and problem-solving through CSE coursework.",
    skills: ["C++", "Java", "Python", "Problem Solving"],
  },
  {
    year: "2024",
    title: "Frontend & UI Development",
    tag: "Design + Code",
    description:
      "Started building polished web interfaces with responsive layouts, smooth animations, and strong attention to visual design.",
    skills: ["HTML", "CSS", "JavaScript", "Tailwind"],
  },
  {
    year: "Core Strength",
    title: "Communication & Leadership",
    tag: "Professional Skills",
    description:
      "Comfortable communicating ideas clearly, working with teams, leading small projects, and presenting solutions in English.",
    skills: ["Communication", "Fluent English", "Leadership"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 35%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const glowY = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden px-6 py-28 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-4xl sm:mb-20"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-300">
            Timeline
          </p>

          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
            My growth as a developer.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            A short timeline of my learning journey, product-building focus, and
            the strengths I bring into every project.
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop rail */}
          <div className="absolute left-[7px] top-0 hidden h-full w-px bg-white/10 md:block">
            <motion.div
              style={{ scaleY: progress }}
              className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-emerald-300 via-cyan-300 to-violet-300"
            />
            <motion.div
              style={{ top: glowY }}
              className="absolute left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_35px_rgba(52,211,153,0.9)]"
            />
          </div>

          <div className="space-y-8 md:space-y-10">
            {timeline.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: {
    year: string;
    title: string;
    tag: string;
    description: string;
    skills: string[];
  };
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 42, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{
        delay: index * 0.06,
        duration: 0.7,
        ease: "easeOut",
      }}
      className="group relative md:grid md:grid-cols-[120px_1fr] md:gap-10"
    >
      {/* Year column */}
      <div className="relative mb-4 flex items-center gap-3 md:mb-0 md:block">
        {/* Mobile dot */}
        <div className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_24px_rgba(52,211,153,0.85)] md:hidden" />

        {/* Desktop dot */}
        <motion.div
          whileInView={{ scale: [0.7, 1.25, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          className="absolute left-[2px] top-9 hidden h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_24px_rgba(52,211,153,0.85)] md:block"
        />

        <p className="text-sm font-bold text-emerald-300 md:sticky md:top-28 md:ml-8 md:pt-7">
          {item.year}
        </p>
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="premium-card glass relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8 md:rounded-[2rem]"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-300">
            {item.tag}
          </span>

          <h3 className="mt-5 text-2xl font-black tracking-tight sm:text-3xl">
            {item.title}
          </h3>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            {item.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ y: -2 }}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 sm:text-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}