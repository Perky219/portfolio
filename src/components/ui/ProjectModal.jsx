import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FiGithub, FiExternalLink, FiAlertCircle } from "react-icons/fi";
import { Badge } from "./Badge";
import { useLanguage } from "../../hooks/useLanguage";

function ModalBrowserChrome({ project, onClose }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 shrink-0 border-b"
      style={{
        background: "var(--color-surface-alt)",
        borderColor: "var(--color-edge)",
      }}
    >
      <div className="flex gap-1.5 shrink-0">
        <button
          onClick={onClose}
          className="w-3 h-3 rounded-full bg-red-400/70 hover:bg-red-500 transition-colors"
          aria-label="Close"
        />
        <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
        <div className="w-3 h-3 rounded-full bg-green-400/50" />
      </div>

      <div
        className="flex-1 mx-2 rounded px-3 py-1 text-xs font-mono text-ink-3 text-center truncate"
        style={{ background: "var(--color-surface)" }}
      >
        {project.live || project.mockUrl}
      </div>

      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-3 hover:text-accent transition-colors"
          title="Open in new tab"
        >
          <FiExternalLink size={13} />
        </a>
      )}
    </div>
  );
}

function ProjectPreview({ project, gradient }) {
  const [blocked, setBlocked] = useState(false);
  const iframeRef = useRef(null);

  const handleLoad = () => {
    try {
      const doc = iframeRef.current?.contentDocument;
      // If no throws, same-origin — check if it's a real page or an error doc
      if (doc && doc.body && doc.body.innerHTML.length < 50) setBlocked(true);
    } catch {
      // SecurityError = cross-origin frame loaded correctly, do nothing
    }
  };

  if (project.live && !blocked) {
    return (
      <div className="relative shrink-0" style={{ height: "260px" }}>
        <iframe
          ref={iframeRef}
          src={project.live}
          className="w-full h-full border-0"
          title="Live preview"
          sandbox="allow-scripts allow-same-origin allow-forms"
          loading="lazy"
          onLoad={handleLoad}
          onError={() => setBlocked(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`h-36 bg-gradient-to-br ${gradient} relative overflow-hidden shrink-0 flex items-center justify-center`}
    >
      <div className="text-center px-6 z-10 relative">
        <p className="font-display font-semibold text-ink/60 text-lg leading-tight">
          {project.mockUrl}
        </p>
        {blocked && project.live ? (
          <div className="mt-2 flex flex-col items-center gap-1.5">
            <span className="flex items-center gap-1.5 font-mono text-xs text-ink-3/70">
              <FiAlertCircle size={11} />
              preview blocked by host
            </span>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-accent hover:underline"
            >
              open site →
            </a>
          </div>
        ) : (
          <p className="font-mono text-xs text-ink-3/60 mt-1">preview not available</p>
        )}
      </div>
      {project.stack.slice(0, 3).map((tech, i) => (
        <span
          key={tech}
          className="absolute font-mono text-ink-2/20 select-none pointer-events-none"
          style={{
            top: `${20 + i * 28}%`,
            left: i % 2 === 0 ? "8%" : "62%",
            fontSize: "0.65rem",
          }}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

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
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 14 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 14 }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
          className="relative bg-surface w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl shadow-black/50 max-h-[88vh] flex flex-col"
          style={{ border: "1px solid var(--color-edge)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalBrowserChrome project={project} onClose={onClose} />
          <ProjectPreview project={project} gradient={project.gradient} />

          <div className="overflow-y-auto flex-1">
            <div className="px-6 pt-5 pb-2">
              <span className="font-mono text-xs text-accent uppercase tracking-widest">
                {project.date}
              </span>
              <h3 className="font-display font-semibold text-ink text-base leading-snug mt-1 mb-1">
                {content.title}
              </h3>
              <p className="text-warm text-xs font-medium">{content.role}</p>
            </div>

            <div className="px-6 py-4">
              <ul className="space-y-3 mb-5">
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
          </div>

          {(project.github || project.live) && (
            <div
              className="flex gap-3 px-6 py-4 border-t shrink-0"
              style={{ borderColor: "var(--color-edge)" }}
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg border hover:border-accent/40 hover:text-accent text-ink-2 transition-all"
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
