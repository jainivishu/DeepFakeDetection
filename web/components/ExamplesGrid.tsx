"use client";

import { motion } from "framer-motion";
import {
  UserCircle,
  ImageIcon,
  FileText,
  Video,
  Newspaper,
  Phone,
} from "lucide-react";

const examples = [
  {
    icon: UserCircle,
    title: "Social Media Profile",
    score: 89,
    gradient: "from-rose-500/20 via-purple-500/20 to-blue-500/20",
    iconColor: "text-rose-400",
  },
  {
    icon: ImageIcon,
    title: "Parade Images",
    score: 45,
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: FileText,
    title: "Financial Document",
    score: 31,
    gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Video,
    title: "Video Calls",
    score: 67,
    gradient: "from-indigo-500/20 via-violet-500/20 to-fuchsia-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: Newspaper,
    title: "News Media",
    score: 15,
    gradient: "from-sky-500/20 via-blue-500/20 to-indigo-500/20",
    iconColor: "text-sky-400",
  },
  {
    icon: Phone,
    title: "Scam Calls",
    score: 22,
    gradient: "from-lime-500/20 via-green-500/20 to-emerald-500/20",
    iconColor: "text-lime-400",
  },
];

export default function ExamplesGrid() {
  return (
    <section id="examples" className="section-pad w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="section-heading">Different Deepfake Detection</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Our CNN + LSTM pipeline spots manipulated faces across many
            real-world scenarios — from viral clips to suspicious calls.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="card-hover group overflow-hidden rounded-2xl border border-white/10 bg-surface/60"
            >
              <div
                className={`gradient-placeholder flex aspect-video items-center justify-center bg-gradient-to-br ${item.gradient}`}
              >
                <item.icon
                  className={`h-12 w-12 transition-transform duration-300 group-hover:scale-110 ${item.iconColor}`}
                />
              </div>
              <div className="flex items-center justify-between p-5">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <span className="rounded-full bg-danger/10 px-3 py-1 text-sm font-bold text-danger">
                  {item.score}%
                </span>
              </div>
              <div className="px-5 pb-5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.08 }}
                    className="h-full rounded-full bg-danger"
                  />
                </div>
                <p className="mt-2 text-right text-xs text-muted">
                  Deepfake probability
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
