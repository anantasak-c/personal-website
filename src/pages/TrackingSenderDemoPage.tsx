import { useMemo, useState } from "react";
import { Check, MessageSquareText, PackageCheck, Search, Send } from "lucide-react";
import { DemoShell } from "@/components/editorial/DemoShell";
import { useSEO } from "@/hooks/useSEO";

const orders = [
  { id: "AN-1048", customer: "Mali S.", item: "Ceramic set", tracking: "TH928401735", conversation: "Messenger · Mali Studio" },
  { id: "AN-1049", customer: "Kawin P.", item: "Linen tote", tracking: "TH928401812", conversation: "Messenger · Kawin P." },
  { id: "AN-1050", customer: "Nara K.", item: "Desk lamp", tracking: "TH928401966", conversation: "Messenger · Nara Home" },
];

export function TrackingSenderDemoPage() {
  const [selectedId, setSelectedId] = useState(orders[0].id);
  const [matched, setMatched] = useState(false);
  const [sent, setSent] = useState(false);
  const order = useMemo(() => orders.find((item) => item.id === selectedId) ?? orders[0], [selectedId]);
  const message = `สวัสดีคุณ ${order.customer} สินค้า ${order.item} จัดส่งแล้ว หมายเลขติดตาม ${order.tracking} ขอบคุณค่ะ`;

  useSEO({ title: "Tracking Sender — Demo Mode", description: "Try the order matching and simulated tracking-message flow." });

  const selectOrder = (id: string) => { setSelectedId(id); setMatched(false); setSent(false); };

  return (
    <DemoShell slug="tracking-sender" title="Tracking Sender Dashboard">
      <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <section className="rounded-3xl bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6e6e73]">Orders</p><h1 className="mt-2 text-2xl font-semibold">Ready to notify</h1></div><PackageCheck className="h-6 w-6 text-emerald-600" /></div><div className="mt-5 space-y-2">{orders.map((item) => <button key={item.id} type="button" onClick={() => selectOrder(item.id)} className={`w-full rounded-2xl border p-4 text-left ${selectedId === item.id ? "border-[#0066cc] bg-blue-50" : "border-black/10 hover:bg-[#f5f5f7]"}`}><div className="flex justify-between gap-3"><span className="font-medium">{item.id}</span><span className="text-xs text-[#6e6e73]">{item.customer}</span></div><p className="mt-2 text-sm text-[#6e6e73]">{item.item} · {item.tracking}</p></button>)}</div></section>
        <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7"><div className="flex items-center justify-between"><div><p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6e6e73]">Selected order</p><h2 className="mt-2 text-3xl font-semibold">{order.id}</h2></div><span className={`rounded-full px-3 py-1.5 text-xs font-medium ${sent ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{sent ? "Simulated send complete" : "Awaiting review"}</span></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#f5f5f7] p-5"><p className="text-xs text-[#6e6e73]">Customer</p><p className="mt-2 font-medium">{order.customer}</p><p className="mt-1 text-sm text-[#6e6e73]">{order.item}</p></div><div className="rounded-2xl bg-[#f5f5f7] p-5"><p className="text-xs text-[#6e6e73]">Conversation</p><p className="mt-2 font-medium">{matched ? order.conversation : "Not matched yet"}</p><button type="button" onClick={() => setMatched(true)} disabled={matched} className="mt-3 inline-flex items-center gap-2 text-sm text-[#0066cc] disabled:text-emerald-600">{matched ? <Check className="h-4 w-4" /> : <Search className="h-4 w-4" />}{matched ? "Matched" : "Match conversation"}</button></div></div>
          <div className="mt-5 rounded-2xl border border-black/10 p-5"><div className="flex items-center gap-2 text-sm font-medium"><MessageSquareText className="h-4 w-4" /> Message preview</div><p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-[#1d1d1f]">{message}</p></div>
          <button type="button" onClick={() => setSent(true)} disabled={!matched || sent} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-[#2c2c2e] disabled:cursor-not-allowed disabled:bg-black/20"><Send className="h-4 w-4" />{sent ? "Message recorded in history" : "Confirm simulated send"}</button>
          {sent ? <div className="mt-5 flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800"><Check className="mt-0.5 h-4 w-4" /><p>Status updated for {order.id}. No customer or messaging service was contacted.</p></div> : null}
        </section>
      </div>
    </DemoShell>
  );
}
