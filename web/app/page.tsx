import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DetectionTool from "@/components/DetectionTool";
import HowToUse from "@/components/HowToUse";
import UseCases from "@/components/UseCases";
import WhyChoose from "@/components/WhyChoose";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <DetectionTool />
      <div className="section-divider" />
      <HowToUse />
      <div className="section-divider" />
      <UseCases />
      <div className="section-divider" />
      <WhyChoose />
      <FinalCTA />
      <Footer />
    </main>
  );
}
