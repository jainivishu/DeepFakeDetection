"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FinalCTA() {
  const scrollToDetect = () => {
    const el = document.getElementById("detect");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="section-pad w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-surface/80 to-cyan-900/10 p-8 text-center md:p-14"
        >
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-accent" />
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground md:text-4xl">
              Free Online Deepfake Detection at Your Fingertips
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Start using our AI deepfake detection tool today. It&apos;s fast,
              transparent, and made for everyone.
            </p>
            <button
              onClick={scrollToDetect}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_40px_-12px_var(--accent-glow)] transition-all hover:shadow-[0_0_60px_-8px_var(--accent-glow)]"
            >
              Try Deepfake Detection Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
