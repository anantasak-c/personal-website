import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SkillsMarquee } from "@/components/apple/SkillsMarquee";
import { EditorialLayout } from "@/components/editorial/EditorialLayout";
import { Reveal } from "@/components/editorial/Reveal";
import { personalInfo } from "@/data/content";
import { useLang } from "@/i18n/LanguageContext";
import { useSEO } from "@/hooks/useSEO";

export function AboutPage() {
  const { lang, t } = useLang();

  useSEO({
    title: lang === "th" ? "เกี่ยวกับ ANAN — Practical AI Product Builder" : "About ANAN — Practical AI Product Builder",
    description: "The story, philosophy, and working principles behind ANAN's practical AI products.",
    url: "https://anantasak.com/about",
  });

  return (
    <EditorialLayout>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-12 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[1.75rem] border border-black/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:rounded-[2.5rem]">
            <img
              src={personalInfo.avatar}
              alt="Anantasak Charoensuk"
              width="800"
              height="1000"
              className="aspect-[4/5] w-full max-w-md object-cover transition duration-700 hover:scale-105"
            />
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0071e3] sm:mt-4 sm:text-xs sm:tracking-[0.2em]">
            {t("about.location")}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0071e3] sm:text-xs sm:tracking-[0.2em]">
            ANANTASAK CHAROENSUK · {t("nav.about")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:mt-5 sm:text-6xl lg:text-7xl">
            {t("about.title")}
          </h1>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-[#6e6e73] sm:mt-10 sm:space-y-7 sm:text-xl">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-black/[0.08] bg-white/80 p-5 shadow-sm sm:mt-12 sm:grid-cols-3 sm:gap-6 sm:p-8">
            {[
              { label: "Build", value: t("about.pillar1") },
              { label: "Think", value: t("about.pillar2") },
              { label: "Share", value: t("about.pillar3") },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0071e3] sm:text-[11px]">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-[#1d1d1f] sm:mt-2 sm:text-base">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
            <a
              href="mailto:anantasak.business@gmail.com?subject=ANAN%20%E2%80%94%20Introduction"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#0071e3] sm:w-auto"
            >
              <span>{t("about.sayHello")}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              to="/resume"
              className="inline-flex items-center justify-center gap-2 font-mono text-sm font-semibold text-[#6e6e73] hover:text-[#0071e3] sm:justify-start"
            >
              {t("about.viewResume")} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Skills Marquee Showcase ── */}
      <Reveal>
        <div className="border-t border-black/[0.08] bg-white/40 backdrop-blur-xl">
          <SkillsMarquee />
        </div>
      </Reveal>
    </EditorialLayout>
  );
}
