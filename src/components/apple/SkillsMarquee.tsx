import { Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

interface SkillItem {
  icon: string;
  label: string;
  labelTh?: string;
  color?: string;
}

const row1Skills: SkillItem[] = [
  { icon: "👔", label: "Management", labelTh: "การบริหารจัดการ", color: "text-amber-700 bg-amber-500/10 border-amber-500/20" },
  { icon: "💼", label: "3 Years in Tech", labelTh: "3 ปีในสายเทคโนโลยี", color: "text-blue-700 bg-blue-500/10 border-blue-500/20" },
  { icon: "🏢", label: "Entrepreneurship", labelTh: "การสร้างธุรกิจ & ผู้ประกอบการ", color: "text-indigo-700 bg-indigo-500/10 border-indigo-500/20" },
  { icon: "💻", label: "Low-Code Lover", labelTh: "ผู้เชี่ยวชาญ Low-Code", color: "text-purple-700 bg-purple-500/10 border-purple-500/20" },
  { icon: "🎨", label: "Product Design", labelTh: "ออกแบบผลิตภัณฑ์ & UI", color: "text-pink-700 bg-pink-500/10 border-pink-500/20" },
  { icon: "📊", label: "Data Analysis", labelTh: "การวิเคราะห์ข้อมูล", color: "text-emerald-700 bg-emerald-500/10 border-emerald-500/20" },
  { icon: "⛓️", label: "Blockchain", labelTh: "บล็อกเชน & Web3", color: "text-violet-700 bg-violet-500/10 border-violet-500/20" },
  { icon: "🤖", label: "AI & Automation", labelTh: "AI & ระบบอัตโนมัติ", color: "text-cyan-700 bg-cyan-500/10 border-cyan-500/20" },
  { icon: "📱", label: "Community Management", labelTh: "การดูแลคอมมูนิตี้", color: "text-rose-700 bg-rose-500/10 border-rose-500/20" },
  { icon: "🎯", label: "Project Management", labelTh: "บริหารจัดการโปรเจกต์", color: "text-teal-700 bg-teal-500/10 border-teal-500/20" },
];

const row2Skills: SkillItem[] = [
  { icon: "⚡", label: "n8n Workflow Automation", labelTh: "วางระบบออโตเมชันด้วย n8n", color: "text-amber-700 bg-amber-500/10 border-amber-500/20" },
  { icon: "🧠", label: "RAG & LLM Workflows", labelTh: "สถาปัตยกรรม RAG & LLM", color: "text-blue-700 bg-blue-500/10 border-blue-500/20" },
  { icon: "🐍", label: "Python & SQL", labelTh: "เขียนโปรแกรม Python & SQL", color: "text-emerald-700 bg-emerald-500/10 border-emerald-500/20" },
  { icon: "📈", label: "Prompt Engineering", labelTh: "วิศวกรรมคำสั่ง Prompt", color: "text-purple-700 bg-purple-500/10 border-purple-500/20" },
  { icon: "🌐", label: "REST APIs & Webhooks", labelTh: "เชื่อมต่อ API & Webhook", color: "text-indigo-700 bg-indigo-500/10 border-indigo-500/20" },
  { icon: "💡", label: "Business & System Analysis", labelTh: "วิเคราะห์ธุรกิจและระบบ", color: "text-cyan-700 bg-cyan-500/10 border-cyan-500/20" },
  { icon: "💬", label: "AI Chatbot Design", labelTh: "ออกแบบแชทบอท AI", color: "text-teal-700 bg-teal-500/10 border-teal-500/20" },
  { icon: "🧪", label: "Rapid Prototyping", labelTh: "สร้างต้นแบบรวดเร็ว (Prototype)", color: "text-pink-700 bg-pink-500/10 border-pink-500/20" },
  { icon: "📑", label: "Functional Specifications", labelTh: "เขียนสเปกและขั้นตอนระบบ", color: "text-gray-700 bg-gray-500/10 border-gray-500/20" },
];

export function SkillsMarquee() {
  const { lang, t } = useLang();

  // Duplicate arrays to create seamless infinite scroll loop
  const track1 = [...row1Skills, ...row1Skills, ...row1Skills];
  const track2 = [...row2Skills, ...row2Skills, ...row2Skills];

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-3 py-12 sm:px-6 sm:py-24">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5 text-[#0071e3]" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0071e3] sm:text-[11px] sm:tracking-[0.2em]">
            {t("skills.label")}
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-[#1d1d1f] sm:mt-4 sm:text-4xl sm:tracking-[-0.04em] md:text-5xl">
          {t("skills.title")}
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-[#6e6e73] sm:mt-4 sm:text-base md:text-lg">
          {t("skills.subtitle")}
        </p>
      </div>

      {/* ── Marquee Stage ── */}
      <div className="relative mt-8 space-y-3 sm:mt-12 sm:space-y-4">
        {/* Track 1: Flowing Left */}
        <div className="marquee-container py-1">
          <div className="animate-marquee-left gap-2.5 sm:gap-3.5">
            {track1.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="group inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/85 px-3 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#0071e3]/30 hover:bg-white hover:shadow-md cursor-default select-none sm:gap-2.5 sm:px-4 sm:py-2.5"
              >
                <span className="text-sm sm:text-lg">{item.icon}</span>
                <span className="text-[11px] font-semibold text-[#1d1d1f] transition group-hover:text-[#0071e3] sm:text-sm whitespace-nowrap">
                  {lang === "th" ? item.labelTh ?? item.label : item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Flowing Right */}
        <div className="marquee-container py-1">
          <div className="animate-marquee-right gap-2.5 sm:gap-3.5">
            {track2.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="group inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/85 px-3 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#0071e3]/30 hover:bg-white hover:shadow-md cursor-default select-none sm:gap-2.5 sm:px-4 sm:py-2.5"
              >
                <span className="text-sm sm:text-lg">{item.icon}</span>
                <span className="text-[11px] font-semibold text-[#1d1d1f] transition group-hover:text-[#0071e3] sm:text-sm whitespace-nowrap">
                  {lang === "th" ? item.labelTh ?? item.label : item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
