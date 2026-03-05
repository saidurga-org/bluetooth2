import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroductionSection from "@/components/IntroductionSection";
import BluetoothDemo from "@/components/BluetoothDemo";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <IntroductionSection />
    <BluetoothDemo />
    <FooterSection />
  </div>
);

export default Index;
