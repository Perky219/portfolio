import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiLinkedin, FiMapPin, FiBriefcase } from "react-icons/fi";
import { personal } from "../../data/personal";

export function LinkedinHoverCard({ children, placement = "top" }) {
  const [show, setShow] = useState(false);

  const positionClass =
    placement === "top"
      ? "bottom-full mb-3"
      : "top-full mt-3";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: placement === "top" ? 6 : -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === "top" ? 6 : -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute left-1/2 -translate-x-1/2 z-50 w-60 pointer-events-none ${positionClass}`}
          >
            <div
              className="bg-surface rounded-xl p-4 shadow-2xl shadow-black/40"
              style={{ border: "1px solid var(--color-edge)" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center shrink-0">
                  <FiLinkedin size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-ink font-semibold text-sm leading-tight">{personal.fullName}</p>
                  <p className="text-ink-3 font-mono text-xs truncate">{personal.linkedinHandle}</p>
                </div>
              </div>

              <p className="flex items-center gap-1.5 text-ink-2 text-xs mb-2">
                <FiBriefcase size={11} className="text-accent shrink-0" />
                {personal.title} · Frontend Specialist
              </p>

              <p className="flex items-center gap-1.5 text-xs font-mono text-ink-3">
                <FiMapPin size={10} className="text-warm shrink-0" />
                {personal.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
