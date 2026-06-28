"use client";

import { motion } from "framer-motion";

const cases = [
  {
    image: "/images/image-1.jpeg",
    title: "Teachers Spotting Fake Historical Footage",
    description:
      "Educators upload archival-style clips and classroom media to show students how synthetic video can rewrite history. The model highlights facial inconsistencies, sparking conversations about digital literacy.",
  },
  {
    image: "/images/image-2.jpeg",
    title: "Journalists Verifying Viral Videos",
    description:
      "Before publishing, reporters run suspicious clips through the detector to confirm authenticity. The confidence score gives their editorial team a quick signal for further verification.",
  },
  {
    image: "/images/image-3.jpeg",
    title: "Creators Protecting Their Identity",
    description:
      "Streamers and YouTubers use the tool to find unauthorized deepfakes impersonating them. A fast check lets creators flag fake endorsements or scam clips before they spread.",
  },
  {
    image: "/images/image-4.jpeg",
    title: "Families Checking Suspicious Calls",
    description:
      "When a video message from a loved one looks or sounds off, families run a quick analysis. The clear real-or-fake verdict helps stop social-engineering fraud before any money leaves.",
  },
];

export default function UseCases() {
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
          className="mb-12 text-center"
        >
          <h2 className="section-heading">Who Uses DeepFake Detection?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Built for anyone who needs to trust what they watch.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {cases.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col gap-6 lg:flex-row lg:items-center ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="flex-1">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[4/3] w-full rounded-2xl object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl font-bold text-foreground md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-muted">
                    {item.description}
                  </p>
                  <button
                    onClick={scrollToDetect}
                    className="mt-5 inline-flex text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                  >
                    Try Deepfake Detection →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
