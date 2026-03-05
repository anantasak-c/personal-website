import { useLang } from "@/i18n/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { t, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur border border-gray-200 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4" />
      {t("lang.switch")}
    </button>
  );
}
