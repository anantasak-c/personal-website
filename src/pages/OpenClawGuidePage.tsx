import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, ArrowLeft, AlertTriangle, Download, ChevronDown, ChevronUp, Monitor, Clock, Wifi, HardDrive } from "lucide-react";

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(MAGIC_PROMPT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const faqs = [
    {
      q: "OpenClaw คืออะไร? ปลอดภัยไหม?",
      a: "OpenClaw เป็นซอฟต์แวร์ AI Agent แบบ Open Source ที่ชุมชนนักพัฒนาทั่วโลกช่วยกันสร้าง สามารถตรวจสอบโค้ดต้นฉบับได้ที่ GitHub ครับ"
    },
    {
      q: "ต้องเก่งคอมฯ ไหมถึงจะทำได้?",
      a: "ไม่ต้องเก่งเลยครับ! แค่ทำตามขั้นตอน 4 ข้อในหน้านี้ก็พอ AI จะจัดการเรื่องยากๆ ให้หมด คุณแค่กด \"อนุญาต\" ตามที่ AI ขอ"
    },
    {
      q: "Docker คืออะไร? ทำไมต้องลง?",
      a: "Docker เปรียบเหมือน \"กล่อง\" สำหรับใส่โปรแกรม ทำให้ OpenClaw ทำงานได้โดยไม่กระทบกับระบบเดิมในเครื่องคุณ ถ้ายังไม่มี AI จะลงให้อัตโนมัติครับ"
    },
    {
      q: "ใช้เวลานานแค่ไหน?",
      a: "ประมาณ 5-15 นาทีครับ ขึ้นอยู่กับความเร็วอินเทอร์เน็ต ถ้าเครื่องมี Docker อยู่แล้วจะเร็วมาก (ไม่เกิน 2 นาที)"
    },
    {
      q: "ถ้าอยากลบออกจากเครื่องล่ะ?",
      a: "ง่ายมากครับ แค่พิมพ์บอก AI ว่า \"Uninstall OpenClaw and remove the Docker container\" แล้ว AI จะจัดการลบให้ทั้งหมด"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
          <span className="text-xs font-mono text-gray-400 tracking-wider">OPENCLAW GUIDE</span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 pt-14 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-5 py-2 rounded-full mb-8 border border-green-200">
            <Clock className="w-4 h-4" />
            ใช้เวลาประมาณ 5-15 นาที
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900 mb-5">
            ติดตั้ง OpenClaw ในเครื่องคุณ<br />
            <span className="text-blue-600">โดยไม่ต้องพิมพ์คำสั่งเอง แม้แต่บรรทัดเดียว</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            คู่มือนี้จะพาคุณทำทีละขั้นตอน แค่ <strong className="text-gray-800">ก๊อปปี้ข้อความ → วาง → กดอนุญาต</strong> แล้วรอ AI ทำงานให้
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">

        {/* ── OpenClaw คืออะไร ── */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">OpenClaw คืออะไร?</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            <strong className="text-gray-800">OpenClaw</strong> คือ AI Agent ที่ทำงานอยู่ในเครื่องคอมพิวเตอร์ของคุณเอง
            เหมือนมี "ผู้ช่วยดิจิทัล" ส่วนตัว ที่สามารถช่วยค้นหาข้อมูล วิเคราะห์ไฟล์ เขียนโค้ด
            และทำงานอัตโนมัติต่างๆ ได้ โดย<strong className="text-gray-800">ข้อมูลทั้งหมดอยู่ในเครื่องคุณ ไม่ส่งไปไหน</strong>
          </p>

          <div className="rounded-xl overflow-hidden border border-gray-200 bg-black shadow-lg">
            <video
              className="w-full h-auto"
              src="/videos/video-openclaw-preview.mp4"
              controls
              muted
              playsInline
              preload="metadata"
            />
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">ตัวอย่างการทำงานของ OpenClaw บนเครื่องจริง</p>
        </section>

        {/* ── สิ่งที่ต้องมี ── */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">สิ่งที่ต้องเตรียม</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <Monitor className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">คอมพิวเตอร์</p>
                <p className="text-sm text-gray-500">Windows, Mac หรือ Linux</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <Wifi className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">อินเทอร์เน็ต</p>
                <p className="text-sm text-gray-500">ใช้ดาวน์โหลดครั้งแรก</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <HardDrive className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">พื้นที่ว่าง</p>
                <p className="text-sm text-gray-500">อย่างน้อย 4 GB</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            ขั้นตอนทั้งหมด
        ═══════════════════════════════════ */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">เริ่มกันเลย!</h2>
          <p className="text-base text-gray-500 text-center mb-10">ทำตามขั้นตอนด้านล่างทีละข้อ ไม่ต้องรีบ</p>

          <div className="space-y-8">

            {/* ── ขั้นตอนที่ 1: ดาวน์โหลด Windsurf ── */}
            <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-4 bg-blue-600 text-white px-6 py-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-bold">ดาวน์โหลดและติดตั้ง Windsurf</h3>
                  <p className="text-blue-100 text-sm">ใช้เวลาประมาณ 2-3 นาที</p>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-base text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">Windsurf</strong> คือโปรแกรมที่จะเป็น "ตัวกลาง" ให้ AI อ่านคำสั่งแล้วทำงานในเครื่องคุณได้
                  เปรียบเหมือน<strong className="text-gray-800">ล่ามแปลภาษา</strong>ระหว่างคุณกับคอมพิวเตอร์
                </p>

                <a
                  href="https://windsurf.com/refer?referral_code=3c1xf7tl8fw46e0p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  คลิกที่นี่เพื่อดาวน์โหลด Windsurf (ฟรี)
                </a>

                <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <span className="text-lg flex-shrink-0">💡</span>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    <strong>โบนัส:</strong> สมัครผ่านลิงก์นี้ คุณจะได้<strong>เครดิต AI ฟรี</strong>สำหรับใช้งาน
                    และยังช่วยสนับสนุนผมในการทำคู่มือดีๆ แบบนี้ต่อไปด้วยครับ
                  </p>
                </div>

                <div className="text-base text-gray-600 leading-relaxed space-y-2">
                  <p>หลังจากดาวน์โหลดเสร็จ:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600 ml-2">
                    <li>เปิดไฟล์ที่ดาวน์โหลดมา แล้ว<strong className="text-gray-800">ติดตั้งตามขั้นตอนปกติ</strong> (กด Next → Next → Install)</li>
                    <li>เปิดโปรแกรม Windsurf ขึ้นมา</li>
                    <li>สมัครบัญชี (ใช้ Email หรือ Google ก็ได้)</li>
                  </ol>
                </div>

                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-lg">
                  <img
                    src="/videos/gif-install-windsurf.gif"
                    alt="ตัวอย่างวิธีติดตั้ง Windsurf"
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-xs text-center text-gray-400 mt-2">ขั้นตอนการติดตั้ง Windsurf</p>
              </div>
            </div>

            {/* ── ขั้นตอนที่ 2: ก๊อปปี้ Prompt ── */}
            <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-4 bg-blue-600 text-white px-6 py-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-bold">ก๊อปปี้ "Prompt" ด้านล่างนี้</h3>
                  <p className="text-blue-100 text-sm">ใช้เวลา 5 วินาที</p>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-base text-gray-600 leading-relaxed">
                  ข้อความด้านล่างนี้คือ <strong className="text-gray-800">"Prompt"</strong> ที่จะบอก AI ว่าต้องทำอะไรบ้าง
                  คุณ<strong className="text-gray-800">ไม่ต้องอ่านหรือแก้ไข</strong>อะไรเลย แค่กดปุ่ม "คัดลอก" ด้านล่าง
                </p>

                {/* Code block */}
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-3 text-xs text-slate-400 font-mono">magic-prompt.txt</span>
                  </div>
                  <pre className="bg-slate-900 text-green-300 text-xs font-mono p-5 overflow-auto max-h-48 leading-relaxed whitespace-pre-wrap">
                    {MAGIC_PROMPT}
                  </pre>
                </div>

                <button
                  onClick={handleCopy}
                  className={`w-full flex items-center justify-center gap-3 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 shadow-md ${
                    copied
                      ? "bg-green-500 text-white shadow-green-200 scale-[1.02]"
                      : "bg-slate-900 hover:bg-slate-700 text-white shadow-slate-200 hover:-translate-y-0.5"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-6 h-6" />
                      คัดลอกแล้ว! ไปขั้นตอนต่อไปได้เลย
                    </>
                  ) : (
                    <>
                      <Copy className="w-6 h-6" />
                      กดที่นี่เพื่อคัดลอกคำสั่งวิเศษ
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ── ขั้นตอนที่ 3: วางใน Windsurf ── */}
            <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-4 bg-blue-600 text-white px-6 py-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-bold">วางคำสั่งใน Windsurf แล้วกด "อนุญาต"</h3>
                  <p className="text-blue-100 text-sm">ใช้เวลาประมาณ 5-10 นาที (AI ทำงานเอง)</p>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <ol className="list-decimal list-inside space-y-3 text-base text-gray-600 ml-2 leading-relaxed">
                  <li>ในโปรแกรม Windsurf ให้มองหา <strong className="text-gray-800">ช่องแชท</strong> (มักอยู่ด้านขวา หรือกด Ctrl+L)</li>
                  <li><strong className="text-gray-800">วาง</strong>คำสั่งวิเศษที่ก๊อปปี้มา (กด Ctrl+V หรือคลิกขวา → Paste)</li>
                  <li>กด <strong className="text-gray-800">Enter</strong> เพื่อส่ง</li>
                  <li>AI จะเริ่มทำงาน — เมื่อไหร่ที่มีปุ่ม <strong className="text-gray-800">"Accept"</strong> หรือ <strong className="text-gray-800">"Run"</strong> ขึ้นมา ให้<strong className="text-blue-600">กดอนุญาต</strong>ได้เลย</li>
                  <li>รอจนกว่า AI จะบอกว่า <strong className="text-green-600">"Done!"</strong> หรือ <strong className="text-green-600">"OpenClaw is now running"</strong></li>
                </ol>

                <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <span className="text-lg flex-shrink-0">☕</span>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    <strong>เคล็ดลับ:</strong> ระหว่างรอ AI ทำงาน คุณไปจิบกาแฟหรือทำอย่างอื่นได้เลยครับ
                    AI จะจัดการทุกอย่างให้เอง รวมถึงลง Docker (ถ้ายังไม่มี) และแก้ปัญหาที่เจอ
                  </p>
                </div>

                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-lg">
                  <img
                    src="/videos/gif-paste-prompt.gif"
                    alt="ตัวอย่างการวาง Prompt แล้วกด Accept ใน Windsurf"
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-xs text-center text-gray-400 mt-2">วาง Prompt ในช่องแชทแล้วกด Enter</p>
              </div>
            </div>

            {/* ── ขั้นตอนที่ 4: เปิดใช้งาน ── */}
            <div className="relative bg-white rounded-2xl border border-green-200 overflow-hidden">
              <div className="flex items-center gap-4 bg-green-600 text-white px-6 py-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                <div>
                  <h3 className="text-lg font-bold">เปิดใช้งาน OpenClaw!</h3>
                  <p className="text-green-100 text-sm">เสร็จแล้ว!</p>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-base text-gray-600 leading-relaxed">
                  เมื่อ AI ทำงานเสร็จ จะมีข้อความบอกว่า OpenClaw พร้อมใช้งานแล้ว
                  ให้คุณ<strong className="text-gray-800">เปิด Browser</strong> (เช่น Chrome, Safari, Edge) แล้วพิมพ์ในช่องที่อยู่ว่า:
                </p>

                <div className="bg-gray-900 rounded-xl px-6 py-4 text-center">
                  <span className="text-green-400 font-mono text-xl font-bold">localhost:3000</span>
                </div>

                <p className="text-base text-gray-600 leading-relaxed">
                  หรือ<strong className="text-gray-800">คลิกลิงก์ที่ AI แปะให้</strong>ในแชทได้เลย จะเปิดหน้า OpenClaw ขึ้นมาอัตโนมัติ
                </p>

                <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                  <span className="text-4xl mb-3 block">🎉</span>
                  <p className="text-lg font-bold text-green-800 mb-1">ยินดีด้วย! คุณติดตั้ง OpenClaw สำเร็จแล้ว</p>
                  <p className="text-sm text-green-600">ตอนนี้คุณมี AI Agent ส่วนตัวทำงานอยู่ในเครื่องแล้วครับ</p>
                </div>

                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-lg">
                  <img
                    src="/videos/gif-open-browser.gif"
                    alt="ตัวอย่างการเปิด Browser แล้วเจอ OpenClaw"
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-xs text-center text-gray-400 mt-2">วิธีแก้ปัญหา Error ต่างๆ</p>
              </div>
            </div>

          </div>
        </div>

        {/* ── เจอปัญหา? ── */}
        <section className="bg-white rounded-2xl border border-orange-200 p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">เจอปัญหาหรือ Error?</h2>
          </div>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            ไม่ต้องกังวลครับ คอมพิวเตอร์แต่ละเครื่องไม่เหมือนกัน บางทีอาจมีข้อความ Error สีแดงขึ้นมา
            — <strong className="text-gray-800">เป็นเรื่องปกติ</strong> วิธีแก้ง่ายมาก:
          </p>

          <div className="space-y-4">
            <div className="flex gap-4 bg-orange-50 rounded-xl border border-orange-200 p-5">
              <span className="text-2xl flex-shrink-0">1️⃣</span>
              <p className="text-base text-gray-700 leading-relaxed">
                <strong>ก๊อปปี้ข้อความ Error</strong> ที่เห็น (ลากเมาส์คลุมข้อความสีแดง → คลิกขวา → Copy)
              </p>
            </div>
            <div className="flex gap-4 bg-orange-50 rounded-xl border border-orange-200 p-5">
              <span className="text-2xl flex-shrink-0">2️⃣</span>
              <div>
                <p className="text-base text-gray-700 leading-relaxed mb-3">
                  <strong>วางในแชท</strong>แล้วพิมพ์ต่อท้ายว่า:
                </p>
                <div className="bg-slate-900 rounded-lg px-5 py-3 inline-flex items-center">
                  <span className="text-green-400 font-mono text-base">"Fix this error and continue"</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 bg-orange-50 rounded-xl border border-orange-200 p-5">
              <span className="text-2xl flex-shrink-0">3️⃣</span>
              <p className="text-base text-gray-700 leading-relaxed">
                <strong>กด Enter แล้วรอ</strong> — AI จะอ่าน Error แล้วหาวิธีแก้ไขและรันใหม่ให้เองครับ
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">คำถามที่พบบ่อย</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base font-semibold text-gray-800">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              สร้างสรรค์โดย{" "}
              <Link to="/portfolio" className="font-semibold text-blue-600 hover:underline">
                Anantasak Charoensuk
              </Link>
            </div>
            <p className="text-xs text-gray-400 text-center sm:text-right max-w-sm leading-relaxed">
              คู่มือนี้เป็นเพียงการแนะนำแนวทาง ผู้ใช้ควรตรวจสอบคำสั่งก่อนกด Accept ทุกครั้ง
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
