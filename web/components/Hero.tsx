"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <header className="relative z-10 pt-16 pb-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <span className="mb-5 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
          <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Forensic AI Lab
        </span>

        <h1 className="font-[family-name:var(--font-display)] text-5xl font-black uppercase tracking-tighter text-gradient sm:text-6xl md:text-7xl lg:text-8xl">
          DeepFake
          <br />
          Detector
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
          Upload any video and let the CNN + LSTM pipeline expose temporal
          inconsistencies frame by frame.
        </p>
      </motion.div>
    </header>
  );
}
