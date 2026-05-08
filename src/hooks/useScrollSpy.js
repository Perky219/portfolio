import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds, offset = 80) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - offset <= scrollY) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return active;
}
