import type { Metadata } from "next";
import { Orbitron, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const sora = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "DeepFake Detector",
  description: "Detect AI-manipulated videos with a CNN + LSTM pipeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${sora.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="relative min-h-screen overflow-x-hidden">
        <div className="ambient-glow" />
        <div className="scanlines" />
        {children}
      </body>
    </html>
  );
}
