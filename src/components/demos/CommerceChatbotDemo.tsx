import {
  Bot,
  CheckCircle2,
  Code2,
  MessageCircle,
  QrCode,
  Send,
  Sparkles,
  User,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

interface ChatMessage {
  id: string;
  sender: "user" | "bot" | "system";
  text: string;
  qrImage?: boolean;
  catalogCard?: boolean;
  time: string;
}

export function CommerceChatbotDemo() {
  const { lang } = useLang();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "สวัสดีครับ! ยินดีต้อนรับสู่ AI Assistant มีอะไรให้ผมช่วยดูแลวันนี้ไหมครับ?",
      time: "16:40",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "pipeline">("chat");
  const [adminEscalated, setAdminEscalated] = useState(false);
  const [lastIntent, setLastIntent] = useState("GREETING_INTENT");

  const sendQuery = (text: string, intent = "CUSTOM_INQUIRY") => {
    if (!text || isTyping) return;

    const userNow = new Date();
    const userTime = userNow.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    // User message
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text, time: userTime },
    ]);
    setInputVal("");
    setIsTyping(true);
    setLastIntent(intent);

    const typingDelay = Math.floor((text.length * 40) % 600) + 300; // 300-900ms

    setTimeout(() => {
      let botReply = "";
      let hasQr = false;
      let hasCatalog = false;

      if (intent === "CATALOG_INQUIRY" || text.includes("สินค้า") || text.includes("ราคา")) {
        botReply = "ได้เลยครับ! นี่คือรายการสินค้าขายดีพร้อมโปรโมชั่นประจำสัปดาห์ที่เราคัดสรรมาให้ ✨ คุณลูกค้าสนใจชิ้นไหนสามารถพิมพ์ชื่อสินค้าเพื่อสั่งซื้อ หรือถ้าต้องการคำแนะนำเพิ่มเติมบอกผมได้ตลอดเลยนะครับ ผมยินดีให้บริการครับ";
        hasCatalog = true;
      } else if (intent === "PAYMENT_INQUIRY" || text.includes("บัญชี") || text.includes("โอน") || text.includes("QR")) {
        botReply = "เพื่อความสะดวก คุณลูกค้าสามารถสแกนชำระผ่าน PromptPay QR Code ด้านล่างนี้ หรือโอนเข้าบัญชีธนาคารกสิกรไทย 123-4-56789-0 (ชื่อบัญชี บริษัท อนันต์ เทค จำกัด) ได้เลยครับ 💸 เมื่อโอนเรียบร้อยแล้ว รบกวนแนบสลิปผ่านทางแชทนี้เพื่อยืนยันการทำรายการด้วยนะครับ ขอบพระคุณมากครับ";
        hasQr = true;
      } else if (intent === "STORAGE_INQUIRY" || text.includes("เก็บ") || text.includes("รักษา")) {
        botReply = "สำหรับคำแนะนำการเก็บรักษานะครับ: ควรนำเข้าแช่ในตู้เย็นอุณหภูมิ 2-6°C ทันทีหลังจากได้รับสินค้า เพื่อคงความสดใหม่และรสชาติที่ดีที่สุดครับ ❄️ หากเก็บตามคำแนะนำจะสามารถเก็บได้นานถึง 14 วันเลยครับ มีข้อสงสัยเพิ่มเติมสอบถามได้เลยนะครับ";
      } else if (intent === "ADMIN_ESCALATION" || text.includes("แอดมิน") || text.includes("คน")) {
        botReply = "รับทราบครับผม! เข้าใจแล้วครับ เดี๋ยวผมจะทำการโอนสายเคสนี้ไปยังทีมแอดมินเจ้าหน้าที่ให้ดูแลต่อนะครับ 👨‍💼 เจ้าหน้าที่จะเข้ามาอ่านและตอบกลับภายใน 1-3 นาทีครับ ระหว่างนี้คุณลูกค้าสามารถทิ้งข้อความเพิ่มเติมไว้ได้เลยครับ";
        setAdminEscalated(true);
      } else {
        botReply = "ผมได้รับข้อความของคุณลูกค้าเรียบร้อยแล้วครับ 😊 หากต้องการสั่งซื้อสินค้า ดูโปรโมชั่น สอบถามวิธีเก็บรักษา หรือต้องการความช่วยเหลือด้านอื่น ๆ สามารถเลือกเมนูด้านล่างหรือพิมพ์บอกผมได้เลยนะครับ";
      }

      const botNow = new Date(userNow.getTime() + typingDelay + 1000);
      const botTime = botNow.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: botReply,
          qrImage: hasQr,
          catalogCard: hasCatalog,
          time: botTime,
        },
      ]);
      setIsTyping(false);
    }, typingDelay);
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/[0.08] bg-white text-[#1d1d1f] shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] bg-[#f5f5f7] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0071e3] text-white">
              <Bot className="h-5 w-5" />
            </span>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-[#1d1d1f]">AI Commerce Chatbot</h3>
              {adminEscalated ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-800">
                  <UserCheck className="h-3 w-3" /> Staff Notified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-800">
                  <CheckCircle2 className="h-3 w-3" /> n8n Bot Active
                </span>
              )}
            </div>
            <p className="text-xs text-[#6e6e73]">
              {lang === "th"
                ? "จำลองระบบแชทตอบลูกค้าอัตโนมัติพร้อมเงื่อนไขโอนสายแอดมิน"
                : "Multi-channel automated sales & support workflow simulator"}
            </p>
          </div>
        </div>

        <div className="inline-flex rounded-full border border-black/[0.08] bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
              activeTab === "chat" ? "bg-[#0071e3] text-white shadow-sm" : "text-[#6e6e73] hover:text-[#1d1d1f]"
            }`}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Chat View</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pipeline")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
              activeTab === "pipeline" ? "bg-[#0071e3] text-white shadow-sm" : "text-[#6e6e73] hover:text-[#1d1d1f]"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Pipeline Inspector</span>
          </button>
        </div>
      </div>

      {activeTab === "chat" ? (
        <div className="grid lg:grid-cols-12">
          {/* Quick Scenario Sidebar */}
          <div className="border-b border-black/[0.08] bg-[#fbfbfd] p-5 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
              {lang === "th" ? "เลือกสถานการณ์ทดสอบด่วน:" : "Quick Test Scenarios:"}
            </p>
            <div className="mt-3 space-y-2">
              {[
                {
                  label: "📦 ขอดูรายการสินค้า & ราคา",
                  query: "ขอดูรายการสินค้าและราคาโปรโมชั่นหน่อยครับ",
                  intent: "CATALOG_INQUIRY",
                },
                {
                  label: "💳 ขอเลขบัญชี & QR ชำระเงิน",
                  query: "ขอเลขบัญชีพร้อม QR สแกนจ่ายด้วยครับ",
                  intent: "PAYMENT_INQUIRY",
                },
                {
                  label: "❄️ สอบถามวิธีเก็บรักษา",
                  query: "สินค้าเก็บได้กี่วันและต้องแช่ตู้เย็นไหมครับ",
                  intent: "STORAGE_INQUIRY",
                },
                {
                  label: "👨‍💼 ขอคุยกับแอดมินคนจริง",
                  query: "ขอติดต่อเจ้าหน้าที่หรือแอดมินหน่อยครับ",
                  intent: "ADMIN_ESCALATION",
                },
              ].map((s) => (
                <button
                  key={s.intent}
                  type="button"
                  onClick={() => sendQuery(s.query, s.intent)}
                  className="flex w-full items-center justify-between rounded-xl border border-black/[0.08] bg-white p-2.5 text-left text-xs font-medium text-[#1d1d1f] shadow-sm transition hover:border-[#0071e3] hover:bg-[#0071e3]/5 hover:text-[#0071e3]"
                >
                  <span>{s.label}</span>
                  <Sparkles className="h-3.5 w-3.5 text-[#0071e3]" />
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-black/[0.06] bg-white p-3 text-[11px] text-[#6e6e73]">
              <p className="font-semibold text-[#1d1d1f]">⚙️ System Flow in Action:</p>
              <p className="mt-1">
                Webhook ➔ n8n Filter ➔ Intent Match: <code className="font-mono font-bold text-[#0071e3]">{lastIntent}</code>
              </p>
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex h-[420px] flex-col justify-between p-5 lg:col-span-8">
            <div className="space-y-4 overflow-y-auto pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                      msg.sender === "user" ? "bg-[#1d1d1f] text-white" : "bg-[#0071e3] text-white"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </span>

                  <div className={`max-w-[75%] space-y-2 ${msg.sender === "user" ? "items-end" : ""}`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#0071e3] text-white"
                          : "border border-black/[0.08] bg-[#f5f5f7] text-[#1d1d1f]"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.catalogCard && (
                      <div className="grid grid-cols-2 gap-2 rounded-xl border border-black/[0.08] bg-white p-2.5 shadow-sm">
                        <div className="rounded-lg bg-[#f5f5f7] p-2 text-center">
                          <div className="mb-2 h-16 w-full rounded bg-[#e1e1e1] flex items-center justify-center text-xl">🥗</div>
                          <p className="font-bold text-[#1d1d1f] text-[10px]">Set A · Starter Pack</p>
                          <p className="font-mono text-xs font-semibold text-[#0071e3]">฿390.-</p>
                        </div>
                        <div className="rounded-lg bg-[#f5f5f7] p-2 text-center">
                          <div className="mb-2 h-16 w-full rounded bg-[#e1e1e1] flex items-center justify-center text-xl">🍱</div>
                          <p className="font-bold text-[#1d1d1f] text-[10px]">Set B · Pro Bundle</p>
                          <p className="font-mono text-xs font-semibold text-[#0071e3]">฿690.-</p>
                        </div>
                        <div className="rounded-lg bg-[#f5f5f7] p-2 text-center">
                          <div className="mb-2 h-16 w-full rounded bg-[#e1e1e1] flex items-center justify-center text-xl">🍣</div>
                          <p className="font-bold text-[#1d1d1f] text-[10px]">Set C · Premium Box</p>
                          <p className="font-mono text-xs font-semibold text-[#0071e3]">฿990.-</p>
                        </div>
                        <div className="rounded-lg bg-[#f5f5f7] p-2 text-center">
                          <div className="mb-2 h-16 w-full rounded bg-[#e1e1e1] flex items-center justify-center text-xl">🍰</div>
                          <p className="font-bold text-[#1d1d1f] text-[10px]">Dessert Add-on</p>
                          <p className="font-mono text-xs font-semibold text-[#0071e3]">฿150.-</p>
                        </div>
                      </div>
                    )}

                    {msg.qrImage && (
                      <div className="inline-flex flex-col items-center rounded-xl border border-black/[0.08] bg-white p-3 shadow-sm">
                        <QrCode className="h-16 w-16 text-[#1d1d1f]" />
                        <p className="mt-1 font-mono text-[10px] font-semibold text-[#0071e3]">
                          PromptPay 082-XXX-XXXX
                        </p>
                      </div>
                    )}

                    <p className="text-[10px] text-[#86868b]">{msg.time}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-[#86868b]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0071e3] text-white">
                    <Bot className="h-3 w-3" />
                  </span>
                  <span className="italic">AI Assistant is typing response...</span>
                </div>
              )}
            </div>

            {/* Input box */}
            <div className="mt-4 flex gap-2 border-t border-black/[0.08] pt-3">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendQuery(inputVal);
                }}
                placeholder="Type customer message or select quick scenario..."
                className="flex-1 rounded-full border border-black/[0.1] bg-[#fbfbfd] px-4 py-2 text-xs text-[#1d1d1f] focus:border-[#0071e3] focus:outline-none focus:ring-1 focus:ring-[#0071e3]"
              />
              <button
                type="button"
                onClick={() => sendQuery(inputVal)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0071e3] text-white shadow transition hover:bg-[#0055b3]"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Pipeline Inspector View */
        <div className="bg-[#0d1117] p-6 font-mono text-xs text-white">
          <p className="text-[#2997ff]">// Live n8n Architecture Telemetry Payload</p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-4 text-emerald-400">
            {JSON.stringify(
              {
                webhook_event: "messenger_message_received",
                timestamp: new Date().toISOString(),
                routing_engine: "n8n-workflow-v3",
                intent_classification: lastIntent,
                confidence_score: 0.984,
                catalog_lookup_cache: "HIT (Google Sheets API)",
                human_escalation_flag: adminEscalated,
                response_strategy: adminEscalated ? "ESCALATE_TO_SLACK_AND_HUMAN" : "AUTO_REPLY_STREAM",
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
