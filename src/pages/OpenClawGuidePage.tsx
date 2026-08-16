import { useState } from "react";
import { AlertTriangle, ArrowUpRight, Check, ChevronDown, Copy, ShieldCheck } from "lucide-react";
import { EditorialLayout } from "@/components/editorial/EditorialLayout";
import { useSEO } from "@/hooks/useSEO";

const installCommands = {
  unix: "curl -fsSL https://openclaw.ai/install.sh | bash",
  windows: "iwr -useb https://openclaw.ai/install.ps1 | iex",
};

const checks = ["openclaw --version", "openclaw doctor", "openclaw gateway status"];

export function OpenClawGuidePage() {
  const [platform, setPlatform] = useState<"unix" | "windows">("windows");
  const [copied, setCopied] = useState(false);
  const command = installCommands[platform];

  useSEO({
    title: "Install OpenClaw — Verified Guide · ANAN",
    description:
      "A Thai beginner guide to the official OpenClaw installer, onboarding, and safety expectations.",
    url: "https://anantasak.com/openclaw-guide",
  });

  const copyCommand = () => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <EditorialLayout>
      <article lang="th">
        <header className="mx-auto max-w-4xl px-5 pb-14 pt-20 sm:px-8 sm:pb-20 sm:pt-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">Guide · TH</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-[#1d1d1f] sm:text-6xl lg:text-7xl">
            ติดตั้ง OpenClaw โดยเริ่มจากวิธีทางการ
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-relaxed text-[#6e6e73]">
            คู่มือสำหรับคนที่อยากทดลอง OpenClaw โดยเข้าใจสิทธิ์ที่ให้กับ agent, ค่าใช้จ่ายของ model
            และสิ่งที่เกิดขึ้นในเครื่องก่อนเริ่มติดตั้ง
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#86868b]">
            <span className="rounded-full border border-black/[0.08] bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
              Last verified · 8 Aug 2026
            </span>
            <span className="rounded-full border border-black/[0.08] bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
              Official installer path
            </span>
          </div>
        </header>

        {/* Warning Banner */}
        <div className="border-y border-amber-500/20 bg-amber-50/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-4xl gap-4 px-5 py-6 text-sm leading-relaxed text-amber-900 sm:px-8">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p>
              <strong className="text-amber-950 font-semibold">ก่อนติดตั้ง:</strong> OpenClaw เป็น agent
              ที่อาจเข้าถึงไฟล์ เครื่องมือ และบริการที่คุณเชื่อมต่อ อย่าทดลองครั้งแรกด้วยข้อมูลสำคัญหรือสิทธิ์
              production และตรวจทุก approval ก่อนยืนยัน
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[220px_1fr] lg:py-24">
          <aside className="hidden lg:block">
            <nav
              aria-label="Guide sections"
              className="sticky top-28 space-y-3 font-mono text-xs text-[#86868b]"
            >
              <a href="#prepare" className="block transition hover:text-[#0071e3]">
                01 · Prepare
              </a>
              <a href="#install" className="block transition hover:text-[#0071e3]">
                02 · Install
              </a>
              <a href="#onboard" className="block transition hover:text-[#0071e3]">
                03 · Onboard
              </a>
              <a href="#verify" className="block transition hover:text-[#0071e3]">
                04 · Verify
              </a>
              <a href="#troubleshoot" className="block transition hover:text-[#0071e3]">
                05 · Troubleshoot
              </a>
            </nav>
          </aside>

          <div className="min-w-0 space-y-20">
            {/* 01 Prepare */}
            <section id="prepare">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                01 · Prepare
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
                รู้ว่าคุณกำลังอนุญาตอะไร
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "System",
                    body: "macOS, Linux, Windows หรือ WSL2 ที่คุณควบคุมได้",
                  },
                  {
                    title: "Model",
                    body: "บัญชีหรือ API ที่มีค่าใช้จ่ายและ limit แยกจากตัว OpenClaw",
                  },
                  {
                    title: "Permissions",
                    body: "เริ่มจากโฟลเดอร์ทดลองและบริการที่ยกเลิกสิทธิ์ได้",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-black/[0.08] bg-white/80 p-5 shadow-sm backdrop-blur-xl"
                  >
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <h3 className="mt-5 font-semibold text-[#1d1d1f]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 02 Install */}
            <section id="install">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                02 · Install
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
                ใช้ installer ที่รองรับระบบของคุณ
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#6e6e73]">
                เอกสารทางการระบุว่า installer จะตรวจระบบ ติดตั้ง Node หากจำเป็น ติดตั้ง OpenClaw และเริ่ม
                onboarding ให้
              </p>
              <div className="mt-6 inline-flex rounded-full border border-black/[0.08] bg-black/[0.04] p-1 backdrop-blur-md">
                <button
                  type="button"
                  aria-pressed={platform === "windows"}
                  onClick={() => setPlatform("windows")}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    platform === "windows" ? "bg-white text-[#1d1d1f] shadow-sm" : "text-[#86868b] hover:text-[#1d1d1f]"
                  }`}
                >
                  Windows
                </button>
                <button
                  type="button"
                  aria-pressed={platform === "unix"}
                  onClick={() => setPlatform("unix")}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    platform === "unix" ? "bg-white text-[#1d1d1f] shadow-sm" : "text-[#86868b] hover:text-[#1d1d1f]"
                  }`}
                >
                  macOS / Linux / WSL2
                </button>
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-black/[0.08] bg-[#1d1d1f] text-white shadow-md">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                  <span>Official installer</span>
                  <button
                    type="button"
                    onClick={copyCommand}
                    className="inline-flex items-center gap-1.5 text-white/70 hover:text-white"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-sm text-[#9ef0a8]">
                  <code>{command}</code>
                </pre>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#86868b]">
                อย่ารันคำสั่งจากหน้าเว็บโดยไม่ตรวจ domain และเนื้อหาก่อน หน้าอ้างอิงหลักคือ{" "}
                <a
                  href="https://docs.openclaw.ai/install"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0071e3] hover:underline"
                >
                  docs.openclaw.ai/install
                </a>
              </p>
            </section>

            {/* 03 Onboard */}
            <section id="onboard">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                03 · Onboard
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
                ตั้งค่าแบบสิทธิ์น้อยก่อน
              </h2>
              <ol className="mt-6 space-y-4">
                {[
                  "เลือก model provider และตรวจเงื่อนไขค่าใช้จ่าย",
                  "สร้าง workspace ทดลองที่ไม่มีไฟล์ส่วนตัว",
                  "ยังไม่เชื่อม messaging channel หรือ account สำคัญ",
                  "อ่าน approval ทุกครั้งก่อนอนุญาต tool หรือ command",
                ].map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white/80 p-4 text-base text-[#1d1d1f] shadow-sm"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0071e3]/10 font-mono text-xs font-bold text-[#0071e3]">
                      0{index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* 04 Verify */}
            <section id="verify">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                04 · Verify
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
                ตรวจ install ก่อนเพิ่มความสามารถ
              </h2>
              <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-2xl border border-black/[0.08] bg-[#1d1d1f] shadow-md">
                {checks.map((check) => (
                  <div key={check} className="flex items-center justify-between gap-4 px-5 py-4">
                    <code className="font-mono text-sm text-[#9ef0a8]">{check}</code>
                    <Check className="h-4 w-4 text-white/40" />
                  </div>
                ))}
              </div>
            </section>

            {/* 05 Troubleshoot */}
            <section id="troubleshoot">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                05 · Troubleshoot
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
                เริ่มจาก error จริง ไม่ใช่เดาสุ่ม
              </h2>
              <div className="mt-6 divide-y divide-black/[0.08] rounded-2xl border border-black/[0.08] bg-white/80 px-6 shadow-sm">
                {[
                  {
                    q: "หา command openclaw ไม่เจอ",
                    a: "ตรวจ Node และ global package path ตามหัวข้อ PATH troubleshooting ในเอกสารทางการ",
                  },
                  {
                    q: "Gateway ไม่ทำงาน",
                    a: "ใช้ openclaw doctor และ openclaw gateway status ก่อนแก้ config",
                  },
                  {
                    q: "ต้องการ Docker",
                    a: "ใช้คู่มือ Docker แยกของ OpenClaw เพราะ container flow ไม่เหมือน local installer",
                  },
                ].map((item) => (
                  <details key={item.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#1d1d1f] transition hover:text-[#0071e3]">
                      <span>{item.q}</span>
                      <ChevronDown className="h-4 w-4 text-[#86868b] transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6e6e73]">{item.a}</p>
                  </details>
                ))}
              </div>
              <a
                href="https://docs.openclaw.ai/install"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0071e3] hover:underline"
              >
                Open official install documentation <ArrowUpRight className="h-4 w-4" />
              </a>
            </section>
          </div>
        </div>
      </article>
    </EditorialLayout>
  );
}
