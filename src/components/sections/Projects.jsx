import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ui/ProjectCard";
import { useLanguage } from "../../hooks/useLanguage";
import { freelanceProjects, academicProjects } from "../../data/projects";

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-12 md:py-16 max-w-5xl mx-auto px-4 sm:px-6">
      <SectionHeading eyebrow="01 · Projects" title={t.sections.freelance} />
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-12 md:mb-16">
        {freelanceProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <SectionHeading eyebrow="02 · Projects" title={t.sections.academic} />
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {academicProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
