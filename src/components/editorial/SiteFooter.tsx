import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { personalInfo } from "@/data/content";
import { useLang } from "@/i18n/LanguageContext";

export function SiteFooter() {
  const { t } = useLang();

  return (
    <footer className="relative z-10 border-t border-black/[0.08] bg-[#f5f5f7]/80 backdrop-blur-2xl">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            <span>{t("footer.title")}</span>
          </div>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#6e6e73] sm:text-lg">
            {t("footer.desc")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm">
          <a
            href="https://www.facebook.com/m.anan.tasuk/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-[#0071e3] transition hover:text-[#0055b3] hover:underline"
          >
            <span>{t("footer.facebook")}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <Link to="/work" className="text-[#6e6e73] transition hover:text-[#1d1d1f]">
            {t("nav.work")}
          </Link>
          <Link to="/notes" className="text-[#6e6e73] transition hover:text-[#1d1d1f]">
            {t("nav.notes")}
          </Link>
          <Link to="/about" className="text-[#6e6e73] transition hover:text-[#1d1d1f]">
            {t("nav.about")}
          </Link>
          <Link to="/resume" className="text-[#6e6e73] transition hover:text-[#1d1d1f]">
            {t("nav.resume")}
          </Link>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-[#6e6e73] transition hover:text-[#1d1d1f]"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
