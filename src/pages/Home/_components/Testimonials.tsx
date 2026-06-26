import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionTitle from "./SectionTitle";
import Aura from "../../../components/Aura";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    text: "This resume builder helped me land my dream job at Google.",
  },
  {
    name: "Mike Chen",
    role: "Product Designer at Figma",
    text: "The AI suggestions were a game changer. I had my resume ready in under 10 minutes.",
  },
  {
    name: "Emily Davis",
    role: "Marketing Manager at Meta",
    text: "Best free resume builder I've used. The PDF export quality is outstanding.",
  },
  {
    name: "Alex Kim",
    role: "Data Scientist at Netflix",
    text: "Super easy to use. Built my resume in 5 minutes and got interview calls the same week.",
  },
  {
    name: "Laura Silva",
    role: "UX Lead at Spotify",
    text: "The templates are modern and clean. Exactly what recruiters want to see.",
  },
  {
    name: "James Wright",
    role: "Frontend Dev at Stripe",
    text: "Finally a resume builder that doesn't look like it's from 2010. Love it.",
  },
];

const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3, 6);

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="shrink-0 w-[320px] md:w-95 h-40 p-5 rounded-2xl border border-white/6 bg-white/2 flex flex-col justify-between overflow-hidden mx-2">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="size-9 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-xs">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="text-white font-medium text-sm">{testimonial.name}</p>
            <p className="text-gray-500 text-xs">{testimonial.role}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">"{testimonial.text}"</p>
      </div>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-xs">
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section className="py-24 relative overflow-hidden">
      <Aura color="cyan" />
      <SectionTitle label="Testimonials" title="Loved by" highlight="thousands" />

      <motion.div ref={ref} style={{ opacity }}>
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-black/50 to-transparent z-10 pointer-events-none" />
          <div className="marquee-left">
            {[...row1, ...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`r1-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-black/50 to-transparent z-10 pointer-events-none" />
          <div className="marquee-right">
            {[...row2, ...row2, ...row2].map((t, i) => (
              <TestimonialCard key={`r2-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
