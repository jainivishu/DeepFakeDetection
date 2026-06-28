"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function Testimonial() {
  return (
    <section className="section-pad w-full">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glow-card relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-8 backdrop-blur-xl md:p-12"
        >
          <Quote className="absolute right-8 top-8 h-16 w-16 text-accent/10" />

          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <blockquote className="relative z-10 text-lg font-medium leading-relaxed text-foreground md:text-xl">
              &ldquo;I used DeepFake Detector during a lesson on media literacy.
              My students uploaded clips from the web and were shocked by how
              many showed synthetic faces. The results came fast, and the
              confidence score was easy enough for my students to understand. I
              now use it in every digital-citizenship unit.&rdquo;
            </blockquote>

            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-cyan-600/40 text-lg font-bold text-foreground">
                EH
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] font-bold text-foreground">
                  Emily Harper
                </p>
                <p className="text-sm text-muted">
                  High School History Teacher
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
