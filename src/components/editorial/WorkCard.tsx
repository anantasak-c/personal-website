import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getLocalizedWorkItem, type WorkItem } from "@/data/work";
import { WorkVisual } from "@/components/editorial/WorkVisual";
import { useLang } from "@/i18n/LanguageContext";

interface WorkCardProps {
  item: WorkItem;
  index: number;
  featured?: boolean;
}

export function WorkCard({ item, index, featured = false }: WorkCardProps) {
  const { lang, t } = useLang();
  const localized = getLocalizedWorkItem(item, lang);

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
      <Link
        to={`/work/${item.slug}`}
        className="group block overflow-hidden rounded-[2.5rem] border border-black/[0.08] bg-white/85 text-[#1d1d1f] shadow-[0_16px_40px_rgba(0,0,0,0.05)] backdrop-blur-2xl transition-all duration-300 hover:border-black/15 hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-4"
      >
        <WorkVisual item={item} eager interactive />
        <div className="grid gap-8 p-7 sm:p-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider ${getMaturityStyle(
                  localized.maturity
                )}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {localized.maturity}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#0071e3]">
                01 · {t("work.featuredTitle")}
              </span>
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[#1d1d1f] sm:text-6xl">
              {localized.title}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-[#6e6e73]">{localized.summary}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0071e3]">
              {t("work.readStory")}{" "}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  const imageFirst = index % 2 === 0;

  return (
    <Link
      to={`/work/${item.slug}`}
      className="group grid gap-7 border-t border-black/[0.08] py-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-4 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-12"
    >
      <div
        className={`overflow-hidden rounded-[2rem] border border-black/[0.06] shadow-sm lg:col-span-7 ${
          imageFirst ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <WorkVisual item={item} className="w-full" />
      </div>
      <div className={`lg:col-span-5 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${getMaturityStyle(
              localized.maturity
            )}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {localized.maturity}
          </span>
          <span className="font-mono text-xs text-[#86868b]">
            {String(index + 1).padStart(2, "0")} · {item.year}
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] transition group-hover:text-[#0071e3] sm:text-4xl">
          {localized.title}
        </h2>
        <p className="mt-4 text-lg leading-8 text-[#6e6e73]">{localized.summary}</p>
        <p className="mt-5 text-sm leading-6 text-[#86868b]">
          <span className="font-medium text-[#1d1d1f]">{t("workDetail.role")}</span> {localized.role}
        </p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0071e3]">
          {t("work.readStory")}{" "}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </Link>
  );
}
