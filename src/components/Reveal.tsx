"use client"; // This tells Next.js this specific component runs in the browser

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
}

export default function Reveal({ children, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // Starts invisible and 40px pushed down
      whileInView={{ opacity: 1, y: 0 }} // Fades in and slides up to its normal spot
      viewport={{ once: true, margin: "-50px" }} // Triggers slightly before scrolling into view. 'once: true' means it only animates the first time you see it.
      transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}