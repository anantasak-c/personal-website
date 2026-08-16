import {
  Check,
  Copy,
  Filter,
  Newspaper,
  Radio,
  RefreshCw,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

interface RawArticle {
  id: string;
  source: string;
  title: string;
  topic: string;
  score: number;
  relevance: number;
  novelty: number;
  date: string;
  snippet: string;
}

const sampleFeed: RawArticle[] = [
  {
    id: "1",
    source: "Arxiv · AI Systems",
    title: "Deterministic Agent Routing in Low-Latency Autonomous Workflows",
    topic: "Agentic AI",
    score: 9.4,
    relevance: 9.6,
    novelty: 9.2,
    date: "Aug 15, 2026",
    snippet: "Exploring hybrid state machine architectures to reduce LLM hallucination and ensure audit trails in multi-agent executions.",
  },
  {
    id: "2",
    source: "TechPulse Wire",
    title: "Serverless Postgres Benchmarks: Neon vs Aurora for Multi-tenant SaaS",
    topic: "Infrastructure",
    score: 8.8,
    relevance: 9.0,
    novelty: 8.5,
    date: "Aug 14, 2026",
    snippet: "Analyzing connection pooling efficiency, cold start latencies, and pricing structures for real-time dashboard writebacks.",
  },
  {
    id: "3",
    source: "AI Engineering Digest",
    title: "Practical Webhook Automation Patterns for Cross-border Logistics",
    topic: "Automation",
    score: 9.1,
    relevance: 9.5,
    novelty: 8.7,
    date: "Aug 16, 2026",
    snippet: "Handling idempotent retries, duplicate-send locking, and customer matching across LINE and Facebook Messenger.",
  },
  {
    id: "4",
    source: "Open Source Weekly",
    title: "Evaluating Local Model Deployment on Edge Devices",
    topic: "Open-Source",
    score: 7.2,
    relevance: 7.0,
    novelty: 7.4,
    date: "Aug 13, 2026",
    snippet: "Quantization strategies for running 7B parameter reasoning models on constrained hardware.",
  },
  {
    id: "5",
    source: "Venture Insights",
    title: "The Rise of Thai AI Startups: Q3 Funding Landscape",
    topic: "Market",
    score: 8.5,
    relevance: 8.8,
    novelty: 8.2,
    date: "Aug 15, 2026",
    snippet: "Analysis of seed rounds in Bangkok's tech scene, focusing on AI-driven logistics and automated commerce solutions.",
  },
  {
    id: "6",
    source: "Cloud Native Computing",
    title: "Optimizing Next.js Edge Runtime for Multi-Region Failovers",
    topic: "Infrastructure",
    score: 9.0,
    relevance: 9.2,
    novelty: 8.8,
    date: "Aug 16, 2026",
    snippet: "Architectural patterns for zero-downtime deployments and intelligent traffic routing using Vercel Edge networks.",
  },
  {
    id: "7",
    source: "Deep Learning Quarterly",
    title: "Self-Reflective Prompting Techniques in E-commerce Bots",
    topic: "Agentic AI",
    score: 8.7,
    relevance: 8.9,
    novelty: 8.5,
    date: "Aug 12, 2026",
    snippet: "Enhancing user intent resolution by implementing self-correction loops in automated customer service LLMs.",
  },
  {
    id: "8",
    source: "SaaS Builders Daily",
    title: "Automated Omni-Channel Syncing: A Technical Deep Dive",
    topic: "Automation",
    score: 9.3,
    relevance: 9.5,
    novelty: 9.1,
    date: "Aug 16, 2026",
    snippet: "How to unify social publishing across X, Facebook, and LINE without hitting API rate limits or facing shadowbans.",
  },
];

export function NewsCurationDemo() {
  const { lang } = useLang();
  const [minScore, setMinScore] = useState(8.0);
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [digest, setDigest] = useState<string>(
    "### ⚡ Daily AI Executive Signal Digest\n\n- **Agentic AI & Determinism**: Hybrid state machines are replacing pure prompt chaining to eliminate hallucination in production workflows.\n- **Database Performance**: Neon Serverless pooling reduces latency spikes to under 20ms for continuous webhook ingestion.\n- **Operational Safety**: Idempotent message routing prevents duplicate customer notifications across social channels."
  );

  const filtered = sampleFeed.filter(
    (item) => item.score >= minScore && (selectedTopic === "All" || item.topic === selectedTopic)
  );

  const runSynthesis = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      const now = new Date().toLocaleTimeString("en-GB", { hour12: false });
      setDigest(
        `# ⚡ AI Executive Signal Digest\n*Generated at ${now}*\n\n` +
        `**Summary Overview:**\nAnalyzed ${filtered.length} high-signal intelligence artifacts focusing on ${selectedTopic}. Key themes emphasize autonomous workflows and resilient infrastructure.\n\n` +
        `## 🏆 Top Signals\n\n` +
          filtered
            .map(
              (a, idx) =>
                `### ${idx + 1}. ${a.title}\n` +
                `**Source:** ${a.source} · **Date:** ${a.date}\n` +
                `**Metrics:** 🟢 Score: ${a.score}/10 | 🎯 Relevance: ${a.relevance} | 💡 Novelty: ${a.novelty}\n\n` +
                `> **Executive Takeaway:**\n> ${a.snippet}\n` +
                `---\n`
            )
            .join("\n")
      );
      setIsSynthesizing(false);
    }, 600);
  };

  const copyDigest = () => {
    navigator.clipboard.writeText(digest);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/[0.08] bg-white text-[#1d1d1f] shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] bg-[#f5f5f7] px-6 py-4">
        <div className="flex items-center gap-3">
          <Newspaper className="h-5 w-5 text-[#0071e3]" />
          <div>
            <h3 className="font-semibold text-[#1d1d1f]">
              AI News Curation & Signal Extraction Sandbox
            </h3>
            <p className="text-xs text-[#6e6e73]">
              {lang === "th"
                ? "คัดกรองสัญญาณข่าวสาร AI สังเคราะห์เนื้อหา และสร้างรายงานสรุปอัตโนมัติ"
                : "Automated signal extraction, noise filtering, and executive digest generation"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-700">
            <Radio className="h-3 w-3 animate-pulse text-emerald-600" />
            <span>Feed Active</span>
          </span>
        </div>
      </div>

      {/* Control Strip: Threshold slider & Topic filter */}
      <div className="grid gap-4 border-b border-black/[0.08] bg-[#fbfbfd] p-5 sm:grid-cols-2">
        {/* Quality Threshold */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-[#1d1d1f]">
            <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider text-[#6e6e73]">
              <Sliders className="h-3.5 w-3.5 text-[#0071e3]" /> Minimum Signal Score
            </span>
            <span className="font-mono text-sm font-bold text-[#0071e3]">{minScore.toFixed(1)} / 10</span>
          </div>
          <input
            type="range"
            min="6.0"
            max="9.5"
            step="0.2"
            value={minScore}
            onChange={(e) => setMinScore(parseFloat(e.target.value))}
            className="mt-2 w-full accent-[#0071e3]"
          />
        </div>

        {/* Topic Filters */}
        <div>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">
            <Filter className="h-3.5 w-3.5 text-[#0071e3]" /> Topic Focus
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["All", "Agentic AI", "Infrastructure", "Automation", "Open-Source"].map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  selectedTopic === topic
                    ? "bg-[#0071e3] text-white shadow-sm"
                    : "border border-black/[0.08] bg-white text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column: Raw Feed Stream vs Synthesized AI Digest */}
      <div className="grid gap-6 p-6 lg:grid-cols-12">
        {/* Left: Raw Intake Feed */}
        <div className="space-y-3 lg:col-span-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
              1. Ingested Stream ({filtered.length} qualified signals)
            </span>
            <button
              type="button"
              onClick={runSynthesis}
              disabled={isSynthesizing}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0071e3] px-3.5 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0055b3] disabled:opacity-50"
            >
              {isSynthesizing ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              <span>{lang === "th" ? "รันการสังเคราะห์ AI" : "Run AI Synthesis"}</span>
            </button>
          </div>

          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-black/[0.08] bg-white p-3.5 shadow-sm transition hover:border-[#0071e3]/30"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#0071e3]">
                    {item.source} · {item.date}
                  </span>
                  <div className="flex gap-1">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700" title="Overall Score">
                      ★ {item.score}
                    </span>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-700" title="Relevance">
                      🎯 {item.relevance}
                    </span>
                  </div>
                </div>
                <h4 className="mt-1 text-xs font-bold text-[#1d1d1f]">{item.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-[#6e6e73]">{item.snippet}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Synthesized Digest Output */}
        <div className="space-y-3 lg:col-span-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
              2. Synthesized Executive Markdown Output
            </span>
            <button
              type="button"
              onClick={copyDigest}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] bg-white px-3 py-1 text-xs font-semibold text-[#1d1d1f] shadow-sm transition hover:bg-[#f5f5f7]"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? (lang === "th" ? "คัดลอกแล้ว" : "Copied") : (lang === "th" ? "คัดลอก Markdown" : "Copy Markdown")}</span>
            </button>
          </div>

          <div className="h-[340px] overflow-y-auto rounded-2xl border border-black/[0.08] bg-[#0d1117] p-4 font-mono text-xs leading-relaxed text-[#e6edf3]">
            <pre className="whitespace-pre-wrap font-sans text-xs text-white/90">
              {digest}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
