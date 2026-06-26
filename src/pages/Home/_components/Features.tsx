import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Download, LayoutTemplate, Palette } from "lucide-react";
import SectionTitle from "./SectionTitle";
import Aura from "../../../components/Aura";

const features = [
  {
    icon: LayoutTemplate,
    title: "Professional Templates",
    description: "Dozens of templates for every industry.",
  },
  {
    icon: FileText,
    title: "Real-Time Editor",
    description: "See changes as you type.",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "One-click high-quality PDF download.",
  },
  {
    icon: Palette,
    title: "Custom Design",
    description: "Colors, fonts, spacing — all customizable.",
  },
];

function FeatureItem({ feature }: { feature: (typeof features)[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25], [30, 0]);

  const Icon = feature.icon;

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="flex items-start gap-4 group">
      <div className="w-11 h-11 rounded-2xl border-2 border-blue-500/20 bg-blue-950/30 flex items-center justify-center shrink-0 group-hover:border-blue-500/60 group-hover:bg-blue-950/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
        <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
      </div>
      <div>
        <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
        <p className="text-gray-400 text-sm mt-0.5">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Aura />
        <SectionTitle label="FEATURES" title="Everything you need to" highlight="stand out" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {features.map((feature) => (
            <FeatureItem key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
