import { motion } from "motion/react";
import { FiGithub, FiLinkedin, FiDownload, FiArrowDown } from "react-icons/fi";
import { useLanguage } from "../../hooks/useLanguage";
import { personal } from "../../data/personal";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative min-h-screen flex items-center">
      {/* Decorative glow orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 right-1/4 w-[480px] h-[480px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[360px] h-[360px] bg-warm/4 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-10 w-[280px] h-[280px] bg-accent/3 rounded-full blur-[90px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-accent text-sm tracking-[0.18em] mb-4"
          >
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-ink leading-[1.04] mb-4"
          >
            {personal.name}
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-mono text-[0.7rem] text-ink-3 tracking-[0.14em] uppercase mb-7"
          >
            {t.hero.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="text-ink-2 text-base sm:text-lg leading-relaxed mb-9 max-w-xl"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-canvas font-semibold text-sm hover:bg-accent-dim transition-colors"
            >
              {t.hero.cta_projects}
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-ink-2 text-sm hover:border-accent/35 hover:text-ink transition-all"
              style={{ borderColor: "var(--color-edge)" }}
            >
              <FiGithub size={15} />
              {t.hero.cta_github}
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-ink-2 text-sm hover:border-accent/35 hover:text-ink transition-all"
              style={{ borderColor: "var(--color-edge)" }}
            >
              <FiLinkedin size={15} />
              {t.hero.cta_linkedin}
            </a>
            <a
              href={personal.cvPath}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-warm/30 text-warm text-sm hover:bg-warm/8 transition-all"
            >
              <FiDownload size={15} />
              {t.hero.cta_cv}
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="absolute bottom-10 left-6 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiArrowDown size={14} className="text-ink-3" />
          </motion.div>
          <span className="font-mono text-[0.6rem] text-ink-3 tracking-widest uppercase">
            {t.hero.scroll}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
