import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function ScrollHint() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 1, 0]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 pb-8">
      <motion.div style={{ opacity }} className="flex flex-col items-center gap-3">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown strokeWidth={4} size={16} className="text-blue-400/50" />
        </motion.div>
        <span className="text-[10px] font-medium tracking-[0.15em] text-gray-400/50">EXPLORE</span>
      </motion.div>
    </div>
  );
}
