"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface AnalyzeButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function AnalyzeButton({
  onClick,
  loading,
  disabled,
}: AnalyzeButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className="group relative z-10 mt-6 w-full overflow-hidden rounded-xl bg-accent py-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_40px_-12px_var(--accent-glow)] transition-all hover:shadow-[0_0_60px_-8px_var(--accent-glow)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading && (
        <div className="scan-line pointer-events-none absolute inset-0 z-0 opacity-40" />
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing frames...
          </>
        ) : (
          "Run Detection"
        )}
      </span>
    </motion.button>
  );
}
