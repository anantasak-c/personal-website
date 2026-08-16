import {
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  FileSpreadsheet,
  Globe,
  Layers,
  MessageSquare,
  Newspaper,
  Radio,
  Send,
  Server,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { type WorkItem } from "@/data/work";
import { useLang } from "@/i18n/LanguageContext";

interface SystemFlowVisualizerProps {
  item: WorkItem;
  className?: string;
}

/* ── Tech Stack Node (small branded chip) ── */
function TechNode({ name, active }: { name: string; active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] font-bold transition-all duration-500 ${
        active
          ? "border-[#0071e3]/40 bg-[#0071e3]/10 text-[#0071e3] shadow-sm shadow-[#0071e3]/10 scale-105"
          : "border-black/[0.06] bg-white text-[#6e6e73]"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${active ? "bg-[#0071e3]" : "bg-[#d1d1d6]"}`} />
      {name}
    </span>
  );
}

/* ── Stage Card with embedded tech nodes ── */
interface StageData {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
  desc: string;
  techs: string[];
  dataType: string;
}

export function SystemFlowVisualizer({ item, className = "" }: SystemFlowVisualizerProps) {
  const { lang } = useLang();
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const getArchitecture = (slug: string): StageData[] => {
    switch (slug) {
      case "cloud-assistant":
        return [
          {
            icon: Server,
            label: "INPUT",
            title: lang === "th" ? "คำสั่งภาษาธรรมชาติ" : "Natural Language Prompt",
            desc: lang === "th" ? "รับคำสั่งจาก CLI / Chat UI แปลงเป็น Structured Task" : "Intake via CLI or Chat, parse into structured task",
            techs: ["Next.js", "React", "Vercel Edge"],
            dataType: lang === "th" ? "→ Task Object" : "→ Task Object",
          },
          {
            icon: Cpu,
            label: "PROCESS",
            title: lang === "th" ? "Agent Router & Execution" : "Agent Router & Execution",
            desc: lang === "th" ? "LLM วิเคราะห์ Intent → ส่งต่อ Specialist Agent → Execute" : "LLM intent classification → Route to specialist → Execute",
            techs: ["Codex CLI", "Python", "OpenAI API"],
            dataType: lang === "th" ? "→ Execution Result" : "→ Execution Result",
          },
          {
            icon: Database,
            label: "OUTPUT",
            title: lang === "th" ? "ผลลัพธ์ & Audit Log" : "Results & Audit Log",
            desc: lang === "th" ? "บันทึกผลลัพธ์ลง Neon DB พร้อม Telemetry แบบ Real-time" : "Persist results to Neon DB with real-time telemetry stream",
            techs: ["Neon Postgres", "Vercel", "WebSocket"],
            dataType: lang === "th" ? "→ Dashboard" : "→ Dashboard",
          },
        ];
      case "tracking-sender-dashboard":
      case "tracking-sender":
        return [
          {
            icon: FileSpreadsheet,
            label: "SOURCE",
            title: lang === "th" ? "Google Sheets Data Source" : "Google Sheets Data Source",
            desc: lang === "th" ? "ดึงออเดอร์ เลขพัสดุ และข้อมูลลูกค้าจาก Sheet อัตโนมัติ" : "Auto-fetch orders, tracking codes, and customer data",
            techs: ["Google Sheets API", "TypeScript", "Vitest"],
            dataType: lang === "th" ? "→ Order Rows" : "→ Order Rows",
          },
          {
            icon: Workflow,
            label: "ENGINE",
            title: lang === "th" ? "Match & Validate Engine" : "Match & Validate Engine",
            desc: lang === "th" ? "จับคู่ลูกค้า ตรวจจับซ้ำซ้อน สร้างข้อความจากเทมเพลต" : "Customer matching, duplicate detection, template rendering",
            techs: ["Next.js", "n8n Webhook", "Template Engine"],
            dataType: lang === "th" ? "→ Ready Messages" : "→ Ready Messages",
          },
          {
            icon: Send,
            label: "DELIVERY",
            title: lang === "th" ? "Multi-Channel Broadcast" : "Multi-Channel Broadcast",
            desc: lang === "th" ? "ส่ง LINE/Messenger + เขียนสถานะกลับ Sheet แบบ Real-time" : "Send via LINE/Messenger + real-time sheet writeback",
            techs: ["LINE API", "Messaging API", "Google Sheets"],
            dataType: lang === "th" ? "→ Confirmation" : "→ Confirmation",
          },
        ];
      case "ai-commerce-chatbot":
        return [
          {
            icon: MessageSquare,
            label: "INTAKE",
            title: lang === "th" ? "Webhook Message Intake" : "Webhook Message Intake",
            desc: lang === "th" ? "รับข้อความจาก Messenger/LINE ผ่าน Webhook Endpoint" : "Receive customer messages via platform webhook endpoints",
            techs: ["Messenger API", "LINE Webhook", "n8n"],
            dataType: lang === "th" ? "→ Raw Message" : "→ Raw Message",
          },
          {
            icon: Bot,
            label: "CLASSIFY",
            title: lang === "th" ? "Intent Classification & Routing" : "Intent Classification & Routing",
            desc: lang === "th" ? "n8n + AI วิเคราะห์เจตนา → ค้นหา Catalog / FAQ / โอนแอดมิน" : "n8n + AI classify intent → catalog lookup / FAQ / escalation",
            techs: ["n8n Workflow", "OpenAI", "Google Sheets"],
            dataType: lang === "th" ? "→ Structured Reply" : "→ Structured Reply",
          },
          {
            icon: Zap,
            label: "RESPOND",
            title: lang === "th" ? "Rich Reply & Handoff" : "Rich Reply & Handoff",
            desc: lang === "th" ? "ตอบกลับด้วย Carousel สินค้า / QR Code / โอนสายแอดมิน" : "Reply with product cards, QR payment, or human handoff",
            techs: ["React", "Tailwind CSS", "Multi-channel"],
            dataType: lang === "th" ? "→ Customer" : "→ Customer",
          },
        ];
      case "ai-news-curation":
        return [
          {
            icon: Radio,
            label: "INGEST",
            title: lang === "th" ? "Multi-Source Feed Ingestion" : "Multi-Source Feed Ingestion",
            desc: lang === "th" ? "รวบรวมบทความจาก Arxiv, RSS, Tech Blogs และ Social Feed" : "Continuous ingestion from Arxiv, RSS, tech blogs, social feeds",
            techs: ["RSS Parser", "Web Scraper", "n8n"],
            dataType: lang === "th" ? "→ Raw Articles" : "→ Raw Articles",
          },
          {
            icon: Sparkles,
            label: "SYNTHESIZE",
            title: lang === "th" ? "AI Signal Extraction" : "AI Signal Extraction",
            desc: lang === "th" ? "คัดกรอง Noise ให้คะแนนความสำคัญ สกัดประเด็นหลัก" : "Noise reduction, relevance scoring, key insight extraction",
            techs: ["Gemini AI", "Embedding Model", "Python"],
            dataType: lang === "th" ? "→ Scored Signals" : "→ Scored Signals",
          },
          {
            icon: Newspaper,
            label: "PUBLISH",
            title: lang === "th" ? "Executive Digest Generation" : "Executive Digest Generation",
            desc: lang === "th" ? "สร้างรายงานสรุป Markdown พร้อมส่ง Email/Newsletter" : "Generate structured Markdown report + email distribution",
            techs: ["Markdown Renderer", "Email Webhook", "Vercel"],
            dataType: lang === "th" ? "→ Newsletter" : "→ Newsletter",
          },
        ];
      case "syncsocial":
      default:
        return [
          {
            icon: Layers,
            label: "COMPOSE",
            title: lang === "th" ? "Unified Content Composer" : "Unified Content Composer",
            desc: lang === "th" ? "เขียนเนื้อหาครั้งเดียว เจนแคปชันด้วย AI Presets" : "Single-source content creation with AI caption generation",
            techs: ["React", "TypeScript", "AI Presets"],
            dataType: lang === "th" ? "→ Unified Post" : "→ Unified Post",
          },
          {
            icon: Globe,
            label: "FORMAT",
            title: lang === "th" ? "Platform-Specific Formatter" : "Platform-Specific Formatter",
            desc: lang === "th" ? "แปลงเนื้อหาตามข้อกำหนด FB, IG, X, TikTok, LINE" : "Transform content per platform constraints & limits",
            techs: ["Channel Engine", "Media Optimizer", "Tailwind CSS"],
            dataType: lang === "th" ? "→ Formatted Posts" : "→ Formatted Posts",
          },
          {
            icon: Send,
            label: "PUBLISH",
            title: lang === "th" ? "Multi-Channel Publishing" : "Multi-Channel Publishing",
            desc: lang === "th" ? "ตั้งเวลา เผยแพร่ข้ามแพลตฟอร์ม และเก็บ Analytics" : "Schedule, broadcast cross-platform, and collect analytics",
            techs: ["Social APIs", "Scheduler", "Analytics DB"],
            dataType: lang === "th" ? "→ 5 Channels" : "→ 5 Channels",
          },
        ];
    }
  };

  const stages = getArchitecture(item.slug);

  // Auto-cycle
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stages.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [autoPlay, stages.length]);

  return (
    <div className={`overflow-hidden rounded-[2.5rem] border border-black/[0.08] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-2xl ${className}`}>
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] px-6 py-5 sm:px-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#0071e3]">
            <Workflow className="h-3.5 w-3.5" />
            <span>{lang === "th" ? "System Architecture · Tech Stack Diagram" : "System Architecture · Tech Stack Diagram"}</span>
          </div>
          <h3 className="mt-1 text-xl font-bold tracking-[-0.03em] text-[#1d1d1f] sm:text-2xl">
            {item.title}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Tech stack summary pills */}
          <div className="hidden items-center gap-1.5 sm:flex">
            {item.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="rounded-md border border-black/[0.06] bg-[#f5f5f7] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#6e6e73]">
                {tech}
              </span>
            ))}
            {item.stack.length > 4 && (
              <span className="rounded-md border border-black/[0.06] bg-[#f5f5f7] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#6e6e73]">
                +{item.stack.length - 4}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setAutoPlay(!autoPlay)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold transition ${
              autoPlay
                ? "border-emerald-500/30 bg-emerald-50 text-emerald-700"
                : "border-black/[0.08] bg-[#f5f5f7] text-[#6e6e73]"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${autoPlay ? "animate-pulse bg-emerald-500" : "bg-[#86868b]"}`} />
            <span>{autoPlay ? "Auto" : "Paused"}</span>
          </button>
        </div>
      </div>

      {/* ── Architecture Diagram ── */}
      <div className="px-6 py-8 sm:px-10 sm:py-10">
        {/* 3-Stage Horizontal Pipeline */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
          {stages.map((stage, index) => {
            const isActive = activeStep === index;
            const isPast = activeStep > index;

            return (
              <div key={stage.label} className="flex flex-1 flex-col items-stretch lg:flex-row">
                {/* Stage Node */}
                <div
                  onClick={() => { setAutoPlay(false); setActiveStep(index); }}
                  className={`group relative flex flex-1 cursor-pointer flex-col rounded-2xl border p-5 transition-all duration-500 ${
                    isActive
                      ? "border-[#0071e3] bg-gradient-to-b from-[#0071e3]/[0.04] to-white shadow-lg shadow-[#0071e3]/8 -translate-y-1"
                      : isPast
                      ? "border-emerald-500/30 bg-emerald-50/20"
                      : "border-black/[0.08] bg-[#fbfbfd] hover:border-black/15 hover:shadow-sm"
                  }`}
                >
                  {/* Stage Label + Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-500 ${
                        isActive
                          ? "bg-[#0071e3] text-white shadow-md shadow-[#0071e3]/25"
                          : isPast
                          ? "bg-emerald-600 text-white"
                          : "border border-black/[0.08] bg-white text-[#1d1d1f]"
                      }`}>
                        {isPast && !isActive ? <CheckCircle2 className="h-4 w-4" /> : <stage.icon className="h-4 w-4" />}
                      </span>
                      <span className={`font-mono text-[10px] font-bold tracking-[0.15em] ${
                        isActive ? "text-[#0071e3]" : "text-[#86868b]"
                      }`}>
                        {stage.label}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#d1d1d6]">0{index + 1}</span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="mt-3 text-sm font-bold text-[#1d1d1f]">{stage.title}</h4>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#6e6e73]">{stage.desc}</p>

                  {/* ── Embedded Tech Stack Nodes ── */}
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-black/[0.06] pt-3">
                    {stage.techs.map((tech) => (
                      <TechNode key={tech} name={tech} active={isActive} />
                    ))}
                  </div>

                  {/* Data type flowing out */}
                  <div className={`mt-3 font-mono text-[10px] font-semibold transition-colors duration-500 ${
                    isActive ? "text-[#0071e3]" : "text-[#d1d1d6]"
                  }`}>
                    {stage.dataType}
                  </div>
                </div>

                {/* ── Connector Arrow with animated pulse ── */}
                {index < stages.length - 1 && (
                  <>
                    {/* Desktop: Horizontal */}
                    <div className="hidden lg:flex items-center justify-center w-10 shrink-0">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="overflow-visible">
                        <line x1="0" y1="20" x2="32" y2="20" stroke={activeStep > index ? "#34d399" : activeStep === index ? "#0071e3" : "#e5e5ea"} strokeWidth="2" strokeDasharray="4 3" />
                        <polygon points="30,15 38,20 30,25" fill={activeStep > index ? "#34d399" : activeStep === index ? "#0071e3" : "#e5e5ea"} />
                        {(isActive || isPast) && (
                          <circle r="3" fill="#0071e3">
                            <animateMotion dur="1.4s" repeatCount="indefinite" path="M 0 20 L 32 20" />
                            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.4s" repeatCount="indefinite" />
                          </circle>
                        )}
                      </svg>
                    </div>
                    {/* Mobile: Vertical */}
                    <div className="flex lg:hidden items-center justify-center h-8 shrink-0">
                      <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
                        <line x1="20" y1="0" x2="20" y2="24" stroke={activeStep > index ? "#34d399" : activeStep === index ? "#0071e3" : "#e5e5ea"} strokeWidth="2" strokeDasharray="4 3" />
                        <polygon points="15,22 20,30 25,22" fill={activeStep > index ? "#34d399" : activeStep === index ? "#0071e3" : "#e5e5ea"} />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Bottom: Full Tech Stack Bar ── */}
        <div className="mt-8 rounded-xl border border-black/[0.06] bg-[#fbfbfd] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#86868b]">
              {lang === "th" ? "Tech Stack ทั้งหมดของโปรเจกต์นี้:" : "Full Project Tech Stack:"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-md border border-black/[0.06] bg-white px-2.5 py-1 font-mono text-[10px] font-semibold text-[#1d1d1f] shadow-sm"
                >
                  <span className="h-1 w-1 rounded-full bg-[#0071e3]" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stage Progress Dots ── */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {stages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => { setAutoPlay(false); setActiveStep(index); }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeStep === index ? "w-8 bg-[#0071e3]" : activeStep > index ? "w-1.5 bg-emerald-400" : "w-1.5 bg-black/10"
              }`}
              aria-label={`Go to stage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
