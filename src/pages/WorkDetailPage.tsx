import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { SystemFlowVisualizer } from "@/components/apple/SystemFlowVisualizer";
import { CloudAssistantDemo } from "@/components/demos/CloudAssistantDemo";
import { CommerceChatbotDemo } from "@/components/demos/CommerceChatbotDemo";
import { NewsCurationDemo } from "@/components/demos/NewsCurationDemo";
import { SyncSocialDemo } from "@/components/demos/SyncSocialDemo";
import { TrackingSenderDemo } from "@/components/demos/TrackingSenderDemo";
import { EditorialLayout } from "@/components/editorial/EditorialLayout";
import { ReadingProgress } from "@/components/editorial/ReadingProgress";
import { Reveal } from "@/components/editorial/Reveal";
import { WorkVisual } from "@/components/editorial/WorkVisual";
import { getLocalizedWorkItem, getWorkItem } from "@/data/work";
import { useLang } from "@/i18n/LanguageContext";
import { useNotes } from "@/hooks/useNotes";
import { useSEO } from "@/hooks/useSEO";

export function WorkDetailPage() {
  const { lang, t } = useLang();
  const { slug } = useParams<{ slug: string }>();
  const rawItem = getWorkItem(slug);
  const item = rawItem ? getLocalizedWorkItem(rawItem, lang) : undefined;
  const { notes } = useNotes();
  const buildLog = notes.filter((note) => note.relatedWork === slug);
  const [activeStageView, setActiveStageView] = useState<"demo" | "flow" | "object">("demo");

  useSEO({
    title: item ? `${item.title} — Project Story & Live Demo · ANAN` : "Work not found",
    description: item?.summary ?? "Selected work by ANAN.",
  });

  if (!item || !rawItem) {
    return (
      <EditorialLayout>
        <div className="mx-auto max-w-3xl px-5 py-28 text-center">
          <h1 className="text-4xl font-semibold text-[#1d1d1f]">Work not found.</h1>
          <Link to="/work" className="mt-6 inline-flex items-center gap-2 text-[#0071e3]">
            <ArrowLeft className="h-4 w-4" /> {t("workDetail.back")}
          </Link>
        </div>
      </EditorialLayout>
    );
  }

  // Render project-specific live demo simulator
  const renderLiveDemo = (projectSlug: string) => {
    switch (projectSlug) {
      case "cloud-assistant":
        return <CloudAssistantDemo />;
      case "tracking-sender-dashboard":
        return <TrackingSenderDemo />;
      case "ai-commerce-chatbot":
        return <CommerceChatbotDemo />;
      case "ai-news-curation":
        return <NewsCurationDemo />;
      case "syncsocial":
        return <SyncSocialDemo />;
      default:
        return <SyncSocialDemo />;
    }
  };

  return (
    <EditorialLayout>
      <ReadingProgress />
      <article>
        {/* Header Stage */}
        <section className="mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pb-16 sm:pt-20">
          <Reveal>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#86868b] transition hover:text-[#0071e3]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {t("workDetail.back")}
            </Link>

            <div className="mt-8 grid gap-9 lg:grid-cols-[1.1fr_0.8fr] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                  Project Story · {item.maturity} · {item.year}
                </p>
                <h1 className="mt-4 text-balance text-4xl font-bold tracking-[-0.055em] text-[#1d1d1f] sm:text-6xl lg:text-[5rem] lg:leading-[0.96]">
                  {item.title}
                </h1>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-[#6e6e73] sm:text-xl">{item.outcome}</p>
                <p className="mt-5 text-sm text-[#86868b]">
                  <span className="font-medium text-[#1d1d1f]">{t("workDetail.role")}</span> {item.role}
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Segmented Mode Switcher (Live Demo vs System Architecture vs Product Showcase) ── */}
          <Reveal className="mt-10" delay={0.06}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] pb-4">
              <div className="inline-flex rounded-full border border-black/[0.08] bg-white/80 p-1.5 shadow-sm backdrop-blur-xl">
                {([
                  { key: "demo" as const, icon: Play, label: lang === "th" ? "🚀 ทดลองใช้งานจริง" : "🚀 Live Product Demo" },
                  { key: "flow" as const, icon: Workflow, label: lang === "th" ? "📐 สถาปัตยกรรมระบบ" : "📐 System Architecture" },
                  { key: "object" as const, icon: Sparkles, label: lang === "th" ? "✨ Product Showcase" : "✨ Product Showcase" },
                ]).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveStageView(tab.key)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                      activeStageView === tab.key
                        ? "bg-[#0071e3] text-white shadow-md scale-[1.02]"
                        : "text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.03]"
                    }`}
                  >
                    <tab.icon className="h-3.5 w-3.5 fill-current" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#0071e3]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0071e3]" />
                {lang === "th" ? "ระบบจำลองที่ใช้งานได้จริง" : "Real Working Simulator"}
              </span>
            </div>
          </Reveal>

          {/* ── Active Showcase Area with Crossfade Transition ── */}
          <Reveal className="mt-6" delay={0.08}>
            <div className="relative min-h-[400px]">
              {activeStageView === "demo" && (
                <div className="animate-[fadeSlideIn_400ms_ease-out_both]">
                  {renderLiveDemo(rawItem.slug)}
                </div>
              )}

              {activeStageView === "flow" && (
                <div className="animate-[fadeSlideIn_400ms_ease-out_both]">
                  <SystemFlowVisualizer item={rawItem} />
                </div>
              )}

              {activeStageView === "object" && (
                <div className="animate-[fadeSlideIn_400ms_ease-out_both]">
                  <div className="overflow-hidden rounded-[2.5rem] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-3xl">
                    <WorkVisual item={rawItem} eager interactive className="w-full" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#86868b]">
                    <span>{t("work.interactiveNotice")}</span>
                    <span>{t("work.exploreNotice")}</span>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </section>

        {/* 3-Pillar Breakdown */}
        <section className="border-y border-black/[0.08] bg-[#f5f5f7]/60 backdrop-blur-xl">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-3">
            {[
              { label: t("workDetail.problem"), body: item.problem },
              { label: t("workDetail.built"), body: item.approach },
              { label: t("workDetail.outcome"), body: item.outcome },
            ].map((part, index) => (
              <Reveal key={part.label} delay={index * 0.06}>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                  {part.label}
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#1d1d1f] sm:text-lg">
                  {part.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 3-Stage Flow */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                {t("workDetail.howItWorks")}
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[#1d1d1f]">
                {t("workDetail.stages")}
              </h2>
            </div>
            <ol className="divide-y divide-black/[0.08] rounded-3xl border border-black/[0.08] bg-white/80 px-6 shadow-sm backdrop-blur-xl sm:px-8">
              {item.flow.map((step, index) => (
                <li
                  key={step}
                  className="grid grid-cols-[48px_1fr] items-start gap-4 py-7 text-lg leading-relaxed text-[#1d1d1f] sm:text-xl"
                >
                  <span className="font-mono text-xs font-bold text-[#0071e3]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* Key Architectural Decisions */}
        <section className="border-y border-black/[0.08] bg-[#f5f5f7]/60 backdrop-blur-xl">
          <Reveal className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                {t("workDetail.decisions")}
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">
                {t("workDetail.decisionsSubtitle")}
              </h2>
            </div>
            <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {item.decisions.map((decision) => (
                <p key={decision} className="py-6 text-base leading-relaxed text-[#1d1d1f] sm:text-lg">
                  {decision}
                </p>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Evidence & Next */}
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-black/[0.08] bg-white/80 p-8 shadow-sm backdrop-blur-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
              {t("workDetail.evidence")}
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-[#1d1d1f] sm:text-3xl">
              Outcome
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#6e6e73] sm:text-lg">{item.outcome}</p>
          </Reveal>
          <Reveal
            delay={0.06}
            className="rounded-3xl border border-black/[0.08] bg-white/80 p-8 shadow-sm backdrop-blur-xl"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
              {t("workDetail.whatChanged")}
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-[#1d1d1f] sm:text-3xl">
              {t("workDetail.nextStep")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#6e6e73] sm:text-lg">{item.next}</p>
          </Reveal>
        </section>

        {/* Related Build Logs */}
        <section className="border-t border-black/[0.08] bg-[#f5f5f7]/60">
          <Reveal className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                  {t("workDetail.relatedNotes")}
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">
                  {t("workDetail.decisionsOverTime")}
                </h2>
              </div>
              <div>
                {buildLog.length ? (
                  <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
                    {buildLog.map((note) => (
                      <Link
                        key={note._id}
                        to={note.href ?? `/notes/${note.slug}`}
                        className="group flex items-start justify-between gap-5 py-5"
                      >
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-[#0071e3]">
                            {note.contentType} · {note.language}
                          </p>
                          <h3 className="mt-2 text-xl text-[#1d1d1f] transition group-hover:text-[#0071e3]">
                            {note.title}
                          </h3>
                        </div>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-[#0071e3] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg leading-8 text-[#86868b]">
                    {t("workDetail.noRelatedNotes")}
                  </p>
                )}
                <Link
                  to="/notes"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0071e3] hover:underline"
                >
                  {t("notes.viewAll")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal className="rounded-[2.5rem] border border-black/[0.08] bg-white/90 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-3xl sm:p-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
              {t("contact.tag")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-[#1d1d1f] sm:text-5xl">
              {t("workDetail.discuss")}
            </h2>
            <div className="mt-8 flex justify-center">
              <a
                href={`mailto:anantasak.business@gmail.com?subject=${encodeURIComponent(
                  `${item.title} — Portfolio inquiry`
                )}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-[#0071e3]"
              >
                <span>{t("contact.sendEmail")}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </section>
      </article>
    </EditorialLayout>
  );
}
