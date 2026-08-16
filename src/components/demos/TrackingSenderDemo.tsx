import {
  AlertTriangle,
  Check,
  CheckCircle2,
  FileSpreadsheet,
  MessageSquare,
  RefreshCw,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

interface OrderRow {
  id: string;
  orderNumber: string;
  customerName: string;
  channel: "LINE" | "Messenger";
  trackingCode: string;
  courier: string;
  status: "Pending" | "Sent" | "Error";
  sentAt?: string;
}

const initialOrders: OrderRow[] = [
  {
    id: "1",
    orderNumber: "TH-8921",
    customerName: "คุณสมชาย วงศ์สวัสดิ์",
    channel: "LINE",
    trackingCode: "KEX892019482TH",
    courier: "Kerry Express",
    status: "Pending",
  },
  {
    id: "2",
    orderNumber: "TH-8922",
    customerName: "คุณนิภาภรณ์ แสงจันทร์",
    channel: "LINE",
    trackingCode: "TH0101828372Z",
    courier: "Flash Express",
    status: "Pending",
  },
  {
    id: "3",
    orderNumber: "TH-8923",
    customerName: "คุณธนกร สิทธิชัย",
    channel: "Messenger",
    trackingCode: "ED102938475TH",
    courier: "Thailand Post",
    status: "Sent",
    sentAt: "14:15:02",
  },
  {
    id: "4",
    orderNumber: "TH-8924",
    customerName: "คุณวรินทร ใจดี",
    channel: "LINE",
    trackingCode: "821948572019",
    courier: "J&T Express",
    status: "Pending",
  },
  {
    id: "5",
    orderNumber: "TH-8925",
    customerName: "คุณกิตติศักดิ์ เจริญทรัพย์",
    channel: "Messenger",
    trackingCode: "NVSHP029384",
    courier: "Ninja Van",
    status: "Error",
  },
  {
    id: "6",
    orderNumber: "TH-8926",
    customerName: "คุณศิริพร งามเลิศ",
    channel: "LINE",
    trackingCode: "BEST9028374",
    courier: "Best Express",
    status: "Pending",
  },
];

export function TrackingSenderDemo() {
  const { lang } = useLang();
  const [orders, setOrders] = useState<OrderRow[]>(initialOrders);
  const [selectedId, setSelectedId] = useState<string>("1");
  const [isSending, setIsSending] = useState(false);
  const [template, setTemplate] = useState(
    "เรียนคุณ {customer_name},\nทางร้านได้จัดส่งพัสดุสำหรับคำสั่งซื้อ #{order_id} เรียบร้อยแล้วครับ 📦\n\nขนส่ง: {courier}\nเลขพัสดุ: {tracking_code}\n\nขอบพระคุณที่ไว้วางใจใช้บริการครับ!"
  );

  const activeOrder = orders.find((o) => o.id === selectedId) ?? orders[0];

  const generatedMessage = template
    .replace("{customer_name}", activeOrder.customerName)
    .replace("{order_id}", activeOrder.orderNumber)
    .replace("{courier}", activeOrder.courier)
    .replace("{tracking_code}", activeOrder.trackingCode);

  const handleSend = () => {
    if (activeOrder.status === "Sent") return;

    setIsSending(true);
    setTimeout(() => {
      const nowTime = new Date().toLocaleTimeString("en-GB", { hour12: false });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === activeOrder.id
            ? { ...o, status: "Sent", sentAt: nowTime }
            : o
        )
      );
      setIsSending(false);
    }, 600);
  };

  const handleReset = () => {
    setOrders(initialOrders);
    setSelectedId("1");
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/[0.08] bg-white text-[#1d1d1f] shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] bg-[#f5f5f7] px-6 py-4">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
          <div>
            <h3 className="font-semibold text-[#1d1d1f]">
              Tracking Sender Dashboard · Live Operations Sandbox
            </h3>
            <p className="text-xs text-[#6e6e73]">
              {lang === "th"
                ? "จำลองระบบส่งเลขพัสดุอัตโนมัติพร้อมป้องกันการส่งซ้ำ & อัปเดต Google Sheet"
                : "Simulate automated parcel notifications with duplicate protection & sheet writeback"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1d1d1f] shadow-sm transition hover:bg-[#f5f5f7]"
        >
          <RefreshCw className="h-3.5 w-3.5 text-[#0071e3]" />
          <span>{lang === "th" ? "รีเซ็ตข้อมูล" : "Reset Data"}</span>
        </button>
      </div>

      {/* Main Grid: Data Table + Live Preview */}
      <div className="grid gap-6 p-6 lg:grid-cols-12">
        {/* Left Col: Google Sheets Simulator Table */}
        <div className="space-y-4 lg:col-span-7">
          <div className="grid grid-cols-4 gap-3 rounded-2xl border border-black/[0.08] bg-[#fbfbfd] p-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73]">Total</p>
              <p className="text-xl font-bold text-[#1d1d1f]">{orders.length}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73]">Sent</p>
              <p className="text-xl font-bold text-emerald-600">{orders.filter(o => o.status === "Sent").length}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73]">Pending</p>
              <p className="text-xl font-bold text-amber-500">{orders.filter(o => o.status === "Pending").length}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73]">Error</p>
              <p className="text-xl font-bold text-red-500">{orders.filter(o => o.status === "Error").length}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
              1. Google Sheets Orders Intake
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" /> Duplicate Protection ON
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-black/[0.08] bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-black/[0.08] bg-[#fbfbfd] font-mono uppercase text-[#6e6e73]">
                <tr>
                  <th className="p-3">Order</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Tracking</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06]">
                {orders.map((o) => {
                  const isSelected = o.id === selectedId;
                  return (
                    <tr
                      key={o.id}
                      onClick={() => setSelectedId(o.id)}
                      className={`cursor-pointer transition ${
                        isSelected ? "bg-[#0071e3]/5 font-medium" : "hover:bg-black/[0.02]"
                      }`}
                    >
                      <td className="p-3 font-mono font-bold text-[#0071e3]">{o.orderNumber}</td>
                      <td className="p-3">{o.customerName}</td>
                      <td className="p-3 font-mono text-[#6e6e73]">{o.trackingCode}</td>
                      <td className="p-3">
                        {o.status === "Sent" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700">
                            <Check className="h-3 w-3" /> Sent ({o.sentAt})
                          </span>
                        ) : o.status === "Error" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-red-700">
                            Error
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber-700">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={`rounded px-2 py-1 text-[11px] font-semibold ${
                            isSelected ? "bg-[#0071e3] text-white" : "text-[#86868b]"
                          }`}
                        >
                          {isSelected ? "Active" : "Select"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Template Token Customizer */}
          <div className="rounded-2xl border border-black/[0.08] bg-[#fbfbfd] p-4">
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
              Message Template Format (Tokens: &#123;customer_name&#125;, &#123;order_id&#125;, &#123;tracking_code&#125;, &#123;courier&#125;)
            </label>
            <textarea
              rows={3}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-black/[0.1] bg-white p-3 font-mono text-xs text-[#1d1d1f] focus:border-[#0071e3] focus:outline-none focus:ring-1 focus:ring-[#0071e3]"
            />
          </div>
        </div>

        {/* Right Col: Live LINE/Messenger Chat Preview & Send Action */}
        <div className="space-y-4 lg:col-span-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
              2. Live Chat Preview ({activeOrder.channel})
            </span>
            <span className="rounded-full bg-black/5 px-2.5 py-0.5 font-mono text-[10px] text-[#1d1d1f]">
              {activeOrder.customerName}
            </span>
          </div>

          {/* Phone chat mockup */}
          <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-[#8492a6]/10 p-4">
            <div className="rounded-xl border border-black/[0.06] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-black/[0.06] pb-2 text-xs font-semibold text-[#1d1d1f]">
                <MessageSquare className="h-3.5 w-3.5 text-[#0071e3]" />
                <span>Store Official Account</span>
              </div>
              <div className="mt-3 whitespace-pre-wrap rounded-lg bg-[#f0f4f8] p-3 text-xs leading-relaxed text-[#1d1d1f]">
                {generatedMessage}
              </div>
              <div className="mt-2 text-right font-mono text-[10px] text-[#86868b]">
                {activeOrder.status === "Sent" ? `Delivered at ${activeOrder.sentAt}` : "Preview only (Not sent)"}
              </div>
            </div>
          </div>

          {/* Send Trigger Button */}
          <div>
            {activeOrder.status === "Sent" ? (
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-600/20 bg-emerald-50 p-3.5 text-center text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {lang === "th"
                    ? "รายการนี้ส่งแจ้งเตือนสำเร็จแล้ว (ป้องกันการส่งซ้ำอัตโนมัติ)"
                    : "Notification sent successfully (Duplicate-send locked)"}
                </span>
              </div>
            ) : (
              <button
                type="button"
                disabled={isSending}
                onClick={handleSend}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0071e3] p-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#0055b3] disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>{lang === "th" ? "กำลังส่งและบันทึกข้อมูล..." : "Matching & Sending..."}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>
                      {lang === "th"
                        ? `ส่งข้อความแจ้งเตือน ${activeOrder.orderNumber}`
                        : `Send Notification for ${activeOrder.orderNumber}`}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-amber-500/10 p-3 text-[11px] leading-relaxed text-amber-900">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
            <span>
              {lang === "th"
                ? "เมื่อกดส่ง ระบบจะตรวจสอบ Webhook, ตรวจจับความซ้ำซ้อน และเขียน Timestamp กลับลง Sheet แบบ Real-time"
                : "Real-time writeback confirms status in Google Sheets and locks duplicate trigger routes."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
