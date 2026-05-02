"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { smoothReveal, smoothItem } from "./motionPresets";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(smoothY, [-80, 80], [5, -5]);
  const rotateY = useTransform(smoothX, [-80, 80], [-5, 5]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  const gradientShift = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const headlineGradient = useMotionTemplate`
    linear-gradient(
      90deg,
      #6ee7b7 ${gradientShift},
      #67e8f9,
      #93c5fd
    )
  `;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 text-white md:px-6 md:pb-20 md:pt-32"
    >
      <div className="absolute left-[-10%] top-[10%] h-[260px] w-[260px] rounded-full bg-emerald-400/10 blur-2xl md:h-[520px] md:w-[520px] md:blur-3xl" />
      <div className="absolute right-[-10%] bottom-[5%] h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-2xl md:h-[560px] md:w-[560px] md:blur-3xl" />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative mx-auto grid max-w-7xl items-center gap-10 md:gap-14 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <motion.div style={{ y: textY }}>
          <motion.div
            initial="hidden"
            animate="show"
            variants={smoothReveal}
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs text-emerald-300 sm:text-sm"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Full-Stack Developer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={smoothItem(0.08)}
            className="max-w-4xl text-[40px] font-black leading-[1.08] tracking-tight sm:text-[54px] lg:text-[66px]"
          >
            I build clean,
            <br />
            scalable{" "}
            <motion.span
              style={{
                backgroundImage: headlineGradient,
                backgroundSize: "200% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              web products
            </motion.span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={smoothItem(0.16)}
            className="mt-5 max-w-xl text-[15px] leading-7 text-slate-300 sm:text-base md:mt-6"
          >
            I design and develop responsive websites, dashboards, and full-stack
            applications with clean UI and strong performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={smoothItem(0.24)}
            className="mt-7 flex flex-wrap gap-3 md:mt-6 md:gap-4"
          >
            <a
              href="#projects"
              className="premium-button rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="premium-button rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white"
            >
              Hire Me
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={smoothItem(0.12)}
          onMouseMove={(e) => {
            if (window.innerWidth < 768) return;
            const rect = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - rect.left - rect.width / 2);
            y.set(e.clientY - rect.top - rect.height / 2);
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
          style={{
            y: imageY,
            scale: imageScale,
          }}
          className="relative mx-auto mt-8 w-full max-w-[340px] md:mt-0 md:max-w-[420px]"
        >
          <motion.div style={{ rotateX, rotateY }} className="hidden md:block">
            <div className="glass relative overflow-hidden rounded-[2rem] p-4">
              <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] md:h-[500px]">
                <Image
                  src="/profile.jpg"
                  alt="Fahim Ahmed"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-emerald-300">
                    Full-Stack Developer
                  </p>

                  <h2 className="text-xl font-black">
                    Fahim <span className="text-emerald-300">Ahmed</span>
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="glass relative overflow-hidden rounded-[2rem] p-4 md:hidden">
            <div className="relative h-[380px] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/profile.jpg"
                alt="Fahim Ahmed"
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}