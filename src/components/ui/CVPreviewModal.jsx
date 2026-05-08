import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { FiX, FiDownload, FiFileText, FiPrinter } from "react-icons/fi";
import { useLanguage } from "../../hooks/useLanguage";
import { personal } from "../../data/personal";

export function CVPreviewModal({ onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handlePrint = () => {
    const iframe = document.getElementById("cv-iframe");
    if (iframe?.contentWindow) iframe.contentWindow.print();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 14 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 14 }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
          className="relative bg-surface w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl shadow-black/50 flex flex-col"
          style={{
            border: "1px solid var(--color-edge)",
            height: "min(88vh, 760px)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-5 py-3 shrink-0 border-b"
            style={{
              background: "var(--color-surface-alt)",
              borderColor: "var(--color-edge)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <FiFileText size={15} className="text-accent" />
              <span className="font-display font-semibold text-ink text-sm">
                {personal.fullName}
              </span>
              <span className="font-mono text-xs text-ink-3">· CV</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 rounded-lg border text-ink-2 hover:border-accent/35 hover:text-accent transition-all"
                style={{ borderColor: "var(--color-edge)" }}
                title="Print"
              >
                <FiPrinter size={13} />
                <span className="hidden sm:inline">Print</span>
              </button>

              <a
                href={personal.cvPath}
                download
                className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 rounded-lg bg-accent text-canvas hover:bg-accent-dim transition-colors"
              >
                <FiDownload size={13} />
                {t.hero.cta_cv}
              </a>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-ink-3 hover:text-ink hover:bg-surface transition-colors"
                aria-label="Close"
              >
                <FiX size={16} />
              </button>
            </div>
          </div>

          {/* CV iframe */}
          <iframe
            id="cv-iframe"
            src={personal.cvHtmlPath}
            className="flex-1 w-full border-0 bg-white"
            title="CV Preview"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
