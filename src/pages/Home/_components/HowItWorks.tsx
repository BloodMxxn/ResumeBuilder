import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionTitle from "./SectionTitle";

const steps = [
  {
    step: "01",
    src: "/pick-template.png",
    title: "Pick a Template",
    description: "Browse our collection and choose a template that fits your style.",
  },
  {
    step: "02",
    src: "/fill-details.png",
    title: "Fill in Your Details",
    description: "Add your experience, skills, and education with our guided editor.",
  },
  {
    step: "03",
    src: "/download.png",
    title: "Download",
    description: "Export your resume as a PDF and start applying to your dream jobs.",
  },
];

function StepItem({ step }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10"
    >
      {/* Aura */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-1/2 -translate-1/2 size-50 bg-blue-500/20 blur-[120px]"
      ></motion.div>

      {/* image placeholder */}
      <div className="w-full md:w-1/2 aspect-video rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <img
          src={`/ResumeBuilder/${step.src}`}
          className="w-full h-full object-cover object-center"
          alt=""
        />
      </div>

      {/* text */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <span className="text-xs font-medium text-gray-500 tracking-widest">STEP {step.step}</span>
        <h3 className="text-white font-bold text-xl md:text-2xl mb-2 mt-1">{step.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-4">
      <SectionTitle label="How it Works" title="Three steps to your" highlight="dream resume" />

      <div className="max-w-5xl mx-auto relative">
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <StepItem key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
