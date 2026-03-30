import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { showcases } from "@/data/showcases";
import { useLang } from "@/i18n/LanguageContext";

export function ShowcaseDetailPage() {
  const { lang, setLang } = useLang();
  const isThai = lang === "th";
  const { slug } = useParams<{ slug: string }>();
  const showcase = showcases.find((item) => item.slug === slug);
  const copy = isThai
    ? {
        pageTitle: "Show Case",
        fallbackDescription: "Selected show case by Anantasak Charoensuk.",
        notFoundTitle: "ไม่พบ Show Case ที่ต้องการ",
        backToShowcase: "กลับไปหน้า Show Case",
        backToShowCaseEnglish: "Back to Show Case",
        experience: "Experience",
        focus: "Focus",
        tryLiveApp: "Try the live app",
        backToFeed: "Back to feed",
        overview: "Overview",
        highlights: "Highlights",
        gallery: "Gallery",
        visualFeed: "Visual feed",
        viewOtherShowcases: "ดู Show Case อื่นต่อ",
      }
    : {
        pageTitle: "Show Case",
        fallbackDescription: "Selected show case by Anantasak Charoensuk.",
        notFoundTitle: "Show Case not found",
        backToShowcase: "Back to Show Case",
        backToShowCaseEnglish: "Back to Show Case",
        experience: "Experience",
        focus: "Focus",
        tryLiveApp: "Try the live app",
        backToFeed: "Back to feed",
        overview: "Overview",
        highlights: "Highlights",
        gallery: "Gallery",
        visualFeed: "Visual feed",
        viewOtherShowcases: "View other show cases",
      };

  useSEO({
    title: showcase ? `${showcase.title} | ${copy.pageTitle}` : copy.pageTitle,
    description: showcase ? (isThai ? showcase.summary : showcase.summaryEn) : copy.fallbackDescription,
  });

  if (!showcase) {
    return (
      <div className="min-h-screen bg-white px-6 py-16 text-gray-900">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">{copy.pageTitle}</p>
          <h1 className="text-3xl font-bold">{copy.notFoundTitle}</h1>
          <Link to="/showcase" className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4" />
            {copy.backToShowcase}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/showcase" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            <span>{copy.backToShowCaseEnglish}</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              {showcase.category}
            </span>
            <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setLang("th")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  isThai ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                TH
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  isThai ? "text-gray-500 hover:text-gray-900" : "bg-gray-900 text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 sm:py-14">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">{showcase.category}</p>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{showcase.title}</h1>
              <p className="max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">{isThai ? showcase.summary : showcase.summaryEn}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{copy.experience}</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{showcase.sourceFolder}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{copy.focus}</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{isThai ? showcase.focus : showcase.focusEn}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to={showcase.liveDemoPath}
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                {copy.tryLiveApp}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/showcase"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
              >
                {copy.backToFeed}
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {showcase.stack.map((item) => (
                <span key={item} className="rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-slate-50 shadow-sm">
            <img src={showcase.coverImage} alt={showcase.title} className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">{copy.overview}</p>
            <p className="mt-4 text-base leading-8 text-gray-600">{isThai ? showcase.overview : showcase.overviewEn}</p>
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">{copy.highlights}</p>
            <div className="mt-5 space-y-4">
              {(isThai ? showcase.highlights : showcase.highlightsEn).map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-sky-700 shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm leading-7 text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">{copy.gallery}</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{copy.visualFeed}</h2>
            </div>
            <Link to="/showcase" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-sky-700">
              {copy.viewOtherShowcases}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {showcase.gallery.map((image, index) => (
              <div key={image} className="overflow-hidden rounded-[1.5rem] border border-gray-200 bg-slate-50 shadow-sm">
                <img src={image} alt={`${showcase.title} gallery ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
