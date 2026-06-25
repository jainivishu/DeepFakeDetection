"use client";

import { motion } from "framer-motion";

interface VideoPreviewProps {
  url: string;
}

export default function VideoPreview({ url }: VideoPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
    >
      <video
        src={url}
        controls
        className="aspect-video w-full object-contain"
        preload="metadata"
      />
    </motion.div>
  );
}
