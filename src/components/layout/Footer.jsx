import { useLanguage } from "../../hooks/useLanguage";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="border-t py-8 mt-12"
      style={{ borderColor: "var(--color-edge)" }}
    >
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-ink-3 text-xs font-mono">
        <span>{t.footer.rights}</span>
        <span>{t.footer.built_with}</span>
      </div>
    </footer>
  );
}
