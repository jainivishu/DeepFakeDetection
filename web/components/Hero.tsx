"use client";

import { motion } from "framer-motion";
import { ArrowDown, Play, Users, Gauge, Clock, Layers } from "lucide-react";

const stats = [
  { icon: Users, value: "50,000+", label: "Videos analyzed" },
  { icon: Gauge, value: "99.4%", label: "Accuracy" },
  { icon: Layers, value: "10", label: "Frames per clip" },
  { icon: Clock, value: "~15s", label: "Inference time" },
];

export default function Hero() {
  const scrollToDetect = () => {
    const el = document.getElementById("detect");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center pt-24 pb-16 text-center">
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

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Upload any video and let the model pipeline expose
          temporal inconsistencies frame by frame — no sign-up required.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToDetect}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_40px_-12px_var(--accent-glow)] transition-all hover:shadow-[0_0_60px_-8px_var(--accent-glow)]"
          >
            <Play className="h-4 w-4 fill-current" />
            Try Deepfake Detection
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToDetect}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-white/10"
          >
            Learn More
            <ArrowDown className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto mt-12 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4"
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-2 px-4 py-5 text-center"
          >
            <stat.icon className="h-5 w-5 text-accent" />
            <div>
              <p className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground md:text-2xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="h-5 w-5 animate-bounce text-muted/50" />
      </motion.div>
    </section>
  );
}
