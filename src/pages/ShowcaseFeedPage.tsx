import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { showcases } from "@/data/showcases";
import { useLang } from "@/i18n/LanguageContext";

export function ShowcaseFeedPage() {
  const { lang, setLang } = useLang();
  const isThai = lang === "th";
  const copy = isThai
    ? {
        seoDescription: "รวม use case จากโจทย์ธุรกิจจริง พร้อม live demo และ product concept โดย Anantasak Charoensuk.",
        backToHome: "Back to Home",
        feedLabel: "Show Case Feed",
        heroEyebrow: "Real business use cases",
        heroTitle: "My Use case",
        heroDescription:
          "หน้านี้รวม use case ที่ผมเคยทำจากโจทย์ธุรกิจจริง และถูกนำไปต่อยอดรันจริงบนธุรกิจแล้วบางส่วน คุณสามารถกดดูแนวคิด อ่าน flow และลองเล่น live app ได้ทันที",
        useCases: "Use Cases",
        liveDemos: "Live Demos",
        featured: "Featured",
        viewFeatured: "View featured use case",
        tryLiveDemo: "Try the live demo",
        sectionEyebrow: "Live use case feed",
        sectionTitle: "AI ที่สามารถนำไปทำธุรกิจต่อได้จริง",
        sectionDescription:
          "แต่ละชิ้นคือ use case ที่ผมเคยทำเพื่อแก้โจทย์จริงของธุรกิจ คุณกดดูรายละเอียดหรือเข้า live demo เพื่อเห็น flow การใช้งานได้ทันที",
        liveDemoAvailable: "Live demo available",
        focusLabel: "Use case focus:",
        viewUseCase: "View the use case",
        ctaEyebrow: "Need something similar?",
        ctaTitle: "ต่อยอดธุรกิจของคุณด้วย AI",
        ctaDescription:
          "ลองเปิดดูรายละเอียดหรือกดเล่น live demo ได้เลย ถ้าคุณกำลังมองหาคนช่วยออกแบบ product flow, automation หรือ interactive demo สำหรับธุรกิจของคุณ สามารถติดต่อได้ที่นี่",
        viewPortfolio: "▶VIEW PORTFOLIO",
      }
    : {
        seoDescription: "A portfolio feed of real business use cases, live demos, and product concepts by Anantasak Charoensuk.",
        backToHome: "Back to Home",
        feedLabel: "Show Case Feed",
        heroEyebrow: "Real business use cases",
        heroTitle: "My Use Cases",
        heroDescription:
          "This page brings together business-driven use cases I have built and, in some cases, helped extend into real business operations. You can explore the concept, review the flow, and try the live app right away.",
        useCases: "Use Cases",
        liveDemos: "Live Demos",
        featured: "Featured",
        viewFeatured: "View featured use case",
        tryLiveDemo: "Try the live demo",
        sectionEyebrow: "Live use case feed",
        sectionTitle: "AI use cases that can move real business forward",
        sectionDescription:
          "Each piece is a use case I built to solve a real business problem. Open the details or jump into the live demo to understand the product flow immediately.",
        liveDemoAvailable: "Live demo available",
        focusLabel: "Use case focus:",
        viewUseCase: "View the use case",
        ctaEyebrow: "Need something similar?",
        ctaTitle: "Grow your business with AI",
        ctaDescription:
          "Explore the details or try the live demo. If you are looking for someone to design product flows, automation, or interactive demos for your business, you can reach out here.",
        viewPortfolio: "▶VIEW PORTFOLIO",
      };

  useSEO({
    title: "Show Case",
    description: copy.seoDescription,
  });

  const featuredShowcase = showcases[0];
  const liveReadyCount = showcases.filter((showcase) => Boolean(showcase.liveDemoPath)).length;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            <span>{copy.backToHome}</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              {copy.feedLabel}
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
        <section className="grid gap-8 rounded-[2rem] border border-gray-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 shadow-sm sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">{copy.heroEyebrow}</p>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{copy.heroTitle}</h1>
              <p className="max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                {copy.heroDescription}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{copy.useCases}</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{showcases.length}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{copy.liveDemos}</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{liveReadyCount}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{copy.featured}</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{featuredShowcase.title}</p>
              </div>
            </div>

            <Link
              to={`/showcase/${featuredShowcase.slug}`}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              {copy.viewFeatured}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to={featuredShowcase.liveDemoPath}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-semibold text-sky-800 transition-colors hover:border-sky-300 hover:bg-sky-100"
            >
              {copy.tryLiveDemo}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-lg shadow-sky-100">
            <img src={featuredShowcase.coverImage} alt={featuredShowcase.title} className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">{copy.sectionEyebrow}</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{copy.sectionTitle}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-gray-500">
              {copy.sectionDescription}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {showcases.map((showcase) => (
              <Link
                key={showcase.slug}
                to={`/showcase/${showcase.slug}`}
                className="group overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={showcase.coverImage}
                    alt={showcase.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                      {showcase.category}
                    </span>
                    <span className="text-sm text-gray-400">{copy.liveDemoAvailable}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">{showcase.title}</h3>
                    <p className="mt-3 text-sm font-medium text-sky-700">{copy.focusLabel} {isThai ? showcase.focus : showcase.focusEn}</p>
                    <p className="mt-3 text-sm leading-7 text-gray-600">{isThai ? showcase.summary : showcase.summaryEn}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {showcase.stack.slice(0, 4).map((item) => (
                      <span key={item} className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                    {copy.viewUseCase}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                    {copy.tryLiveDemo}
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-gray-200 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 px-6 py-10 text-white shadow-lg sm:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-200">{copy.ctaEyebrow}</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.ctaTitle}</h2>
            <p className="max-w-3xl text-sm leading-8 text-slate-200 sm:text-base">
              {copy.ctaDescription}
            </p>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              {copy.viewPortfolio}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
