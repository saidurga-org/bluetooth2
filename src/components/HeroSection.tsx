import MeshBackground from "./MeshBackground";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
    <MeshBackground />
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-6">
          Infrastructure-less Decentralized Communication Framework
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
          <span className="text-primary-foreground">Bluetooth </span>
          <span className="gradient-text">Multi-Hop</span>
          <br />
          <span className="text-primary-foreground">Mesh Communication</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-4 font-light">
          Extending Bluetooth Beyond Its Limits
        </p>
        <p className="text-sm md:text-base text-primary-foreground/40 max-w-xl mx-auto mb-10">
          A decentralized system that extends Bluetooth range using multi-hop relay nodes—enabling communication without internet or infrastructure.
        </p>
        <a
          href="#bt-demo"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
        >
          View Project
          <ChevronDown size={16} />
        </a>
      </motion.div>
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
      <ChevronDown className="text-primary-foreground/30" size={24} />
    </div>
  </section>
);

export default HeroSection;
