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
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[2.5rem] border border-black/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
            <img
              src={personalInfo.avatar}
              alt="Anantasak Charoensuk"
              width="800"
              height="1000"
              className="aspect-[4/5] w-full max-w-md object-cover transition duration-700 hover:scale-105"
            />
          </div>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
            {t("about.location")}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
            ANANTASAK CHAROENSUK · {t("nav.about")}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-[#1d1d1f] sm:text-6xl lg:text-7xl">
            {t("about.title")}
          </h1>

          <div className="mt-10 space-y-7 text-lg leading-relaxed text-[#6e6e73] sm:text-xl">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>

          <div className="mt-12 grid gap-6 rounded-2xl border border-black/[0.08] bg-white/80 p-8 shadow-sm sm:grid-cols-3">
            {[
              { label: "Build", value: t("about.pillar1") },
              { label: "Think", value: t("about.pillar2") },
              { label: "Share", value: t("about.pillar3") },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0071e3]">
                  {item.label}
                </p>
                <p className="mt-2 text-base font-semibold text-[#1d1d1f]">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="mailto:anantasak.business@gmail.com?subject=ANAN%20%E2%80%94%20Introduction"
              className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0071e3]"
            >
              <span>{t("about.sayHello")}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#6e6e73] hover:text-[#0071e3]"
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
