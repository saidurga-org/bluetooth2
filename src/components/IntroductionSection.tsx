import AnimatedSection from "./AnimatedSection";
import { Radio, Wifi, AlertTriangle, Globe } from "lucide-react";

const points = [
  { icon: Globe, title: "Modern Communication", desc: "Wireless communication is fundamental to modern systems—from IoT to emergency response." },
  { icon: Radio, title: "BLE Advantages", desc: "Bluetooth Low Energy offers low power consumption, wide device support, and standardized protocols." },
  { icon: AlertTriangle, title: "Range Limitation", desc: "Traditional Bluetooth is limited to 10–100 meters, inadequate for large-scale or distributed scenarios." },
  { icon: Wifi, title: "Infrastructure Failure", desc: "During disasters, centralized infrastructure fails. Decentralized, infrastructure-less communication is critical." },
];

const IntroductionSection = () => (
  <section id="introduction" className="bg-secondary/30">
    <div className="section-container">
      <AnimatedSection>
        <p className="text-primary font-mono text-xs tracking-widest uppercase mb-2">Introduction</p>
        <h2 className="section-title">Why This <span className="gradient-text">Matters</span></h2>
        <p className="section-subtitle mb-12">
          Understanding the gaps in existing wireless communication that this project addresses.
        </p>
      </AnimatedSection>
      <div className="grid md:grid-cols-2 gap-6">
        {points.map((p, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="glass-card p-6 flex gap-4 items-start hover-scale">
              <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                <p.icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default IntroductionSection;
