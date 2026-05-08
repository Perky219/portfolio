import { FiCode, FiLayout, FiDatabase, FiSettings } from "react-icons/fi";
import { SectionHeading } from "../ui/SectionHeading";
import { AnimatedSection } from "../ui/AnimatedSection";
import { SkillBadge } from "../ui/SkillBadge";
import { useLanguage } from "../../hooks/useLanguage";
import { skillGroups } from "../../data/skills";

const GROUP_ICONS = {
  languages: FiCode,
  frontend: FiLayout,
  backend: FiDatabase,
  tools: FiSettings,
};

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-12 md:py-16 max-w-5xl mx-auto px-4 sm:px-6">
      <SectionHeading eyebrow="03 · Skills" title={t.sections.skills} />

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {skillGroups.map((group, i) => {
          const Icon = GROUP_ICONS[group.key];
          return (
            <AnimatedSection key={group.key} delay={i * 0.07}>
              <div
                className="bg-surface border rounded-xl p-4 sm:p-5 h-full"
                style={{ borderColor: "var(--color-edge)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {Icon && <Icon size={14} className="text-accent shrink-0" />}
                  <p className="font-mono text-xs text-accent tracking-[0.18em] uppercase">
                    {t.skills[group.key]}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.items.map((item) => (
                    <SkillBadge key={item}>{item}</SkillBadge>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
