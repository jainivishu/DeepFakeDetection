"use client";

import { motion } from "framer-motion";
import { Zap, Target, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Simple & Free to Use",
    description:
      "No sign-up, no paywalls, no ads. Upload a video and get results in seconds. The tool is designed for speed and accessibility on any device.",
  },
  {
    icon: Target,
    title: "Natural, Accurate Results",
    description:
      "Get a clear real-or-fake verdict plus a confidence score. The model focuses on facial regions and temporal inconsistencies for reliable detection.",
  },
  {
    icon: Globe,
    title: "Real-World Context",
    description:
      "Built for the scenarios where deepfakes cause real harm: viral clips, video calls, impersonation scams, and manipulated news footage.",
  },
  {
    icon: Lock,
    title: "Your Privacy Stays Private",
    description:
      "Uploaded videos are processed locally by your own backend instance. Nothing is stored on external servers, and nothing is used for training.",
  },
];

export default function WhyChoose() {
  return (
    <section className="section-pad w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="section-heading">
            Why Thousands Trust Our Detection Tool
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Fast, transparent, and built with privacy in mind.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-hover rounded-2xl border border-white/10 bg-surface/60 p-6 md:p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-display)] text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
