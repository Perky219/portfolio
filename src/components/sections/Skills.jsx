import { SectionHeading } from "../ui/SectionHeading";
import { AnimatedSection } from "../ui/AnimatedSection";
import { Badge } from "../ui/Badge";
import { useLanguage } from "../../hooks/useLanguage";
import { skillGroups } from "../../data/skills";

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 max-w-5xl mx-auto px-6">
      <SectionHeading eyebrow="03 · Skills" title={t.sections.skills} />

      <div className="grid sm:grid-cols-2 gap-4">
        {skillGroups.map((group, i) => (
          <AnimatedSection key={group.key} delay={i * 0.07}>
            <div
              className="bg-surface border rounded-xl p-5 h-full"
              style={{ borderColor: "var(--color-edge)" }}
            >
              <p className="font-mono text-xs text-accent tracking-[0.18em] uppercase mb-4">
                {t.skills[group.key]}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
