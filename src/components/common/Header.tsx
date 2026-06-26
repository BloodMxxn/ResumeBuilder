import { Origami, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function Header() {
  const { scrollY } = useScroll();

  const wHeader = useTransform(scrollY, [0, 100], ["56rem", "38rem"]);
  const yHeader = useTransform(scrollY, [0, 100], [0, 15]);
  const borderHeader = useTransform(scrollY, [0, 100], ["#00000000", "#6a728233"]);
  const blurHeader = useTransform(scrollY, [0, 100], ["none", "blur(16px)"]);

  return (
    <header className="flex justify-center">
      <div className="h-16"></div>
      <motion.div className="fixed w-full px-4 z-50">
        <motion.div
          className="max-w-4xl h-16 mx-auto px-4 flex items-center justify-between rounded-full border"
          style={{
            maxWidth: wHeader,
            y: yHeader,
            borderColor: borderHeader,
            backdropFilter: blurHeader,
          }}
        >
          <div className="flex items-center gap-2">
            <Button size={"icon-md"}>
              <Origami />
            </Button>
            <Link to="/" className="font-semibold text-white text-lg">
              Resume
            </Link>
          </div>

          <Button to="/build/minimal">
            <Sparkles size={16} />
            Start Now
          </Button>
        </motion.div>
      </motion.div>
    </header>
  );
}
