import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Cpu,
  Layers,
  Workflow,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProjectHeroCard } from "@/components/apple/ProjectHeroCard";
import { SkillsMarquee } from "@/components/apple/SkillsMarquee";
import { TechStackMatrix } from "@/components/apple/TechStackMatrix";
import { EditorialLayout } from "@/components/editorial/EditorialLayout";
import { Reveal } from "@/components/editorial/Reveal";
import { workItems } from "@/data/work";
import { useLang } from "@/i18n/LanguageContext";
import { useNotes } from "@/hooks/useNotes";
import { useSEO } from "@/hooks/useSEO";

export function LandingPage() {
  const { lang, t } = useLang();
  const { notes } = useNotes();
  const [featured, ...restProjects] = workItems;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("anantasak.business@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useSEO({
    title:
      lang === "th"
        ? "ANANTASAK CHAROENSUK (ANAN) — Practical AI Product Builder"
        : "ANANTASAK CHAROENSUK — Practical AI Product Builder",
    description:
      lang === "th"
        ? "อนันตศักดิ์ เจริญสุข — ผู้พัฒนาและวางระบบ AI Product ที่ใช้งานได้จริง"
        : "ANAN turns complex business problems and agent orchestrations into intuitive, practical AI products.",
    url: "https://anantasak.com/",
  });

  return (
    <EditorialLayout>
      {/* ── 1. Apple Clean White Hero Section ── */}
      <section className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8 sm:py-32">
        <Reveal>
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-xl transition hover:border-black/15">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1d1d1f]">
              {t("hero.status")}
            </span>
          </div>

          {/* Main Hero Name with Apple typography */}
          <h1 className="mt-8 text-[clamp(2.8rem,8.5vw,7.8rem)] font-bold leading-[0.9] tracking-[-0.065em] text-[#1d1d1f]">
            <span className="apple-metallic-text">ANANTASAK</span>
            <br />
            <span className="text-[#1d1d1f]">CHAROENSUK</span>
          </h1>

          {/* Signature Line */}
          <div className="mt-6 flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] text-[#0071e3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            <span>{t("hero.signature")}</span>
          </div>

          {/* Subtitle & Value Proposition */}
          <div className="mt-8 grid gap-8 border-t border-black/[0.08] pt-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <p className="max-w-2xl text-xl font-normal leading-relaxed text-[#6e6e73] sm:text-2xl sm:leading-snug">
              {t("hero.tagline")}
            </p>

            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              <Link
                to="/work"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-[#0071e3]"
              >
                <span>{t("hero.explore")}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white/80 px-5 py-3.5 text-sm font-semibold text-[#1d1d1f] shadow-sm backdrop-blur-md transition hover:border-black/20 hover:bg-white"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>{t("hero.copied")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[#86868b]" />
                    <span>{t("hero.copyEmail")}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Key Spec Pillars */}
          <div className="mt-14 grid grid-cols-2 gap-4 border-t border-black/[0.08] pt-8 sm:grid-cols-4">
            {[
              { icon: Layers, label: t("spec.flagships.title"), sub: t("spec.flagships.sub") },
              { icon: Cpu, label: t("spec.orchestration.title"), sub: t("spec.orchestration.sub") },
              { icon: Workflow, label: t("spec.pipelines.title"), sub: t("spec.pipelines.sub") },
              { icon: Zap, label: t("spec.human.title"), sub: t("spec.human.sub") },
            ].map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl border border-black/[0.06] bg-white/75 p-4 shadow-sm backdrop-blur-md"
              >
                <spec.icon className="h-5 w-5 text-[#0071e3]" />
                <p className="mt-3 text-sm font-semibold text-[#1d1d1f]">{spec.label}</p>
                <p className="mt-1 font-mono text-[11px] text-[#86868b]">{spec.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 2. Apple Skills Infinite Marquee ── */}
      <Reveal>
        <SkillsMarquee />
      </Reveal>

      {/* ── 3. Featured Project Stage (Currently Building) ── */}
      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                {t("work.featuredBadge")}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-5xl">
                {t("work.featuredTitle")}
              </h2>
            </div>
            <Link
              to={`/work/${featured.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0071e3] transition hover:underline"
            >
              <span>{t("work.fullStory")}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Immersive Apple Stage Card */}
          <ProjectHeroCard item={featured} featured index={0} />
        </Reveal>
      </section>

      {/* ── 4. Selected Work Bento Grid ── */}
      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                {t("work.selectedSubtitle")}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-5xl">
                {t("work.selectedTitle")}
              </h2>
            </div>
            <Link
              to="/work"
              className="hidden items-center gap-1.5 text-sm font-semibold text-[#0071e3] transition hover:underline sm:inline-flex"
            >
              <span>{t("work.viewAll")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {restProjects.map((item, idx) => (
            <Reveal key={item.slug} delay={idx * 0.05}>
              <ProjectHeroCard item={item} index={idx + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 5. Apple Tech Stack & Tools Matrix ── */}
      <Reveal>
        <TechStackMatrix />
      </Reveal>

      {/* ── 6. Technical Build Notes & Knowledge Vault ── */}
      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                {t("notes.tag")}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-5xl">
                {t("notes.title")}
              </h2>
            </div>
            <Link
              to="/notes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0071e3] transition hover:underline"
            >
              <span>{t("notes.viewAll")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 divide-y divide-black/[0.08] rounded-[2rem] border border-black/[0.08] bg-white/80 p-6 shadow-sm backdrop-blur-2xl sm:p-8">
          {notes.slice(0, 4).map((note, index) => (
            <Reveal key={note._id} delay={index * 0.03}>
              <Link
                to={note.href ?? `/notes/${note.slug}`}
                className="group grid gap-3 py-5 transition sm:grid-cols-[180px_1fr_auto] sm:items-center sm:gap-6"
              >
                <div>
                  <span className="inline-block rounded-full border border-black/[0.08] bg-black/[0.03] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#0071e3]">
                    {note.contentType} · {note.language}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] transition group-hover:text-[#0071e3] sm:text-xl">
                    {note.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6e6e73] line-clamp-2">
                    {note.description}
                  </p>
                </div>
                <ArrowUpRight className="hidden h-5 w-5 text-[#86868b] transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#0071e3] sm:block" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 7. Apple Closing Contact Deck ── */}
      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-black/[0.08] bg-white/90 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-3xl sm:p-16">
            {/* Ambient specular highlight */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-[#0071e3]/10 blur-[90px]"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
                {t("contact.tag")}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-[#1d1d1f] sm:text-6xl">
                {t("contact.title")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#6e6e73] sm:text-xl">
                {t("contact.desc")}
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:anantasak.business@gmail.com?subject=ANAN%20%E2%80%94%20Let%27s%20build%20something%20practical"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-[#0071e3]"
                >
                  <span>{t("contact.sendEmail")}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-6 py-3.5 text-sm font-semibold text-[#1d1d1f] shadow-sm backdrop-blur-md transition hover:border-black/20 hover:bg-[#f5f5f7]"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>{t("hero.copied")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-[#86868b]" />
                      <span>{t("contact.copyLabel")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </EditorialLayout>
  );
}
