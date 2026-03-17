import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, ArrowLeft, AlertTriangle, Zap, Terminal } from "lucide-react";

const MAGIC_PROMPT = `You are my personal system administrator and DevOps assistant. Your job is to install and run OpenClaw on my computer automatically with zero manual steps from me.

Follow these steps in order:

## STEP 1 — Detect My System
First, detect and report:
- Operating System (Windows / macOS / Linux and its version)
- CPU architecture (x86_64, ARM, Apple Silicon, etc.)
- Available RAM and disk space
- Whether Docker is already installed (run: docker --version)
- Whether Docker is currently running

## STEP 2 — Install Docker (if not installed)
If Docker is NOT installed:
- Windows: Download and install Docker Desktop from https://www.docker.com/products/docker-desktop/ — guide me through any required steps (WSL2, BIOS virtualization, etc.)
- macOS (Apple Silicon): Install Docker Desktop for Mac (Apple Chip)
- macOS (Intel): Install Docker Desktop for Mac (Intel Chip)
- Linux: Install Docker Engine using the official apt/yum/dnf script for my distro

After installing, verify Docker is running before proceeding.

## STEP 3 — Pull and Run OpenClaw
Run the following command exactly:
\`\`\`
docker run -d --name openclaw -p 3000:3000 --restart unless-stopped openclaw/openclaw:latest
\`\`\`

Then verify the container is running:
\`\`\`
docker ps | grep openclaw
\`\`\`

## STEP 4 — Open in Browser
After the container is confirmed running, tell me to open:
👉 http://localhost:3000

## STEP 5 — Handle Any Errors Automatically
If ANY error occurs at any step:
- Read the full error message carefully
- Diagnose the root cause
- Apply the fix automatically (do NOT ask me what to do unless absolutely necessary)
- Re-run the failed step
- Continue until OpenClaw is successfully running

## DONE ✅
When OpenClaw is accessible at localhost:3000, respond with:
"🎉 OpenClaw is now running at http://localhost:3000 — enjoy!"

Begin now. Start with STEP 1.`;

export function OpenClawGuidePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MAGIC_PROMPT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
          <span className="text-xs font-mono text-gray-400">OPENCLAW GUIDE</span>
        </div>
      </nav>

      {/* ── Section 1: Hero ── */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <Zap className="w-3.5 h-3.5" />
          AI-Powered Installation
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900 mb-4">
          รัน OpenClaw AI Agent<br />
          <span className="text-blue-600">ในเครื่องคุณ... แค่คลิกเดียว</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-10">
          ไม่ต้องปวดหัวกับ Terminal หรือพิมพ์คำสั่งเอง<br />
          ให้ AI ช่วยจัดการตั้งแต่อ่าน OS, ลง Docker จนถึงแก้ Bug ให้คุณ<span className="font-semibold text-gray-700">แบบอัตโนมัติ</span>
        </p>

        {/* Hero Visual */}
        <div className="relative mx-auto max-w-md h-52 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-900/40 shadow-2xl flex items-center justify-center overflow-hidden mb-4">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 30px,rgba(0,150,255,0.3) 30px,rgba(0,150,255,0.3) 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(0,150,255,0.3) 30px,rgba(0,150,255,0.3) 31px)" }} />
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl">🧑‍💻</div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-blue-400 text-xl animate-bounce">✨</div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                <div className="text-blue-400 text-xs font-mono opacity-60">prompt →</div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-2xl">🤖</div>
            </div>
            <p className="text-blue-300 text-xs font-mono mt-2 opacity-80">AI is handling everything for you...</p>
          </div>
        </div>
        <p className="text-xs text-gray-400">ส่ง Prompt ให้ AI แล้วไปจิบกาแฟรอได้เลย</p>
      </section>

      <div className="max-w-3xl mx-auto px-6 space-y-10 pb-20">

        {/* ── Section 2: Setup + Referral ── */}
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">เตรียมเครื่องมือให้พร้อม</h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            เพื่อให้ระบบทำงานอัตโนมัติ เราขอแนะนำให้ใช้ <strong className="text-gray-800">Windsurf</strong> — AI IDE ที่ฉลาดที่สุดตอนนี้ — เป็นตัวรันคำสั่งครับ
            Windsurf จะอ่าน Prompt แล้วรันคำสั่ง Terminal ในเครื่องคุณได้เองแบบอัตโนมัติ
          </p>

          {/* CTA Button */}
          <a
            href="https://windsurf.com/refer-a-friend"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-base py-4 px-8 rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 mb-5"
          >
            <span className="text-lg">📥</span>
            <span>ดาวน์โหลด Windsurf &amp; รับเครดิต AI ฟรีสำหรับผู้ใช้ใหม่</span>
          </a>

          {/* Transparency Note */}
          <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <span className="text-lg flex-shrink-0">💡</span>
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>หมายเหตุแบบตรงไปตรงมา:</strong> การดาวน์โหลดและสมัครผ่านลิงก์ด้านบนนี้
              คุณจะได้รับ<strong>เครดิตฟรีเพิ่มเติม</strong>สำหรับใช้งาน AI (เช่น Claude 3.5 Sonnet)
              และคุณก็ยังได้ช่วยสนับสนุนมอบเครดิตให้ผมเพื่อนำไปพัฒนาโปรเจกต์คู่มือดีๆ แบบนี้ต่อไปด้วยครับ
              ขอบคุณที่สนับสนุนครับ!
            </p>
          </div>
        </section>

        {/* ── Section 3: Magic Prompt ── */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🪄</span>
            <h2 className="text-xl font-bold text-gray-900">The Magic Prompt</h2>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            คัดลอก Prompt ด้านล่างนี้ทั้งหมด แล้ว Paste ลงใน Windsurf ได้เลย
          </p>

          {/* Code block */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-slate-400 font-mono">magic-prompt.txt</span>
            </div>
            {/* Code */}
            <pre className="bg-slate-900 text-green-300 text-xs font-mono p-5 overflow-auto max-h-64 leading-relaxed whitespace-pre-wrap">
              {MAGIC_PROMPT}
            </pre>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`mt-4 flex items-center gap-2 mx-auto px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-200 shadow-md ${
              copied
                ? "bg-green-500 text-white shadow-green-200"
                : "bg-slate-900 hover:bg-slate-700 text-white shadow-slate-200 hover:-translate-y-0.5"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied! ✅
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                🪄 Copy Super Prompt
              </>
            )}
          </button>
        </section>

      </div>

      <div className="max-w-3xl mx-auto px-6 space-y-10 pb-20">
        
        {/* ── Section 4: How to Use ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">🚀</span>
            <h2 className="text-xl font-bold text-gray-900">วิธีใช้งาน (3 ขั้นตอนง่ายๆ)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">1</div>
              <h3 className="font-bold text-gray-900 mb-2">Paste Prompt</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Copy the magic prompt above and paste it into Windsurf AI Chat.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">2</div>
              <h3 className="font-bold text-gray-900 mb-2">Accept & Run</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Click "Accept" or "Run" to let AI execute the Docker commands automatically.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">3</div>
              <h3 className="font-bold text-gray-900 mb-2">Done!</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                When it says "Done", click the localhost link to open OpenClaw.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 5: AI Error Solver ── */}
        <section className="rounded-2xl border border-orange-100 bg-orange-50 p-8">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-900">เกิด Error? ไม่ต้องตกใจ!</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            ระบบคอมพิวเตอร์แต่ละคนไม่เหมือนกัน ถ้า AI ทำงานแล้วค้างหรือมีตัวหนังสือ Error สีแดงขึ้นมา...
            <strong className="text-gray-800"> ไม่ต้องตกใจครับ!</strong>
          </p>

          <div className="flex gap-4 bg-white rounded-xl border border-orange-200 p-5">
            <span className="text-2xl flex-shrink-0">🔧</span>
            <div>
              <p className="font-semibold text-gray-800 mb-1">วิธีแก้ใน 1 ประโยค</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                แค่<strong>ก๊อปปี้ข้อความ Error</strong>นั้น แล้วพิมพ์บอก AI ในแชทว่า:
              </p>
              <div className="mt-3 bg-slate-900 rounded-lg px-4 py-2.5 inline-flex items-center gap-3">
                <span className="text-green-400 font-mono text-sm">"Fix this error and continue"</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">แล้วปล่อยให้ AI หาวิธีแก้ปัญหาและรันใหม่ด้วยตัวมันเองครับ</p>
            </div>
          </div>
        </section>

        {/* ── Section 6: Footer ── */}
        <footer className="pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              สร้างสรรค์โดย{" "}
              <Link to="/portfolio" className="font-semibold text-blue-600 hover:underline">
                Anantasak Charoensuk
              </Link>
            </div>
            <p className="text-xs text-gray-400 text-center sm:text-right max-w-xs leading-relaxed">
              คู่มือนี้เป็นเพียงการแนะนำแนวทาง ผู้ใช้ควรตรวจสอบคำสั่งก่อนกด Accept ทุกครั้ง
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
