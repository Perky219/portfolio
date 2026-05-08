import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorGlow() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { stiffness: 90, damping: 18 });
  const springY = useSpring(y, { stiffness: 90, damping: 18 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: "480px",
        height: "480px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(34,211,238,0.055) 0%, rgba(34,211,238,0.02) 40%, transparent 70%)",
      }}
    />
  );
}
