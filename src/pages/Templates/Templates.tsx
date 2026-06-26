import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  LayoutTemplate,
  Briefcase,
  Code2,
  Palette,
  GraduationCap,
  Building2,
  Stethoscope,
  Megaphone,
  Filter,
} from "lucide-react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Button from "../../components/ui/Button";
import GridBackground from "../../components/GridBackground";
import { templates } from "../../templates";
import type { TemplateConfig } from "../../templates";

const categories = [
  { id: "all", label: "All Templates", icon: LayoutTemplate },
  { id: "modern", label: "Modern", icon: Code2 },
  { id: "classic", label: "Classic", icon: Briefcase },
  { id: "creative", label: "Creative", icon: Palette },
  { id: "academic", label: "Academic", icon: GraduationCap },
  { id: "corporate", label: "Corporate", icon: Building2 },
  { id: "healthcare", label: "Healthcare", icon: Stethoscope },
  { id: "marketing", label: "Marketing", icon: Megaphone },
];

const templateCards = [
  { id: 1, slug: "minimal", category: "modern", popular: true },
  { id: 2, slug: "classic", category: "classic", popular: true },
  { id: 3, slug: "modern", category: "modern", popular: false },
];

function TemplateCard({ template }: { template: TemplateConfig & { popular?: boolean } }) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="group relative cursor-pointer"
      onClick={() => navigate(`/build/${template.slug}`)}
    >
      <div className="relative rounded-2xl border border-white/5 bg-white/2 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:bg-white/5 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
        <div className="absolute top-3 right-3 z-10">
          {template.popular && (
            <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-white bg-linear-to-r from-blue-600 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30">
              Popular
            </span>
          )}
        </div>

        <div className="relative h-56 sm:h-56 overflow-hidden bg-white/5 flex items-center justify-center">
          {!imgError ? (
            <img
              src={`/ResumeBuilder/templates/${template.slug}.png`}
              alt={template.name}
              className="w-full h-full object-cover object-left"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-600">
              <LayoutTemplate size={32} />
              <span className="text-xs">{template.name}</span>
            </div>
          )}
        </div>

        <div className="p-4 flex items-center justify-center">
          <span className="text-gray-400 text-xs font-medium tracking-wider uppercase">
            {template.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("all");

  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [30, 0]);

  const enrichedCards = templateCards
    .map((card) => {
      const tmpl = templates.find((t) => t.slug === card.slug);
      return tmpl ? { ...card, ...tmpl } : null;
    })
    .filter(Boolean) as ((typeof templateCards)[0] & TemplateConfig)[];

  const filtered =
    activeCategory === "all"
      ? enrichedCards
      : enrichedCards.filter((t) => t.category === activeCategory);

  return (
    <div className="relative overflow-hidden isolate">
      <GridBackground />
      <Header />

      <section className="relative pt-32 pb-8 px-4">
        <motion.div
          ref={heroRef}
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            TEMPLATES
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Choose Your{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Perfect Template
            </span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            Browse our collection of professionally designed templates. Each one is ATS-friendly and
            fully customizable.
          </p>
        </motion.div>
      </section>

      <section className="relative px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    activeCategory === category.id
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-gray-400 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-gray-300"
                  }`}
                >
                  <Icon size={14} />
                  {category.label}
                </button>
              );
            })}
          </div>

          <div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Filter className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-sm">No templates found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="relative py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative rounded-3xl border border-white/5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-transparent to-cyan-600/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/20 blur-[100px] rounded-full" />

          <div className="relative flex gap-4 sm:gap-6 flex-col items-center text-center py-8 sm:py-16 px-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Can't find what you need?</h2>
            <p className="text-gray-500 max-w-md mx-auto text-xs sm:text-base">
              Start with a blank canvas and create your own custom template from scratch.
            </p>
            <Button to="/build/minimal" size="lg">
              Start from Scratch
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
