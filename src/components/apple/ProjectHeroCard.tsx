import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { WorkVisual } from "@/components/editorial/WorkVisual";
import { getLocalizedWorkItem, type WorkItem } from "@/data/work";
import { useLang } from "@/i18n/LanguageContext";

interface ProjectHeroCardProps {
  item: WorkItem;
  featured?: boolean;
  index?: number;
}

export function ProjectHeroCard({ item, featured = false, index = 0 }: ProjectHeroCardProps) {
  const { lang, t } = useLang();
  const localized = getLocalizedWorkItem(item, lang);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotate({
      x: (0.5 - y) * 7,
      y: (x - 0.5) * 7,
    });
    setGlow({
      x: x * 100,
      y: y * 100,
      opacity: 1,
    });
  };

  const handlePointerLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlow((prev) => ({ ...prev, opacity: 0 }));
  };

  const getMaturityStyle = (maturity: string) => {
    if (maturity.includes("Production")) {
      return "border-[#0071e3]/30 bg-[#0071e3]/10 text-[#0071e3]";
    }
    if (maturity.includes("Prototype") || maturity.includes("ต้นแบบ")) {
      return "border-emerald-600/30 bg-emerald-50 text-emerald-700";
    }
    return "border-purple-600/30 bg-purple-50 text-purple-700";
  };

  if (featured) {
    return (
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 200ms ease-out",
        }}
        className="group relative overflow-hidden rounded-[2.5rem] border border-black/[0.08] bg-white/85 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.06)] backdrop-blur-3xl transition-all duration-300 hover:border-black/15 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:p-10 lg:p-12"
      >
        {/* Specular Spotlight on White Glass */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] transition-opacity duration-300"
          style={{
            opacity: glow.opacity,
            background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(0, 113, 227, 0.06), transparent 45%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Visual Showcase */}
          <Link
            to={`/work/${item.slug}`}
            className="block overflow-hidden rounded-[1.8rem] border border-black/[0.06] shadow-md transition-transform duration-500 group-hover:scale-[1.01]"
          >
            <WorkVisual item={item} eager interactive className="w-full" />
          </Link>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider ${getMaturityStyle(
                    localized.maturity
                  )}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {localized.maturity}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#86868b]">
                  {item.year} · Case 0{index + 1}
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-5xl">
                {localized.title}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#6e6e73] sm:text-lg">
                {localized.summary}
              </p>
            </div>

            {/* Core Decisions / Flow Highlights */}
            <div className="space-y-2.5 rounded-2xl border border-black/[0.06] bg-black/[0.02] p-4 sm:p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#86868b]">
                {t("work.flowTitle")}
              </p>
              <div className="grid gap-2 text-xs text-[#1d1d1f] sm:text-sm">
                {localized.flow.map((step, i) => (
                  <div key={step} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/[0.06] font-mono text-[10px] font-bold text-[#0071e3]">
                      0{i + 1}
                    </span>
                    <span className="truncate text-[#434346]">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] pt-5">
              <div className="flex flex-wrap gap-1.5">
                {item.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/[0.06] bg-black/[0.03] px-2.5 py-1 font-mono text-[10px] font-medium text-[#6e6e73]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                to={`/work/${item.slug}`}
                className="group/btn inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0071e3]"
              >
                <span>{t("work.readStory")}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 200ms ease-out",
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-black/[0.08] bg-white/85 p-6 shadow-md backdrop-blur-2xl transition-all duration-300 hover:border-black/15 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-7"
    >
      {/* Specular Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[2rem] transition-opacity duration-300"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(450px circle at ${glow.x}% ${glow.y}%, rgba(0, 113, 227, 0.06), transparent 40%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-5">
        <Link
          to={`/work/${item.slug}`}
          className="block overflow-hidden rounded-2xl border border-black/[0.06] shadow-sm transition-transform duration-300 group-hover:scale-[1.01]"
        >
          <WorkVisual item={item} eager={index < 2} className="w-full" />
        </Link>

        <div>
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${getMaturityStyle(
                localized.maturity
              )}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {localized.maturity}
            </span>
            <span className="font-mono text-[11px] text-[#86868b]">{item.year}</span>
          </div>

          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1d1d1f] transition group-hover:text-[#0071e3]">
            {localized.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-[#6e6e73] line-clamp-2">
            {localized.summary}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-black/[0.08] pt-4">
        <div className="flex flex-wrap gap-1.5">
          {item.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-black/[0.06] bg-black/[0.03] px-2 py-0.5 font-mono text-[9px] font-medium text-[#86868b]"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          to={`/work/${item.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] transition hover:underline"
        >
          <span>{t("work.readStory")}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
