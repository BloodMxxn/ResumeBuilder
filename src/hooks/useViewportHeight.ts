// hooks/useViewportHeight.ts
import { useState, useEffect } from "react";

export default function useViewportHeight() {
  const [height, setHeight] = useState(() => window.innerHeight);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const updateHeight = () => {
      setHeight(window.innerHeight);
    };

    updateHeight();

    if (!isMobile) {
      window.addEventListener("resize", updateHeight);
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener("resize", updateHeight);
      }
    };
  }, []);

  return height;
}
