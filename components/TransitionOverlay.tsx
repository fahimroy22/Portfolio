"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransitionOverlay() {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const t = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isAnimating ? 1 : 0,
        pointerEvents: isAnimating ? "auto" : "none",
      }}
      className="pointer-events-none fixed inset-0 z-[9999]"
    >
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isAnimating ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        className="origin-top h-full w-full bg-gradient-to-b from-slate-950 via-black to-slate-950"
      />
    </motion.div>
  );
}