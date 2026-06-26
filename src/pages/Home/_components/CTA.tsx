import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../../../components/ui/Button";
import Aura from "../../../components/Aura";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <Aura />
      <motion.div
        style={{ opacity, scale }}
        className="max-w-4xl mx-auto relative rounded-3xl border border-white/5 overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-transparent to-cyan-600/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/20 blur-[100px] rounded-full" />

        <div className="relative flex gap-4 sm:gap-6 flex-col items-center text-center py-8 sm:py-16 px-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">Ready to build your resume?</h2>
          <p className="text-gray-500 max-w-md mx-auto text-xs sm:text-base">
            Join thousands of job seekers who landed their dream jobs with our resume builder.
          </p>
          <Button to="/build" size="lg" className="group">
            Get Started for Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
