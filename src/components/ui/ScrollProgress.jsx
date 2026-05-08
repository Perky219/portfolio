import { useScroll, motion, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{ scaleX, background: "var(--color-accent)" }}
    />
  );
}
