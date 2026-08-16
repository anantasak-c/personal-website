import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function AppleHeader() {
  const { lang, setLang, t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: "/work", label: t("nav.work") },
    { to: "/notes", label: t("nav.notes") },
    { to: "/about", label: t("nav.about") },
    { to: "/resume", label: t("nav.resume") },
  ];

  return (
    <header className="sticky top-3 z-50 mx-auto w-full max-w-5xl px-3 sm:top-6 sm:px-6">
      <div className="flex h-13 items-center justify-between rounded-full border border-black/[0.08] bg-white/85 px-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.05)] backdrop-blur-2xl transition-all duration-300 hover:border-black/15 sm:h-16 sm:px-6">
        {/* Brand */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.18em] text-[#1d1d1f] transition-opacity hover:opacity-80 sm:text-sm sm:tracking-[0.2em]"
          aria-label="ANAN home"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0071e3] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0071e3]" />
          </span>
          <span>ANAN</span>
          <span className="hidden text-xs font-normal text-[#86868b] sm:inline-block">/ AI Builder</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1.5 sm:gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:text-sm ${
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

        {/* Right Actions: Language Switcher, Desktop CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Segmented TH/EN Language Toggle */}
          <div className="flex items-center rounded-full border border-black/[0.08] bg-black/[0.03] p-0.5">
            <button
              type="button"
              onClick={() => setLang("th")}
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-200 sm:px-2.5 sm:py-1 sm:text-xs ${
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
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-200 sm:px-2.5 sm:py-1 sm:text-xs ${
                lang === "en"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#86868b] hover:text-[#1d1d1f]"
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Desktop Contact CTA */}
          <a
            href="mailto:anantasak.business@gmail.com?subject=ANAN%20%E2%80%94%20Portfolio%20inquiry"
            className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-[#1d1d1f] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0071e3] sm:inline-flex"
          >
            <span>{t("nav.talk")}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08] bg-black/[0.03] text-[#1d1d1f] transition hover:bg-black/[0.06] md:hidden"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown Modal ── */}
      {mobileMenuOpen && (
        <div className="mt-2 overflow-hidden rounded-3xl border border-black/[0.08] bg-white/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-3xl transition-all animate-[fadeSlideIn_250ms_ease-out] md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-black/[0.06] font-semibold text-[#0071e3]"
                      : "text-[#1d1d1f] hover:bg-black/[0.03]"
                  }`
                }
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-4 w-4 text-[#86868b]" />
              </NavLink>
            ))}

            <div className="mt-2 border-t border-black/[0.08] pt-3">
              <a
                href="mailto:anantasak.business@gmail.com?subject=ANAN%20%E2%80%94%20Portfolio%20inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1d1d1f] py-3 text-center text-sm font-semibold text-white shadow-md active:bg-[#0071e3]"
              >
                <span>{t("nav.talk")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
