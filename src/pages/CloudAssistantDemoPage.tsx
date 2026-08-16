import { useState } from "react";
import { Bot, CheckCircle2, Circle, Play, Plus, Sparkles } from "lucide-react";
import { DemoShell } from "@/components/editorial/DemoShell";
import { useSEO } from "@/hooks/useSEO";

type DemoTask = { title: string; details: string; agent: string; reason: string };

const presets: DemoTask[] = [
  { title: "Compare AI research tools", details: "Find current differences, primary sources, and a concise recommendation.", agent: "web_researcher", reason: "The task depends on current source checking and comparison." },
  { title: "Challenge a product idea", details: "Stress-test the assumptions behind a new AI workflow.", agent: "idea_debater", reason: "The desired outcome is critique, risk discovery, and alternatives." },
  { title: "Explain agent routing", details: "Teach the concept in simple Thai with a concrete example.", agent: "teacher", reason: "The task asks for a clear explanation rather than execution." },
];

export function CloudAssistantDemoPage() {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [task, setTask] = useState<DemoTask | null>(null);
  const [status, setStatus] = useState<"draft" | "queued" | "running" | "completed">("draft");

  useSEO({ title: "Cloud Assistant — Demo Mode", description: "Try the Cloud Assistant task routing flow with deterministic mock data." });

  const createTask = () => {
    setTask(presets[selectedPreset]);
    setStatus("queued");
  };

  const runTask = () => {
    setStatus("running");
    window.setTimeout(() => setStatus("completed"), 900);
  };

  return (
    <DemoShell slug="cloud-assistant" title="Cloud Assistant">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6e6e73]">01 · Create Task</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">Give Cloud a clear outcome.</h1>
          <div className="mt-6 space-y-2">
            {presets.map((preset, index) => (
              <button key={preset.title} type="button" onClick={() => { setSelectedPreset(index); setTask(null); setStatus("draft"); }} className={`w-full rounded-2xl border p-4 text-left transition-colors ${selectedPreset === index ? "border-[#0066cc] bg-blue-50" : "border-black/10 hover:bg-[#f5f5f7]"}`}>
                <span className="text-sm font-medium">{preset.title}</span><span className="mt-1 block text-xs leading-5 text-[#6e6e73]">{preset.details}</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={createTask} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-[#2c2c2e]"><Plus className="h-4 w-4" /> Create demo task</button>
        </section>

        <section className="rounded-3xl bg-[#171718] p-6 text-white shadow-sm">
          <div className="flex items-center justify-between"><div><p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">Task workspace</p><h2 className="mt-2 text-2xl font-semibold">{task?.title ?? "No task yet"}</h2></div><Bot className="h-7 w-7 text-[#2997ff]" /></div>
          {!task ? <div className="mt-16 rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-white/45">Choose a preset and create a task to begin.</div> : (
            <div className="mt-7 space-y-4">
              <div className="rounded-2xl bg-white/[0.07] p-5"><p className="text-xs text-white/45">Assigned specialist</p><p className="mt-2 font-mono text-sm text-[#2997ff]">{task.agent}</p><p className="mt-3 text-sm leading-6 text-white/60">{task.reason}</p></div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">{["queued", "running", "completed"].map((step) => { const active = status === step || (status === "completed" && step !== "draft"); return <div key={step} className={`rounded-xl p-3 ${active ? "bg-[#0066cc] text-white" : "bg-white/[0.06] text-white/35"}`}>{step}</div>; })}</div>
              {status === "queued" ? <button type="button" onClick={runTask} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90"><Play className="h-4 w-4" /> Run simulated agent</button> : null}
              {status === "running" ? <div className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-5 text-sm text-white/70"><Sparkles className="h-5 w-5 animate-pulse text-[#2997ff]" /> Generating a deterministic outcome…</div> : null}
              {status === "completed" ? <div className="rounded-2xl bg-white p-6 text-[#1d1d1f]"><div className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="h-5 w-5" /><span className="text-sm font-medium">Outcome saved to Run History</span></div><h3 className="mt-5 text-xl font-semibold">A structured result, ready to use</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-[#6e6e73]"><li>• The task was routed using its desired outcome.</li><li>• The specialist returned a concise, source-aware response.</li><li>• The run brief and readable outcome remain auditable.</li></ul></div> : null}
              <div className="flex items-center gap-2 text-xs text-white/35"><Circle className="h-3 w-3 fill-current" /> No external agent or production database was called.</div>
            </div>
          )}
        </section>
      </div>
    </DemoShell>
  );
}
