"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  label?: string;
}

export default function ProgressBar({
  progress,
  label = "Uploading...",
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="relative z-10 mt-6">
      <div className="mb-2 flex justify-between text-xs uppercase tracking-wider text-muted">
        <span>{label}</span>
        <span className="font-[family-name:var(--font-code)] text-foreground">
          {clamped}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.3 }}
          className="h-full rounded-full bg-accent shadow-[0_0_16px_var(--accent-glow)]"
        />
      </div>
    </div>
  );
}
