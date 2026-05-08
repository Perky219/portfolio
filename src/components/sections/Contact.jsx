import { FiMail, FiGithub, FiLinkedin, FiMessageCircle, FiArrowRight, FiMapPin } from "react-icons/fi";
import { SectionHeading } from "../ui/SectionHeading";
import { AnimatedSection } from "../ui/AnimatedSection";
import { useLanguage } from "../../hooks/useLanguage";
import { personal } from "../../data/personal";

const contactItems = [
  {
    key: "email",
    icon: FiMail,
    href: `mailto:${personal.email}`,
    label: personal.email,
    external: false,
  },
  {
    key: "github",
    icon: FiGithub,
    href: personal.github,
    label: personal.githubHandle,
    external: true,
  },
  {
    key: "linkedin",
    icon: FiLinkedin,
    href: personal.linkedin,
    label: personal.linkedinHandle,
    external: true,
  },
  {
    key: "phone",
    icon: FiMessageCircle,
    href: personal.whatsapp,
    label: personal.phone,
    external: true,
  },
];

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 max-w-5xl mx-auto px-6">
      <SectionHeading eyebrow="05 · Contact" title={t.sections.contact} />

      <AnimatedSection>
        <p className="text-ink-2 text-base max-w-lg leading-relaxed mb-10">
          {t.contact.description}
        </p>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 gap-3 max-w-lg">
        {contactItems.map(({ key, icon: Icon, href, label, external }, i) => (
          <AnimatedSection key={key} delay={i * 0.06}>
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="flex items-center justify-between gap-3 bg-surface border rounded-xl px-4 py-3.5 hover:border-accent/30 hover:bg-surface-alt group transition-all duration-200"
              style={{ borderColor: "var(--color-edge)" }}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-accent shrink-0" />
                <div>
                  <p className="font-mono text-xs text-accent uppercase tracking-wide mb-0.5">
                    {t.contact[key]}
                  </p>
                  <p className="text-ink-2 text-xs">{label}</p>
                </div>
              </div>
              <FiArrowRight
                size={14}
                className="text-ink-3 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
              />
            </a>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.3} className="mt-8">
        <p className="flex items-center gap-2 font-mono text-xs text-ink-3">
          <FiMapPin size={12} className="text-warm" />
          {t.contact.location}
        </p>
      </AnimatedSection>
    </section>
  );
}
