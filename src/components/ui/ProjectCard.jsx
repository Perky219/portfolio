import { useState } from "react";
import { motion } from "motion/react";
import { FiEye } from "react-icons/fi";
import { Badge } from "./Badge";
import { ProjectModal } from "./ProjectModal";
import { useLanguage } from "../../hooks/useLanguage";

function BrowserChrome({ mockUrl, gradient, stack }) {
  return (
    <div
      className="rounded-t-xl overflow-hidden border-b"
      style={{
        background: "var(--color-surface-alt)",
        borderColor: "var(--color-edge)",
      }}
    >
      {/* Traffic lights + URL bar */}
      <div className="flex items-center gap-2 px-3 pt-2.5 pb-2">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        </div>
        <div
          className="flex-1 rounded px-2 py-0.5 text-[0.6rem] font-mono text-ink-3 truncate"
          style={{ background: "var(--color-surface)" }}
        >
          {mockUrl}
        </div>
      </div>

      {/* App preview area */}
      <div className={`h-16 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center gap-2 flex-wrap px-3">
          {stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[0.58rem] text-ink-2/70 px-1.5 py-0.5 rounded backdrop-blur-sm"
              style={{ background: "rgba(var(--color-surface), 0.4)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

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
        className="group bg-surface border border-edge rounded-xl overflow-hidden hover:border-accent/25 hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer shadow-sm hover:shadow-accent/5 hover:shadow-lg"
        style={{ borderColor: "var(--color-edge)" }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
        aria-label={`Preview ${content.title}`}
      >
        <BrowserChrome
          mockUrl={project.mockUrl}
          gradient={project.gradient}
          stack={project.stack}
        />

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1">
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
              {project.stack.slice(0, 3).map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
              {project.stack.length > 3 && (
                <Badge variant="muted">+{project.stack.length - 3}</Badge>
              )}
            </div>
            <FiEye size={13} className="text-ink-3 group-hover:text-accent transition-colors shrink-0" />
          </div>
        </div>
      </motion.article>

      {modalOpen && (
        <ProjectModal project={project} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
