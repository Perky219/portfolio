import { FiMail, FiGithub, FiLinkedin, FiMessageCircle, FiArrowRight, FiMapPin } from "react-icons/fi";
import { SectionHeading } from "../ui/SectionHeading";
import { AnimatedSection } from "../ui/AnimatedSection";
import { GithubHoverCard } from "../ui/GithubHoverCard";
import { LinkedinHoverCard } from "../ui/LinkedinHoverCard";
import { useLanguage } from "../../hooks/useLanguage";
import { personal } from "../../data/personal";

function ContactLink({ icon: Icon, href, label, value, external, wrapper: Wrapper }) {
  const inner = (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center justify-between gap-3 bg-surface border rounded-xl px-4 py-3.5 hover:border-accent/30 hover:bg-surface-alt group transition-all duration-200 w-full"
      style={{ borderColor: "var(--color-edge)" }}
    >
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-accent shrink-0" />
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-wide mb-0.5">{label}</p>
          <p className="text-ink-2 text-xs">{value}</p>
        </div>
      </div>
      <FiArrowRight
        size={14}
        className="text-ink-3 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0"
      />
    </a>
  );

  return Wrapper ? <Wrapper>{inner}</Wrapper> : inner;
}

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-12 md:py-16 max-w-5xl mx-auto px-4 sm:px-6">
      <SectionHeading eyebrow="05 · Contact" title={t.sections.contact} />

      <AnimatedSection>
        <p className="text-ink-2 text-base max-w-lg leading-relaxed mb-10">
          {t.contact.description}
        </p>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 max-w-lg">
        <AnimatedSection delay={0}>
          <ContactLink
            icon={FiMail}
            href={`mailto:${personal.email}`}
            label={t.contact.email}
            value={personal.email}
            external={false}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.06}>
          <ContactLink
            icon={FiGithub}
            href={personal.github}
            label={t.contact.github}
            value={personal.githubHandle}
            external
            wrapper={(props) => (
              <GithubHoverCard username={personal.githubUsername} placement="top">
                {props.children}
              </GithubHoverCard>
            )}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <ContactLink
            icon={FiLinkedin}
            href={personal.linkedin}
            label={t.contact.linkedin}
            value={personal.linkedinHandle}
            external
            wrapper={(props) => (
              <LinkedinHoverCard placement="top">
                {props.children}
              </LinkedinHoverCard>
            )}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.18}>
          <ContactLink
            icon={FiMessageCircle}
            href={personal.whatsapp}
            label={t.contact.phone}
            value={personal.phone}
            external
          />
        </AnimatedSection>
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
