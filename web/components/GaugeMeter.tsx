"use client";

import { motion } from "framer-motion";
import { Prediction } from "@/types";

interface GaugeMeterProps {
  confidence: number;
  prediction: Prediction;
}

export default function GaugeMeter({
  confidence,
  prediction,
}: GaugeMeterProps) {
  const radius = 90;
  const stroke = 14;
  const normalized = Math.min(Math.max(confidence, 0), 1);
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - normalized);

  const color = prediction === "fake" ? "var(--danger)" : "var(--success)";
  const label = prediction === "fake" ? "Synthetic Media Detected" : "Authentic Video";

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width="240"
          height="240"
          viewBox="0 0 220 220"
          className="-rotate-90"
        >
          {/* Track */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={stroke}
          />

          {/* Animated progress arc */}
          <motion.circle
            cx="110"
            cy="110"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-[family-name:var(--font-display)] text-5xl font-bold tabular-nums"
            style={{ color }}
          >
            {(normalized * 100).toFixed(1)}%
          </motion.span>
          <span className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Confidence
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6 rounded-full border px-6 py-2 text-sm font-bold uppercase tracking-wider"
        style={{
          color,
          borderColor: color,
          backgroundColor: `${color}15`,
        }}
      >
        {label}
      </motion.div>
    </div>
  );
}
