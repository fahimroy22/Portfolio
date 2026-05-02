import type { Variants } from "framer-motion";

export const smoothReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
      mass: 0.7,
    },
  },
};

export const smoothItem = (delay = 0) => ({
  opacity: 1,
  y: 0,
  scale: 1,
  transition: {
    type: "spring",
    stiffness: 90,
    damping: 18,
    mass: 0.7,
    delay,
  },
});