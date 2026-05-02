import { Variants, TargetAndTransition, Transition } from "framer-motion";

export const smoothReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

// ✅ Explicit transition typing
const spring: Transition = {
  type: "spring",
  stiffness: 90,
  damping: 18,
  mass: 0.6,
};

export const smoothItem = (delay = 0): TargetAndTransition => ({
  opacity: 1,
  y: 0,
  scale: 1,
  transition: {
    ...spring,
    delay,
  },
});