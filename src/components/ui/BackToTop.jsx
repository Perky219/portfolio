import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowUp } from "react-icons/fi";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-accent text-canvas shadow-lg hover:bg-accent-dim transition-colors"
          aria-label="Back to top"
        >
          <FiArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
