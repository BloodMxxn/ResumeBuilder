import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionTitleProps {
  label: string;
  title: string;
  highlight: string;
}

export default function SectionTitle({ label, title, highlight }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.25], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity: headerOpacity, y: headerY }}
      className="text-center mb-14"
    >
      <span className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4 block">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-white">
        {title}{" "}
        <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {highlight}
        </span>
      </h2>
    </motion.div>
  );
}
