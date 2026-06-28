"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is deepfake detection?",
    answer:
      "Deepfake detection identifies AI-generated or digitally manipulated videos. Our tool analyzes facial features, temporal consistency, and visual artifacts to decide whether a clip is authentic or synthetic.",
  },
  {
    question: "How does the detection work?",
    answer:
      "The pipeline first detects faces with MTCNN, crops them to a fixed size, extracts 10 representative frames, then feeds them to a trained Model on real and fake videos.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "The current model accepts MP4, MOV, and AVI video files up to 100 MB. Image and audio modes are planned for a future release.",
  },
  {
    question: "How accurate is the model?",
    answer:
      "The model architecture typically reaches 95%+ accuracy on common face-swap datasets. Results are presented as a real-or-fake prediction with a confidence score.",
  },
  {
    question: "Are my uploads stored anywhere?",
    answer:
      "No. If you run your own backend, files are processed in memory and discarded immediately after inference. We do not collect or train on user uploads.",
  },
  {
    question: "Can I download a report?",
    answer:
      "The current UI shows the prediction and confidence score in the result card. A downloadable PDF report can be added as a follow-up feature if needed.",
  },
  {
    question: "Why does analysis take ~15 seconds?",
    answer:
      "MTCNN face detection, frame extraction, and model inference each take several seconds on a CPU. GPU acceleration or quantization would speed this up significantly.",
  },
  {
    question: "What should I do if the result seems wrong?",
    answer:
      "Check that the subject&apos;s face is clearly visible and that the video resolution is reasonable. The model is most reliable on frontal faces with good lighting.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section-pad w-full">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="mt-3 text-muted">
            Everything you need to know about how the detector works.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`overflow-hidden rounded-xl border transition-colors ${
                  isOpen
                    ? "border-accent/30 bg-accent/5"
                    : "border-white/10 bg-surface/60 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-foreground">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
