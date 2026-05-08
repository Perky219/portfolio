import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { personal } from "../../data/personal";

const SECTIONS = ["about", "projects", "skills", "education", "contact"];

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTIONS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#education", label: t.nav.education },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-canvas/80 backdrop-blur-lg border-b"
          : "bg-transparent border-b border-transparent"
      }`}
      style={scrolled ? { borderColor: "var(--color-edge)" } : {}}
    >
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#about" className="flex items-center" aria-label="Home">
          <img
            src={personal.logoPath}
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5">
          {links.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative font-mono text-xs tracking-wide transition-colors"
                style={{ color: isActive ? "var(--color-accent)" : "var(--color-ink-2)" }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            );
          })}

          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => setLang((l) => (l === "en" ? "es" : "en"))}
              className="font-mono text-xs px-2.5 py-1 rounded-md border hover:border-accent/40 hover:text-accent text-ink-2 transition-all"
              style={{ borderColor: "var(--color-edge)" }}
              aria-label="Toggle language"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md border hover:border-accent/40 hover:text-accent text-ink-2 transition-all"
              style={{ borderColor: "var(--color-edge)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setLang((l) => (l === "en" ? "es" : "en"))}
            className="font-mono text-xs px-2 py-1 rounded-md border text-ink-2 transition-all"
            style={{ borderColor: "var(--color-edge)" }}
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md border text-ink-2 transition-all"
            style={{ borderColor: "var(--color-edge)" }}
          >
            {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-1.5 text-ink-2 hover:text-ink transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-canvas/95 backdrop-blur-lg border-b overflow-hidden"
            style={{ borderColor: "var(--color-edge)" }}
          >
            <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-ink-2 hover:text-ink font-mono text-sm py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
