import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Globe,
  Instagram,
  Layers,
  MessageSquare,
  Send,
  Sparkles,
  Twitter,
  Facebook,
} from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

type PlatformKey = "facebook" | "instagram" | "twitter" | "line" | "tiktok";

interface PlatformConfig {
  id: PlatformKey;
  name: string;
  icon: typeof Facebook;
  color: string;
  activeColor: string;
  charLimit: number;
}

const platforms: PlatformConfig[] = [
  { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600", activeColor: "bg-blue-600", charLimit: 63206 },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-600", activeColor: "bg-pink-600", charLimit: 2200 },
  { id: "twitter", name: "X (Twitter)", icon: Twitter, color: "text-black", activeColor: "bg-black", charLimit: 280 },
  { id: "line", name: "LINE VOOM", icon: MessageSquare, color: "text-emerald-600", activeColor: "bg-emerald-600", charLimit: 1000 },
  { id: "tiktok", name: "TikTok", icon: Globe, color: "text-rose-600", activeColor: "bg-rose-600", charLimit: 2200 },
];

export function SyncSocialDemo() {
  const { lang } = useLang();
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformKey[]>(["facebook", "instagram", "twitter"]);
  const [activePreviewPlatform, setActivePreviewPlatform] = useState<PlatformKey>("facebook");
  const [postContent, setPostContent] = useState(
    "🚀 แนะนำฟีเจอร์ใหม่: Multi-Agent Orchestration บนแพลตฟอร์มของเรา ช่วยให้คุณเชื่อมต่อ AI เข้ากับระบบงานเดิมได้ภายใน 5 นาที!\n\n#AIProduct #Automation #NextGen #Tech"
  );
  const [isScheduled, setIsScheduled] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [activeTab, setActiveTab] = useState<"composer" | "analytics">("composer");

  const togglePlatform = (id: PlatformKey) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((p) => p !== id) : prev) : [...prev, id]
    );
  };

  const generateAICaption = (tone: "engaging" | "professional" | "concise") => {
    if (tone === "engaging") {
      setPostContent(
        "🔥 อยากปลดล็อกพลัง AI ให้ธุรกิจของคุณไหม? ระบบใหม่ช่วยลดเวลาทำงานซ้ำซากลง 80% ทันทีที่เชื่อมต่อ ลองดูรายละเอียดในโพสต์นี้เลย! 👇✨\n\n#PracticalAI #BusinessGrowth #TechInnovations"
      );
    } else if (tone === "professional") {
      setPostContent(
        "ประกาศเปิดตัวความสามารถใหม่: ระบบจัดการข้อมูลแบบอัตโนมัติที่ออกแบบมาเพื่อรองรับงานระดับ Enterprise พร้อมมาตรฐานความปลอดภัยสูงสุด\n\n#EnterpriseTech #DataAutomation #SystemArchitecture"
      );
    } else {
      setPostContent(
        "⚡ สรุปอัปเดตสัปดาห์นี้: เร็วขึ้น 2 เท่า ปลอดภัยขึ้น พร้อมเชื่อมต่อทุกแพลตฟอร์มในคลิกเดียว\n\n#BuildUpdate #ANAN"
      );
    }
  };

  const handlePublish = () => {
    setIsPublished(true);
    setTimeout(() => setIsPublished(false), 3000);
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/[0.08] bg-white text-[#1d1d1f] shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] bg-[#f5f5f7] px-6 py-4">
        <div className="flex items-center gap-3">
          <Layers className="h-5 w-5 text-[#0071e3]" />
          <div>
            <h3 className="font-semibold text-[#1d1d1f]">
              SyncSocial Publishing Dashboard · Live Product Sandbox
            </h3>
            <p className="text-xs text-[#6e6e73]">
              {lang === "th"
                ? "เขียนโพสต์ครั้งเดียว พรีวิวและเผยแพร่ข้ามทุกโซเชียลมีเดียได้อย่างแม่นยำ"
                : "Compose once, customize per channel, and simulate multi-platform deployment"}
            </p>
          </div>
        </div>

        <div className="inline-flex rounded-full border border-black/[0.08] bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("composer")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
              activeTab === "composer" ? "bg-[#0071e3] text-white shadow-sm" : "text-[#6e6e73] hover:text-[#1d1d1f]"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Composer</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
              activeTab === "analytics" ? "bg-[#0071e3] text-white shadow-sm" : "text-[#6e6e73] hover:text-[#1d1d1f]"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {activeTab === "composer" ? (
        <div className="grid gap-6 p-6 lg:grid-cols-12">
          {/* Left Column: Post Composer */}
          <div className="space-y-5 lg:col-span-7">
            {/* Platform Selection Badges */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
                1. Select Channels to Publish
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {platforms.map((p) => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                        isSelected
                          ? "border-[#0071e3] bg-[#0071e3]/10 text-[#0071e3]"
                          : "border-black/[0.08] bg-[#fbfbfd] text-[#86868b] hover:border-black/20 hover:text-[#1d1d1f]"
                      }`}
                    >
                      <p.icon className="h-3.5 w-3.5" />
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Caption Presets */}
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
                  2. AI Caption Presets
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#0071e3]">
                  <Sparkles className="h-3 w-3" /> 1-Click Generate
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => generateAICaption("engaging")}
                  className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-medium text-[#1d1d1f] transition hover:border-[#0071e3] hover:bg-[#0071e3]/5"
                >
                  🔥 Engaging & Viral
                </button>
                <button
                  type="button"
                  onClick={() => generateAICaption("professional")}
                  className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-medium text-[#1d1d1f] transition hover:border-[#0071e3] hover:bg-[#0071e3]/5"
                >
                  💼 Professional & B2B
                </button>
                <button
                  type="button"
                  onClick={() => generateAICaption("concise")}
                  className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-medium text-[#1d1d1f] transition hover:border-[#0071e3] hover:bg-[#0071e3]/5"
                >
                  ⚡ Short & Punchy
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <textarea
                rows={4}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Write your unified caption here..."
                className="w-full rounded-2xl border border-black/[0.1] bg-[#fbfbfd] p-4 text-xs leading-relaxed text-[#1d1d1f] focus:border-[#0071e3] focus:outline-none focus:ring-1 focus:ring-[#0071e3]"
              />
              
              {/* Hashtag Suggestions */}
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="font-mono text-[10px] text-[#6e6e73] self-center">Suggestions:</span>
                {["#AIProduct", "#FutureOfWork", "#TechInnovation", "#SaaS"].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setPostContent(prev => prev + " " + tag)}
                    className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-[#1d1d1f] transition hover:bg-black/10"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Character Limit Warnings */}
              <div className="mt-2 space-y-1">
                {selectedPlatforms.map(pid => {
                  const p = platforms.find(pl => pl.id === pid)!;
                  const chars = postContent.length;
                  const limit = p.charLimit;
                  const isNear = chars > limit - 20 && chars <= limit;
                  const isOver = chars > limit;
                  return (
                    <div key={p.id} className="flex justify-between font-mono text-[10px]">
                      <span className="text-[#6e6e73]">{p.name}</span>
                      <span className={`${isOver ? 'text-red-500 font-bold' : isNear ? 'text-amber-500 font-bold' : 'text-[#86868b]'}`}>
                        {chars} / {limit}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions: Schedule & Publish */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handlePublish}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#0071e3] px-6 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-[#0055b3]"
              >
                <Send className="h-4 w-4" />
                <span>{lang === "th" ? "จำลองการเผยแพร่ทันที" : "Simulate Publish Now"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsScheduled(!isScheduled)}
                className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-xs font-semibold transition ${
                  isScheduled
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-black/[0.1] bg-white text-[#1d1d1f] hover:bg-[#f5f5f7]"
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>{isScheduled ? "Scheduled for Tomorrow 09:00" : "Schedule Post"}</span>
              </button>
            </div>

            {isPublished && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>
                  {lang === "th"
                    ? `เผยแพร่จำลองไปยัง ${selectedPlatforms.join(", ").toUpperCase()} สำเร็จ!`
                    : `Simulated broadcast published to ${selectedPlatforms.join(", ").toUpperCase()}!`}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Platform Preview Simulator */}
          <div className="space-y-3 lg:col-span-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
                3. Channel Preview
              </span>
              <div className="flex gap-1">
                {selectedPlatforms.map((p) => {
                  const cfg = platforms.find((pl) => pl.id === p);
                  if (!cfg) return null;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setActivePreviewPlatform(p)}
                      className={`rounded p-1 transition ${
                        activePreviewPlatform === p
                          ? "bg-[#0071e3] text-white"
                          : "text-[#86868b] hover:bg-black/5 hover:text-[#1d1d1f]"
                      }`}
                      title={cfg.name}
                    >
                      <cfg.icon className="h-3.5 w-3.5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Social Mock Card */}
            <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-[#fbfbfd] p-4 shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-black/[0.06] pb-3">
                <div className="h-8 w-8 rounded-full bg-[#1d1d1f] flex items-center justify-center text-white font-bold text-xs">
                  AN
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1d1d1f]">ANAN Tech Lab</h4>
                  <p className="font-mono text-[10px] text-[#86868b]">
                    Just now · {activePreviewPlatform.toUpperCase()} Preview
                  </p>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-xs leading-relaxed text-[#1d1d1f]">
                {postContent}
              </p>

              {/* Sample Media Thumbnail */}
              <div className="mt-3 overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.03]">
                <img
                  src="/media/work/syncsocial-cover.webp"
                  alt="SyncSocial mock visual"
                  className="aspect-video w-full object-cover"
                />
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-2 text-[10px] text-[#86868b]">
                <span>❤️ 128 Likes</span>
                <span>💬 24 Comments</span>
                <span>🔁 18 Reposts</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Analytics Tab View */
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Total Reach", value: "128.4K", change: "+24.2%" },
              { label: "Engagement Rate", value: "8.4%", change: "+3.5%" },
              { label: "Top Channel", value: "Facebook", change: "45% share" },
              { label: "Time Saved", value: "32.5 hrs", change: "This month" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-black/[0.08] bg-[#fbfbfd] p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#6e6e73]">{stat.label}</p>
                <h4 className="mt-2 text-2xl font-bold text-[#1d1d1f]">{stat.value}</h4>
                <p className="mt-1 font-mono text-[11px] font-semibold text-emerald-700">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Per-platform Breakdown */}
            <div className="rounded-2xl border border-black/[0.08] bg-white p-5">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6e6e73] mb-4">Platform Breakdown</h4>
              <div className="space-y-4">
                {[
                  { name: "Facebook", reach: "58.2K", engage: "6.2%", bar: "w-[85%]", color: "bg-blue-500" },
                  { name: "Instagram", reach: "42.1K", engage: "11.4%", bar: "w-[65%]", color: "bg-pink-500" },
                  { name: "X (Twitter)", reach: "18.5K", engage: "4.8%", bar: "w-[30%]", color: "bg-black" },
                  { name: "LINE VOOM", reach: "9.6K", engage: "3.1%", bar: "w-[15%]", color: "bg-emerald-500" },
                ].map(p => (
                  <div key={p.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-[#6e6e73]">{p.reach} reach · {p.engage} ER</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-black/5">
                      <div className={`h-full rounded-full ${p.color} ${p.bar}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Post History */}
            <div className="rounded-2xl border border-black/[0.08] bg-white p-5">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6e6e73] mb-4">Recent Published Posts</h4>
              <div className="space-y-3">
                {[
                  { content: "🚀 เปิดตัวระบบ AI Agent ใหม่ล่าสุด ช่วยลดเวลาทำงาน...", platforms: ["FB", "IG", "X"], time: "2 hours ago", status: "Published" },
                  { content: "💡 Tip of the day: การใช้ Webhook ให้มีประสิทธิภาพ...", platforms: ["FB", "LINE"], time: "Yesterday", status: "Published" },
                  { content: "สรุป Insight วงการเทคฯ สัปดาห์นี้ ส่งตรงถึงมือคุณ...", platforms: ["FB", "IG", "X", "LINE"], time: "3 days ago", status: "Published" },
                ].map((post, i) => (
                  <div key={i} className="rounded-xl border border-black/[0.06] bg-[#fbfbfd] p-3 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex gap-1">
                        {post.platforms.map(pl => (
                          <span key={pl} className="px-1.5 py-0.5 rounded bg-black/5 text-[9px] font-mono font-bold text-[#6e6e73]">{pl}</span>
                        ))}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold">{post.status}</span>
                    </div>
                    <p className="text-[#1d1d1f] line-clamp-1">{post.content}</p>
                    <p className="mt-1 text-[10px] text-[#86868b]">{post.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
