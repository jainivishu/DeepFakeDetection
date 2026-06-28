"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ShieldCheck, Image, Mic, Video } from "lucide-react";

import UploadZone from "./UploadZone";
import VideoPreview from "./VideoPreview";
import AnalyzeButton from "./AnalyzeButton";
import ProgressBar from "./ProgressBar";
import ResultCard from "./ResultCard";

import { detectDeepfake } from "@/lib/api";
import { Status, DetectionResult, Prediction } from "@/types";

const tabs = [
  { id: "video", label: "Video", icon: Video },
  { id: "image", label: "Image", icon: Image },
  { id: "voice", label: "Voice", icon: Mic },
];

export default function DetectionTool() {
  const [activeTab, setActiveTab] = useState("video");
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((selected: File) => {
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setStatus("preview");
    setResult(null);
    setError(null);
  }, []);

  const handleAnalyze = async () => {
    if (!file) return;

    setStatus("analyzing");
    setUploadProgress(0);
    setError(null);

    try {
      const data = await detectDeepfake(file, setUploadProgress);
      const prediction: Prediction =
        data.prediction === "fake" ? "fake" : "real";
      setResult({ prediction, confidence: data.confidence });
      setStatus("result");
    } catch (err) {
      setStatus("preview");
      setError(
        err instanceof Error
          ? err.message
          : "Could not reach the detection server. Is it running on port 8000?"
      );
    }
  };

  const handleReset = useCallback(() => {
    setStatus("idle");
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setUploadProgress(0);
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <section id="detect" className="section-pad w-full">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Try It Now
          </h2>
          <p className="mt-3 text-muted">
            Drop a video below to run the trained analysis.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glow-card rounded-3xl border border-white/10 bg-surface/60 backdrop-blur-xl"
        >
          <div className="flex border-b border-white/10">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const isDisabled = tab.id !== "video";
              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && setActiveTab(tab.id)}
                  disabled={isDisabled}
                  className={`group relative flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-foreground"
                      : isDisabled
                        ? "cursor-not-allowed text-muted/40"
                        : "text-muted hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.id !== "video" && (
                    <span className="ml-1 rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted/60">
                      Soon
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-accent shadow-[0_0_12px_var(--accent-glow)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              {status !== "result" && (
                <motion.div
                  key="upload-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <UploadZone
                    onFileSelect={handleFileSelect}
                    selectedFile={file}
                    disabled={status === "analyzing"}
                  />

                  {previewUrl && <VideoPreview url={previewUrl} />}

                  {status === "analyzing" && (
                    <ProgressBar
                      progress={uploadProgress}
                      label={
                        uploadProgress < 100
                          ? "Uploading video..."
                          : "Scanning frames..."
                      }
                    />
                  )}

                  <AnalyzeButton
                    onClick={handleAnalyze}
                    loading={status === "analyzing"}
                    disabled={!file}
                  />

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
                    >
                      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {status === "result" && result && (
                <motion.div
                  key="result-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-6 flex items-center justify-center gap-3 text-center">
                    {result.prediction === "fake" ? (
                      <ShieldAlert className="h-6 w-6 text-danger" />
                    ) : (
                      <ShieldCheck className="h-6 w-6 text-success" />
                    )}
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-wide">
                      Analysis Complete
                    </h3>
                  </div>

                  <ResultCard result={result} onReset={handleReset} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
