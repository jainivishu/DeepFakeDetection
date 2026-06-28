"use client";

import { Shield } from "lucide-react";

const toolLinks = [
  { label: "Video Detection", href: "#detect" },
  { label: "Image Detection", href: "#" },
  { label: "Voice Detection", href: "#" },
];

const aboutLinks = [
  { label: "How It Works", href: "#how-it-works" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href === "#") return;
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-surface/60 py-12 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                <Shield className="h-5 w-5" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-base font-bold uppercase tracking-wider text-foreground">
                DeepFake Detector
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              A free AI-powered deepfake detection tool that identifies
              manipulated videos using trained model 
              on real and synthetic face data.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Detection Tools
            </h4>
            <ul className="space-y-2.5">
              {toolLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`text-sm text-muted transition-colors hover:text-accent ${
                      link.href === "#"
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              About
            </h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted/60">
            © {new Date().getFullYear()} DeepFake Detector. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
