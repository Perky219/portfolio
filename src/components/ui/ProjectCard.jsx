import { useState } from "react";
import { motion } from "motion/react";
import { FiEye } from "react-icons/fi";
import { Badge } from "./Badge";
import { ProjectModal } from "./ProjectModal";
import { useLanguage } from "../../hooks/useLanguage";

export function ProjectCard({ project, index = 0 }) {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const content = t.projects[project.id];

  if (!content) return null;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.42, delay: index * 0.07 }}
        className="group bg-surface border border-edge rounded-xl p-5 hover:border-accent/25 hover:bg-surface-alt transition-all duration-300 flex flex-col cursor-pointer"
        style={{ borderColor: "var(--color-edge)" }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
        aria-label={`Preview ${content.title}`}
      >
        <div className="flex justify-between items-start gap-3 mb-1">
          <h3 className="font-display text-sm font-semibold text-ink leading-snug group-hover:text-accent transition-colors duration-200">
            {content.title}
          </h3>
          <span className="font-mono text-xs text-ink-3 whitespace-nowrap shrink-0 mt-0.5">
            {project.date}
          </span>
        </div>

        <p className="text-warm text-xs font-medium mb-3">{content.role}</p>

        <ul className="space-y-1.5 mb-4 flex-1">
          {content.bullets.slice(0, 2).map((bullet, i) => (
            <li key={i} className="flex gap-2 text-ink-2 text-xs leading-relaxed">
              <span className="text-accent mt-0.5 shrink-0">›</span>
              {bullet}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
            {project.stack.length > 4 && (
              <Badge variant="muted">+{project.stack.length - 4}</Badge>
            )}
          </div>
          <span className="shrink-0 flex items-center gap-1 font-mono text-xs text-ink-3 group-hover:text-accent transition-colors">
            <FiEye size={13} />
          </span>
        </div>
      </motion.article>

      {modalOpen && (
        <ProjectModal project={project} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
