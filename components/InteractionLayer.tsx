"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function InteractionLayer() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 30 });

  const { scrollYProgress } = useScroll();

  const glowSize = useTransform(scrollYProgress, [0, 1], [520, 700]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.07, 0.11, 0.08]);

  const [sectionColor, setSectionColor] = useState("52,211,153");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const updateColor = () => {
      const sections = [
        { id: "about", color: "52,211,153" },
        { id: "projects", color: "34,211,238" },
        { id: "skills", color: "96,165,250" },
        { id: "experience", color: "167,139,250" },
        { id: "contact", color: "52,211,153" },
      ];

      const current = sections.find((section) => {
        const el = document.getElementById(section.id);
        if (!el) return false;

        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45;
      });

      if (current) setSectionColor(current.color);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", updateColor);
    updateColor();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", updateColor);
    };
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`
    radial-gradient(
      ${glowSize}px circle at ${smoothX}px ${smoothY}px,
      rgba(${sectionColor}, ${glowOpacity}),
      transparent 45%
    )
  `;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
        style={{ background }}
      />

      <motion.div
        className="pointer-events-none fixed inset-0 z-[9997] hidden md:block opacity-40"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              900px circle at ${smoothX}px ${smoothY}px,
              rgba(${sectionColor}, 0.035),
              transparent 65%
            )
          `,
        }}
      />
    </>
  );
}