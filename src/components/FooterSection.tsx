import { Bluetooth } from "lucide-react";

const FooterSection = () => (
  <footer className="border-t border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Bluetooth size={18} className="text-primary" />
            <span className="font-display text-sm font-bold gradient-text">BLE MESH</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Bluetooth Multi-Hop Mesh Communication System — an academic research project exploring decentralized communication.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">Institution</h4>
          <p className="text-xs text-muted-foreground">Kshatriya College of Engineering</p>
          
        </div>
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">A4</h4>
          <p className="text-xs text-muted-foreground">B Spandana </p>
          <p className="text-xs text-muted-foreground">A Sathvika</p>
          <p className="text-xs text-muted-foreground">B Aravind</p>
          <p className="text-xs text-muted-foreground">Ch Rahul</p>
          <p className="text-xs text-muted-foreground mt-2">Contact: spandana@gmail.com</p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">© 2026 BLE Mesh Communication Project. Academic Use Only.</p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
