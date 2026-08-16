import {
  Boxes,
  Code2,
  Database,
  Workflow,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const techCategories = [
  {
    id: "languages",
    icon: Code2,
    title: "Languages & Frameworks",
    titleTh: "ภาษาโปรแกรม & เฟรมเวิร์ก",
    desc: "Core foundation for data queries, automation scripts, and responsive user interfaces.",
    descTh: "พื้นฐานหลักสำหรับการจัดการข้อมูล, เขียนสคริปต์อัตโนมัติ และสร้างเว็บแอปพลิเคชัน",
    items: [
      {
        name: "Python",
        icon: "🐍",
        tag: "Core Language",
        desc: "Primary language for data manipulation, automation scripts, and AI integrations.",
        descTh: "ภาษาหลักสำหรับประมวลผลข้อมูล, วิเคราะห์สถิติ และพัฒนาสคริปต์อัตโนมัติ",
      },
      {
        name: "SQL",
        icon: "🗄️",
        tag: "Data Modeling",
        desc: "Relational database querying, schema design, and complex business analytics.",
        descTh: "ดึงและจัดการฐานข้อมูลเชิงสัมพันธ์ ออกแบบสคีมา และคำนวณตัวเลขธุรกิจ",
      },
      {
        name: "TypeScript / JavaScript",
        icon: "📜",
        tag: "Frontend & Fullstack",
        desc: "Type-safe modern web applications, reactive components, and API route handlers.",
        descTh: "สร้างเว็บแอปพลิเคชันยุคใหม่ ปลอดภัยด้วย Type-checking และจัดการ API",
      },
      {
        name: "HTML5 / Tailwind CSS",
        icon: "🎨",
        tag: "UI Engineering",
        desc: "Responsive, accessible, and high-performance design systems and micro-interactions.",
        descTh: "ออกแบบหน้าตาเว็บที่ลื่นไหล รองรับทุกหน้าจอ และสวยงามระดับสากล",
      },
    ],
  },
  {
    id: "automation",
    icon: Workflow,
    title: "AI & Workflow Automation",
    titleTh: "ระบบ AI & Workflow Automation",
    desc: "Autonomous agent execution, LLM prompt engineering, and multi-channel pipelines.",
    descTh: "เชื่อมต่อปัญญาประดิษฐ์ ออกแบบ Prompt และวางระบบส่งต่อข้อมูลอัตโนมัติ",
    items: [
      {
        name: "n8n Workflow Automation",
        icon: "⚡",
        tag: "Automation Engine",
        desc: "Self-hosted & cloud workflow orchestration, error retry logic, and webhook handling.",
        descTh: "สร้างโฟลว์อัตโนมัติ จัดการ Webhook และตั้งระบบตรวจจับ Error ครบวงจร",
      },
      {
        name: "Gemini & OpenAI APIs",
        icon: "🧠",
        tag: "LLM Orchestration",
        desc: "Prompt engineering, function calling, structured JSON output, and model routing.",
        descTh: "เชื่อมต่อโมเดลภาษาขนาดใหญ่, ออกแบบคำสั่ง และคัดแยกเจตนาการทำงาน",
      },
      {
        name: "NotebookLM & RAG",
        icon: "📚",
        tag: "Knowledge Base",
        desc: "Source-grounded retrieval, document synthesis, and domain-specific knowledge extraction.",
        descTh: "สร้างคลังความรู้ ค้นหาข้อมูลเฉพาะทาง และลดการเกิดภาพหลอนของ AI",
      },
      {
        name: "REST APIs & Webhooks",
        icon: "🌐",
        tag: "Integration",
        desc: "Cross-platform event listeners for LINE, Facebook Messenger, and Telegram.",
        descTh: "เชื่อมต่อระบบภายนอก รับส่งข้อมูลแบบ Event-driven ผ่านช่องทางโซเชียล",
      },
    ],
  },
  {
    id: "data-infra",
    icon: Database,
    title: "Data, BI & Infrastructure",
    titleTh: "ข้อมูล, แดชบอร์ด & โครงสร้างพื้นฐาน",
    desc: "Business intelligence dashboards, scalable databases, and continuous deployment.",
    descTh: "แดชบอร์ดสรุปสถิติตัวเลข ฐานข้อมูลความเร็วสูง และระบบ Deploy ที่เชื่อถือได้",
    items: [
      {
        name: "Google Sheets & Drive APIs",
        icon: "📑",
        tag: "Operational CRM",
        desc: "Real-time read/write syncing, customer matching, and lightweight business databases.",
        descTh: "ดึงและบันทึกข้อมูลแบบเรียลไทม์ เป็นฐานข้อมูลกลางที่ใช้งานง่ายสำหรับธุรกิจ",
      },
      {
        name: "Looker Studio & Tableau",
        icon: "📊",
        tag: "BI Dashboards",
        desc: "Executive metrics visualization, funnel conversion analysis, and operational reporting.",
        descTh: "สร้างแดชบอร์ดแสดงผลตัวเลขสำคัญทางธุรกิจ และวิเคราะห์พฤติกรรมลูกค้า",
      },
      {
        name: "Neon Serverless Postgres",
        icon: "⚡",
        tag: "Cloud Database",
        desc: "Sub-20ms connection pooling, branching data workflows, and autoscaling backend.",
        descTh: "ฐานข้อมูลคลาวด์ความเร็วสูง รองรับการสเกลอัตโนมัติสำหรับโปรดักชัน",
      },
      {
        name: "Git, GitHub & Vercel",
        icon: "🚀",
        tag: "CI/CD & Deploy",
        desc: "Version control, automated continuous integration, and edge content delivery.",
        descTh: "ควบคุมเวอร์ชันโค้ด ตรวจสอบระบบอัตโนมัติ และเผยแพร่เว็บสู่ Production",
      },
    ],
  },
];

export function TechStackMatrix() {
  const { lang } = useLang();

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-28">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-xl">
          <Boxes className="h-3.5 w-3.5 text-[#0071e3]" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0071e3] sm:text-[11px] sm:tracking-[0.2em]">
            {lang === "th" ? "ทักษะเชิงเทคนิค & เครื่องมือ" : "Tech Stack & Tools Matrix"}
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-[#1d1d1f] sm:mt-4 sm:text-4xl sm:tracking-[-0.04em] md:text-5xl">
          {lang === "th" ? "เทคโนโลยีและเครื่องมือที่ใช้ในการพัฒนาระบบ" : "Tools Chosen for Practical Impact"}
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-[#6e6e73] sm:mt-4 sm:text-base md:text-lg">
          {lang === "th"
            ? "โครงสร้างทักษะที่ครอบคลุมตั้งแต่การวิเคราะห์โจทย์, การวางระบบ AI Automation ไปจนถึงการขึ้นระบบ Production"
            : "A battle-tested combination of data analytics, autonomous AI pipelines, and modern infrastructure."}
        </p>
      </div>

      {/* 3 Pillar Grid */}
      <div className="mt-8 grid gap-5 sm:mt-14 sm:gap-8 lg:grid-cols-3">
        {techCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col justify-between rounded-[1.75rem] border border-black/[0.08] bg-white/85 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition duration-300 hover:border-black/15 hover:shadow-md sm:rounded-[2rem] sm:p-8"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071e3]/10 text-[#0071e3]">
                  <cat.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f]">
                    {lang === "th" ? cat.titleTh : cat.title}
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[#6e6e73]">
                {lang === "th" ? cat.descTh : cat.desc}
              </p>

              {/* Items List */}
              <div className="mt-6 space-y-3">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="group rounded-xl border border-black/[0.06] bg-[#fbfbfd] p-3.5 transition-all hover:border-[#0071e3]/30 hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.icon}</span>
                        <h4 className="text-xs font-bold text-[#1d1d1f] transition group-hover:text-[#0071e3]">
                          {item.name}
                        </h4>
                      </div>
                      <span className="rounded-full bg-black/[0.04] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#6e6e73]">
                        {item.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-[#6e6e73]">
                      {lang === "th" ? item.descTh : item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
