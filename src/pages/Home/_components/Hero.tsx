import { useRef } from "react";
import Aura from "../../../components/Aura";
import Button from "../../../components/ui/Button";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0.7, 1], [0, 70]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative flex justify-center items-center px-4"
    >
      <Aura pulse />
      <div className="flex flex-col items-center text-center max-w-2xl">
        <Button size="sm" variant="badge" className="mb-6">
          ✨ Make Your Move
        </Button>

        <h2 className="text-4xl sm:text-5xl font-bold font-sora text-white mb-4">
          Build Your Professional <br />
          <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Resume in Minutes
          </span>
        </h2>

        <p className="text-gray-500 mb-8 max-w-xl text-sm sm:text-base">
          Choose from templates and build your resume in minutes. Fast, easy, and completely free.
        </p>

        <div className="flex gap-2 sm:gap-3">
          <Button to="/build/minimal" size="lg">
            Create New Resume
          </Button>
          <Button to="/templates" size="lg" variant="outline">
            View Templates
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
