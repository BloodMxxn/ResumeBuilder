import FAQ from "./_components/FAQ";
import CTA from "./_components/CTA";
import Hero from "./_components/Hero";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Features from "./_components/Features";
import ScrollHint from "./_components/ScrollHint";
import HowItWorks from "./_components/HowItWorks";
import Testimonials from "./_components/Testimonials";
import GridBackground from "../../components/GridBackground";

import useViewportHeight from "../../hooks/useViewportHeight";

export default function Home() {
  const height = useViewportHeight();

  return (
    <div className="relative overflow-hidden isolate">
      <GridBackground />
      <div className="flex flex-col justify-between" style={{ minHeight: `${height}px` }}>
        <Header />
        <Hero />
        <ScrollHint />
      </div>

      <Features />
      <HowItWorks />
      <FAQ />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
