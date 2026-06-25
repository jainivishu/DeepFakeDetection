"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Film, AlertCircle } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  disabled: boolean;
}

const MAX_SIZE_MB = 100;

export default function UploadZone({
  onFileSelect,
  selectedFile,
  disabled,
}: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (file: File): boolean => {
    setError(null);

    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file (MP4, MOV, AVI, etc.).");
      return false;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Maximum allowed size is ${MAX_SIZE_MB} MB.`);
      return false;
    }

    return true;
  };

  const handleFile = (file: File | undefined) => {
    if (!file || disabled) return;
    if (validate(file)) {
      onFileSelect(file);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative z-10 w-full"
    >
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={[
          "group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 md:p-12",
          dragActive
            ? "border-accent bg-accent/10 shadow-[0_0_40px_-12px_var(--accent-glow)]"
            : "border-white/10 bg-surface/40 hover:border-accent/40 hover:bg-surface/60",
          disabled && "pointer-events-none opacity-60",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          hidden
          onChange={handleChange}
          disabled={disabled}
        />

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20 transition-transform duration-300 group-hover:scale-110">
          {selectedFile ? (
            <Film className="h-7 w-7" />
          ) : (
            <UploadCloud className="h-7 w-7" />
          )}
        </div>

        <p className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-wide text-foreground">
          {selectedFile ? selectedFile.name : "Drop your video here"}
        </p>

        <p className="mt-2 text-sm text-muted">
          {selectedFile
            ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
            : "Or click to browse MP4, MOV, AVI files"}
        </p>

        {!selectedFile && (
          <p className="mt-4 text-xs text-muted/60">
            Maximum file size: {MAX_SIZE_MB} MB
          </p>
        )}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </motion.div>
      )}
    </motion.div>
  );
}
