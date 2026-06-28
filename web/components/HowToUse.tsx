"use client";

import { motion } from "framer-motion";
import { Upload, BrainCircuit, BarChart3, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your File",
    description:
      "Drag and drop a video or click to browse. We support MP4, MOV, and AVI files up to 100 MB — no account required.",
  },
  {
    icon: BrainCircuit,
    title: "Let AI Do the Work",
    description:
      "MTCNN detects faces, then model scans 10 cropped frames for temporal inconsistencies and synthetic artifacts.",
  },
  {
    icon: BarChart3,
    title: "View the Results",
    description:
      "Get a clear prediction (real or fake) with a confidence score and a short summary explaining what the model found.",
  },
  {
    icon: Download,
    title: "Download or Share",
    description:
      "Save the result for your records or share it with your team. Fast, transparent, and completely free to use.",
  },
];

export default function HowToUse() {
  const scrollToDetect = () => {
    const el = document.getElementById("detect");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="how-it-works" className="section-pad w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="section-heading">How to Use Deepfake Detection</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            It&apos;s simple. Follow these four steps to check if a video is
            real or AI-manipulated.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-hover relative rounded-2xl border border-white/10 bg-surface/60 p-6"
            >
              <div className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                {idx + 1}
              </div>
              <div className="mb-5 mt-2 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-display)] text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <button
            onClick={scrollToDetect}
            className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-accent transition-all hover:bg-accent/20"
          >
            Try Deepfake Detection Now
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
