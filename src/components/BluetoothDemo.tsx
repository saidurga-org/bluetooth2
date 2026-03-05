import { useEffect, useRef, useState } from "react";
import { Bluetooth, Send } from "lucide-react";

type Message = { from: string; to: string; text: string; ts: number };

const PhoneCard: React.FC<{
  id: string;
  name: string;
  channel: BroadcastChannel | null;
  bluetoothOn: boolean;
  setBluetoothOn: (v: boolean) => void;
  onSend?: (from: string, to: string, text: string) => void;
}> = ({ id, name, channel, bluetoothOn, setBluetoothOn, onSend }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    const bcHandler = (ev: MessageEvent) => {
      const msg = ev.data as Message;
      // deliver to recipient only if bluetooth is on
      if (msg.to === id) {
        if (!bluetoothOn) return;
        setMessages((m) => [...m, msg]);
      } else if (msg.from === id) {
        // if this is a message sent by this device, show it locally
        setMessages((m) => [...m, msg]);
      }
    };

    const windowHandler = (ev: Event) => {
      const c = ev as CustomEvent<Message>;
      const msg = c.detail;
      if (msg.to === id) {
        if (!bluetoothOn) return;
        setMessages((m) => [...m, msg]);
      } else if (msg.from === id) {
        setMessages((m) => [...m, msg]);
      }
    };

    if (channel) channel.addEventListener("message", bcHandler as EventListener);
    window.addEventListener("bt-demo", windowHandler as EventListener);

    return () => {
      if (channel) channel.removeEventListener("message", bcHandler as EventListener);
      window.removeEventListener("bt-demo", windowHandler as EventListener);
    };
  }, [channel, bluetoothOn, id]);

  // sending is handled by parent via onSend; PhoneCard still clears local input

  return (
    <div className="phone-mock p-4 flex flex-col gap-3 bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-3xl shadow-lg w-full max-w-xs mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            <Bluetooth size={18} className={bluetoothOn ? "text-primary" : "opacity-40"} />
          </div>
          <div>
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs text-muted-foreground">Device ID: {id}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground mr-2">Bluetooth</label>
          <input
            type="checkbox"
            checked={bluetoothOn}
            onChange={(e) => setBluetoothOn(e.target.checked)}
            aria-label={`${name} bluetooth`}
          />
        </div>
      </div>

      <div className="flex-1 min-h-[12rem] overflow-auto p-3 bg-black/80 rounded-xl">
        {messages.length === 0 ? (
          <div className="text-xs text-muted-foreground">No messages yet.</div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`mb-2 ${m.from === id ? "text-right" : "text-left"}`}>
              <div className={`inline-block px-3 py-1 rounded-lg ${m.from === id ? "bg-primary/80 ml-auto" : "bg-slate-700 mr-auto"} text-sm` }>
                  <strong className="mr-2">{m.from === id ? "You" : m.from}:</strong>
                  <span>{m.text}</span>
                </div>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2 items-center">
        <input
          className="flex-1 input bg-white/90 text-black rounded px-3 py-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message"
        />
        <button
          className="p-2 rounded-full bg-primary text-white"
          onClick={() => {
            if (!bluetoothOn) return;
            const other = id === "A" ? "B" : "A";
            const body = text.trim();
            if (!body) return;
            onSend?.(id, other, body);
            setText("");
          }}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

const BluetoothDemo: React.FC = () => {
  const [channel, setChannel] = useState<BroadcastChannel | null>(null);
  const [aOn, setAOn] = useState(true);
  const [bOn, setBOn] = useState(true);
  const [pending, setPending] = useState<Message[]>([]);

  // send handler: queue if recipient bluetooth is off, otherwise deliver
  const handleSend = (from: string, to: string, text: string) => {
    const msg: Message = { from, to, text, ts: Date.now() };
    const recipientOn = to === "A" ? aOn : bOn;

    if (recipientOn) {
      try {
        channel?.postMessage(msg);
      } catch (e) {
        // ignore
      }
      window.dispatchEvent(new CustomEvent("bt-demo", { detail: msg }));
    } else {
      // queue for later delivery
      setPending((p) => [...p, msg]);
      // still dispatch locally so sender sees their sent message
      window.dispatchEvent(new CustomEvent("bt-demo", { detail: msg }));
    }
  };

  // flush pending messages for a recipient when they turn bluetooth on
  useEffect(() => {
    if (!aOn) return;
    if (pending.length === 0) return;
    const forA = pending.filter((m) => m.to === "A");
    forA.forEach((msg) => {
      try {
        channel?.postMessage(msg);
      } catch (e) {
        // ignore
      }
      window.dispatchEvent(new CustomEvent("bt-demo", { detail: msg }));
    });
    if (forA.length > 0) setPending((p) => p.filter((m) => m.to !== "A"));
  }, [aOn, channel, pending]);

  useEffect(() => {
    if (!bOn) return;
    if (pending.length === 0) return;
    const forB = pending.filter((m) => m.to === "B");
    forB.forEach((msg) => {
      try {
        channel?.postMessage(msg);
      } catch (e) {
        // ignore
      }
      window.dispatchEvent(new CustomEvent("bt-demo", { detail: msg }));
    });
    if (forB.length > 0) setPending((p) => p.filter((m) => m.to !== "B"));
  }, [bOn, channel, pending]);

  useEffect(() => {
    // create a BroadcastChannel to simulate Bluetooth messages in real-time
    let ch: BroadcastChannel | null = null;
    try {
      ch = new BroadcastChannel("bt-demo");
      setChannel(ch);
    } catch (e) {
      setChannel(null);
    }
    return () => {
      if (ch) ch.close();
    };
  }, []);

  return (
    <section id="bt-demo" className="bg-secondary/5 p-4 rounded">
      <h3 className="text-sm font-semibold mb-2">Real-time Two-Phone Bluetooth Demo</h3>
      <p className="text-xs text-muted-foreground mb-3">Both devices start with Bluetooth ON. Messages are exchanged via a simulated Bluetooth channel in real time.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <PhoneCard id="A" name="Phone A" channel={channel} bluetoothOn={aOn} setBluetoothOn={setAOn} onSend={handleSend} />
        <PhoneCard id="B" name="Phone B" channel={channel} bluetoothOn={bOn} setBluetoothOn={setBOn} onSend={handleSend} />
      </div>
      <p className="text-xs text-muted-foreground mt-3">Note: This demo simulates Bluetooth messaging using the browser's BroadcastChannel API for real-time behavior across components and tabs.</p>
    </section>
  );
};

export default BluetoothDemo;
