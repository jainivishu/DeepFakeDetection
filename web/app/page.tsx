"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ShieldCheck } from "lucide-react";

import Hero from "@/components/Hero";
import UploadZone from "@/components/UploadZone";
import VideoPreview from "@/components/VideoPreview";
import AnalyzeButton from "@/components/AnalyzeButton";
import ProgressBar from "@/components/ProgressBar";
import ResultCard from "@/components/ResultCard";

import { detectDeepfake } from "@/lib/api";
import { Status, DetectionResult, Prediction } from "@/types";

export default function Home() {
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

      // Backend already returns confidence for the predicted class
      const prediction: Prediction =
        data.prediction === "fake" ? "fake" : "real";
      const confidence = data.confidence;

      setResult({ prediction, confidence });
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
    <main className="relative z-10 flex min-h-screen flex-col items-center px-4 pb-20 sm:px-6 lg:px-8">
      <Hero />

      <section className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {status !== "result" && (
            <motion.div
              key="upload-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glow-card rounded-3xl border border-white/10 bg-surface/60 p-6 backdrop-blur-xl md:p-10"
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
                    uploadProgress < 100 ? "Uploading video..." : "Scanning frames..."
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
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-wide">
                  Analysis Complete
                </h2>
              </div>

              <ResultCard result={result} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="relative z-10 mt-16 text-center text-xs text-muted/50">
        <p>CNN + LSTM DeepFake Detection Pipeline</p>
        <p className="mt-1">Frontend demo running against a dummy model.</p>
      </footer>
    </main>
  );
}
