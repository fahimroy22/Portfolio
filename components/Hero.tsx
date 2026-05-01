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

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 140, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 140, damping: 20 });

  const rotateX = useTransform(smoothY, [-80, 80], [6, -6]);
  const rotateY = useTransform(smoothX, [-80, 80], [-6, 6]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [0.42, 0.08]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const secondGlowY = useTransform(scrollYProgress, [0, 1], [0, 70]);

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
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 text-white"
    >
      <motion.div
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 hidden bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_76%)] md:block"
      />

      <motion.div
        style={{ y: glowY }}
        className="absolute left-[-10%] top-[10%] h-[300px] w-[300px] rounded-full bg-emerald-400/10 blur-2xl md:h-[520px] md:w-[520px] md:blur-3xl"
      />

      <motion.div
        style={{ y: secondGlowY }}
        className="absolute right-[-10%] bottom-[5%] h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-2xl md:h-[560px] md:w-[560px] md:blur-3xl"
      />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-300 backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            CSE Student · Full-Stack Developer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.75, ease: "easeOut" }}
            className="max-w-4xl text-[42px] font-black leading-[1.08] tracking-tight sm:text-[54px] lg:text-[66px]"
          >
            I build clean,
            <br />
            scalable{" "}
            <motion.span
              style={{
                backgroundImage: headlineGradient,
                backgroundSize: "220% 100%",
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
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-[15px] leading-7 text-slate-300 sm:text-base"
          >
            I design and develop responsive websites, dashboards, admin panels,
            and client-ready full-stack applications with strong UI/UX and clean
            code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.65, ease: "easeOut" }}
            className="mt-6 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="premium-button rounded-2xl bg-emerald-400 px-6 py-3.5 font-semibold text-slate-950 hover:bg-emerald-300"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="premium-button rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white hover:bg-white/10"
            >
              Hire Me
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 34 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
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
          className="relative mx-auto w-full max-w-[420px] md:[transform-style:preserve-3d]"
        >
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 1], [1, 0.35]),
              rotateX,
              rotateY,
            }}
            className="absolute -inset-5 hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 blur-2xl md:block"
          />

          <div className="glass relative overflow-hidden rounded-[2rem] p-4 md:[transform:translateZ(20px)]">
            <div className="relative h-[500px] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/profile.jpg"
                alt="Fahim Ahmed"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover"
              />

              <motion.div
                style={{
                  opacity: useTransform(scrollYProgress, [0, 1], [1, 0.65]),
                }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-emerald-300">
                  Full-Stack Developer
                </p>

                <h2 className="text-2xl font-black">
                  Fahim <span className="text-emerald-300">Ahmed</span>
                </h2>

                <p className="mt-1 text-xs text-slate-300">
                  Building clean, scalable web products.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.35], [1, 0]),
          y: useTransform(scrollYProgress, [0, 0.35], [0, 18]),
        }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.35em] text-slate-500 md:block"
      >
        Scroll
      </motion.div>
    </section>
  );
}