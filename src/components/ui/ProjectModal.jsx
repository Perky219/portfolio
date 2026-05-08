import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";
import { Badge } from "./Badge";
import { useLanguage } from "../../hooks/useLanguage";

export function ProjectModal({ project, onClose }) {
  const { t } = useLanguage();
  const content = t.projects[project.id];

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="relative bg-surface border border-edge w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
          style={{ borderColor: "var(--color-edge)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-edge" style={{ borderColor: "var(--color-edge)" }}>
            <div className="flex-1 min-w-0">
              <span className="font-mono text-xs text-accent uppercase tracking-widest mb-1 block">
                {project.date}
              </span>
              <h3 className="font-display font-semibold text-ink text-base leading-snug">
                {content.title}
              </h3>
              <p className="text-warm text-xs font-medium mt-1">{content.role}</p>
            </div>
            <button
              onClick={onClose}
              aria-label={t.modal.close}
              className="shrink-0 p-1.5 rounded-lg text-ink-3 hover:text-ink hover:bg-surface-alt transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto px-6 py-5 flex-1">
            <ul className="space-y-3 mb-6">
              {content.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-ink-2 text-sm leading-relaxed">
                  <span className="text-accent mt-0.5 shrink-0">›</span>
                  {bullet}
                </li>
              ))}
            </ul>

            <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
              {t.modal.stack}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {(project.github || project.live) && (
            <div className="flex gap-3 px-6 py-4 border-t border-edge" style={{ borderColor: "var(--color-edge)" }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg border border-edge hover:border-accent/40 hover:text-accent text-ink-2 transition-all"
                  style={{ borderColor: "var(--color-edge)" }}
                >
                  <FiGithub size={14} />
                  {t.modal.github}
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg bg-accent text-canvas hover:bg-accent-dim transition-colors"
                >
                  <FiExternalLink size={14} />
                  {t.modal.live}
                </a>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
