import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionTitle from "./SectionTitle";
import Aura from "../../../components/Aura";

const faqs = [
  {
    question: "Is this resume builder really free?",
    answer:
      "Yes, completely free. No hidden fees, no trials. You can create, edit, and download your resume as PDF without paying anything.",
  },
  {
    question: "Can I use my own custom font?",
    answer:
      "Absolutely. Our editor lets you choose from a wide library of professional fonts or upload your own to match your personal brand.",
  },
  {
    question: "How many templates are available?",
    answer:
      "We offer 50+ professionally designed templates across various industries including tech, finance, creative, and more. New templates are added regularly.",
  },
  {
    question: "Will my resume pass ATS scanners?",
    answer:
      "Yes. All our templates are designed to be ATS-friendly, meaning they use standard formatting that Applicant Tracking Systems can easily parse.",
  },
  {
    question: "Can I save my progress and come back later?",
    answer:
      "Yes, your data is automatically saved in your browser. You can close the tab and resume editing anytime without losing any progress.",
  },
  {
    question: "Do you offer resume review or feedback?",
    answer:
      "Our AI-powered editor provides real-time suggestions to improve your content, highlight key skills, and optimize for specific job descriptions.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onClick,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      <button onClick={onClick} className="w-full text-left py-5 flex items-center gap-4 group">
        <span
          className={`text-xs font-mono transition-colors ${
            isOpen ? "text-blue-400" : "text-gray-600"
          }`}
        >
          0{index + 1}
        </span>
        <span
          className={`flex-1 font-medium text-sm transition-colors ${
            isOpen ? "text-white" : "text-gray-400 group-hover:text-gray-200"
          }`}
        >
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`text-lg transition-colors ${isOpen ? "text-blue-400" : "text-gray-600"}`}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-gray-500 text-sm leading-relaxed pl-8 pb-5">{faq.answer}</p>
      </motion.div>
      {index < faqs.length - 1 && <div className="h-px bg-white/5" />}
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 relative">
      <Aura />

      <div className="max-w-2xl mx-auto relative">
        <SectionTitle label="FAQ" title="Frequently Asked" highlight="Questions" />

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
