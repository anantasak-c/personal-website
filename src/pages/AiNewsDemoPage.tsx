import { useState } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw, Sparkles, X } from "lucide-react";
import { DemoShell } from "@/components/editorial/DemoShell";
import { useSEO } from "@/hooks/useSEO";

type Story = { id: string; title: string; summary: string; angle: string; source: string; confidence: "High" | "Medium" };

const stories: Story[] = [
  { id: "s1", title: "โมเดลเล็กกำลังเปลี่ยนต้นทุนของ AI Product", summary: "ทีมสามารถรันงานเฉพาะทางด้วยโมเดลที่เล็กลงและควบคุม latency ได้ง่ายขึ้น", angle: "อธิบายว่าเมื่อไรควรเลือกโมเดลเล็กแทน frontier model", source: "Official model release", confidence: "High" },
  { id: "s2", title: "Agent UX ขยับจาก Chat ไปสู่ Task Workspace", summary: "ผลิตภัณฑ์เริ่มทำให้สถานะ การอนุมัติ และผลลัพธ์ของ agent มองเห็นได้ชัดขึ้น", angle: "เทียบ chatbot กับ operational agent product", source: "Product changelog", confidence: "High" },
  { id: "s3", title: "Editorial AI ต้องออกแบบ partial failure", summary: "ระบบข่าวที่ดีควรให้ editor ทำงานต่อได้แม้บาง source ล้มเหลว", angle: "เล่าบทเรียนจากการออกแบบ daily curation board", source: "Engineering note", confidence: "Medium" },
];

export function AiNewsDemoPage() {
  const [run, setRun] = useState<"idle" | "running" | "succeeded">("idle");
  const [visible, setVisible] = useState<Story[]>([]);
  const [rejected, setRejected] = useState<Story[]>([]);
  useSEO({ title: "AI News Curation — Demo Mode", description: "Try a deterministic Thai AI-news editorial workflow." });

  const fetchNews = () => {
    setRun("running");
    window.setTimeout(() => { setVisible(stories); setRejected([]); setRun("succeeded"); }, 800);
  };
  const reject = (story: Story) => { setVisible((items) => items.filter((item) => item.id !== story.id)); setRejected((items) => [...items, story]); };
  const restore = (story: Story) => { setRejected((items) => items.filter((item) => item.id !== story.id)); setVisible((items) => [...items, story]); };

  return (
    <DemoShell slug="ai-news-curation" title="AI News Curation">
      <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="space-y-5"><section className="rounded-3xl bg-white p-6 shadow-sm"><p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6e6e73]">Daily run</p><h1 className="mt-3 text-3xl font-semibold">Today&apos;s editorial board</h1><p className="mt-3 text-sm leading-6 text-[#6e6e73]">Fetch a deterministic set of stories, including one source-level failure.</p><button type="button" onClick={fetchNews} disabled={run === "running"} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white disabled:bg-black/30"><Sparkles className={`h-4 w-4 ${run === "running" ? "animate-pulse" : ""}`} />{run === "running" ? "Processing…" : run === "succeeded" ? "Run again" : "Fetch news"}</button></section>
          {run === "succeeded" ? <section className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex items-center gap-2 text-emerald-700"><CheckCircle2 className="h-5 w-5" /><span className="font-medium">Run succeeded</span></div><dl className="mt-5 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-[#f5f5f7] p-3"><dt className="text-[#6e6e73]">Fetched</dt><dd className="mt-1 text-xl font-semibold">42</dd></div><div className="rounded-xl bg-[#f5f5f7] p-3"><dt className="text-[#6e6e73]">Recommended</dt><dd className="mt-1 text-xl font-semibold">{visible.length}</dd></div></dl><div className="mt-4 flex gap-3 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />Newsletter source timed out. API and manual sources still produced a usable board.</div></section> : null}
        </aside>
        <div className="space-y-5"><section className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex items-end justify-between"><div><p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6e6e73]">Recommended</p><h2 className="mt-2 text-2xl font-semibold">Stories worth an editor&apos;s time</h2></div><span className="text-sm text-[#6e6e73]">{visible.length} items</span></div>{run === "idle" ? <div className="mt-8 rounded-2xl border border-dashed border-black/15 p-12 text-center text-sm text-[#6e6e73]">Run the mock pipeline to populate the board.</div> : null}{run === "running" ? <div className="mt-8 space-y-3">{[1,2,3].map((item) => <div key={item} className="h-28 animate-pulse rounded-2xl bg-[#f5f5f7]" />)}</div> : null}<div className="mt-5 space-y-3">{visible.map((story) => <article key={story.id} className="rounded-2xl border border-black/10 p-5"><div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#6e6e73]"><span>{story.source}</span><span>·</span><span>{story.confidence} confidence</span></div><h3 className="mt-3 text-xl font-semibold">{story.title}</h3><p className="mt-2 text-sm leading-6 text-[#6e6e73]">{story.summary}</p><p className="mt-3 rounded-xl bg-blue-50 p-3 text-sm text-blue-900"><span className="font-medium">Content angle:</span> {story.angle}</p></div><button type="button" onClick={() => reject(story)} className="rounded-full p-2 text-[#6e6e73] hover:bg-red-50 hover:text-red-600" aria-label={`Reject ${story.title}`}><X className="h-4 w-4" /></button></div></article>)}</div></section>
          {rejected.length ? <section className="rounded-3xl bg-white p-6 shadow-sm"><p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6e6e73]">Rejected</p><div className="mt-4 space-y-2">{rejected.map((story) => <div key={story.id} className="flex items-center justify-between gap-4 rounded-xl bg-[#f5f5f7] p-4"><span className="text-sm">{story.title}</span><button type="button" onClick={() => restore(story)} className="inline-flex items-center gap-2 text-sm text-[#0066cc]"><RotateCcw className="h-4 w-4" /> Restore</button></div>)}</div></section> : null}
        </div>
      </div>
    </DemoShell>
  );
}
