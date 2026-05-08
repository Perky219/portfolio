import { motion } from "motion/react";

export function AnimatedSection({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.48, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
