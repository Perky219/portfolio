import { motion } from "motion/react";

export function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-10">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-2"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="font-display text-2xl sm:text-3xl font-semibold text-ink"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.18 }}
        className="mt-3 h-px w-10 bg-accent origin-left"
      />
    </div>
  );
}
