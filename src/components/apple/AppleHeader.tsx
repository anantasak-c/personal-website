import { NavLink, Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function AppleHeader() {
  const { lang, setLang, t } = useLang();

  const links = [
    { to: "/work", label: t("nav.work") },
    { to: "/notes", label: t("nav.notes") },
    { to: "/about", label: t("nav.about") },
    { to: "/resume", label: t("nav.resume") },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4 sm:top-6 sm:px-6">
      <div className="flex h-14 items-center justify-between rounded-full border border-black/[0.08] bg-white/80 px-4 shadow-[0_12px_36px_rgba(0,0,0,0.05)] backdrop-blur-2xl transition-all duration-300 hover:border-black/15 sm:h-16 sm:px-6">
        {/* Brand */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 font-mono text-sm font-semibold tracking-[0.2em] text-[#1d1d1f] transition-opacity hover:opacity-80"
          aria-label="ANAN home"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0071e3] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0071e3]" />
          </span>
          <span>ANAN</span>
          <span className="hidden text-xs text-[#86868b] sm:inline-block">/ AI Builder</span>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Primary navigation" className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:text-sm ${
                  isActive
                    ? "bg-black/[0.06] font-semibold text-[#1d1d1f]"
                    : "text-[#6e6e73] hover:bg-black/[0.03] hover:text-[#1d1d1f]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions: Language Switcher & Contact CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Segmented TH/EN Language Toggle */}
          <div className="flex items-center rounded-full border border-black/[0.08] bg-black/[0.03] p-0.5">
            <button
              type="button"
              onClick={() => setLang("th")}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 sm:text-xs ${
                lang === "th"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#86868b] hover:text-[#1d1d1f]"
              }`}
              aria-label="Switch to Thai"
            >
              TH
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 sm:text-xs ${
                lang === "en"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#86868b] hover:text-[#1d1d1f]"
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>

          <a
            href="mailto:anantasak.business@gmail.com?subject=ANAN%20%E2%80%94%20Portfolio%20inquiry"
            className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-[#1d1d1f] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0071e3] sm:inline-flex"
          >
            <span>{t("nav.talk")}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
