import { SectionHeading } from "../ui/SectionHeading";
import { AnimatedSection } from "../ui/AnimatedSection";
import { useLanguage } from "../../hooks/useLanguage";

export function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-20 max-w-5xl mx-auto px-6">
      <SectionHeading eyebrow="04 · Education" title={t.sections.education} />

      <div className="grid sm:grid-cols-2 gap-4">
        {/* University card */}
        <AnimatedSection>
          <div
            className="bg-surface border rounded-xl p-5 h-full"
            style={{ borderColor: "var(--color-edge)" }}
          >
            <div className="flex justify-between items-start gap-2 mb-1">
              <h3 className="font-display font-semibold text-ink text-sm leading-snug">
                {t.education.school}
              </h3>
              <span className="font-mono text-xs text-ink-3 shrink-0 mt-0.5">
                {t.education.period}
              </span>
            </div>
            <p className="text-warm text-xs font-medium mb-4">{t.education.degree}</p>
            <p className="text-ink-2 text-xs leading-relaxed mb-2">{t.education.note}</p>
            <p className="text-ink-3 text-xs leading-relaxed">{t.education.coursework}</p>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-4">
          {/* Certification card */}
          <AnimatedSection delay={0.08}>
            <div
              className="bg-surface border rounded-xl p-5"
              style={{ borderColor: "var(--color-edge)" }}
            >
              <p className="font-mono text-xs text-accent tracking-[0.18em] uppercase mb-3">
                {t.sections.certifications}
              </p>
              <h4 className="font-display font-semibold text-ink text-sm leading-snug mb-1.5">
                {t.certifications.cert1_title}
              </h4>
              <p className="font-mono text-xs text-ink-3">{t.certifications.cert1_issuer}</p>
            </div>
          </AnimatedSection>

          {/* Languages card */}
          <AnimatedSection delay={0.14}>
            <div
              className="bg-surface border rounded-xl p-5"
              style={{ borderColor: "var(--color-edge)" }}
            >
              <p className="font-mono text-xs text-accent tracking-[0.18em] uppercase mb-4">
                {t.sections.languages}
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-ink text-sm">{t.lang_section.spanish}</span>
                  <span className="font-mono text-xs text-warm">{t.lang_section.spanish_level}</span>
                </div>
                <div
                  className="h-px"
                  style={{ backgroundColor: "var(--color-edge)" }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-ink text-sm">{t.lang_section.english}</span>
                  <span className="font-mono text-xs text-ink-2">{t.lang_section.english_level}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
