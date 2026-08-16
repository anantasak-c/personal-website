import {
  Briefcase,
  Check,
  Copy,
  ExternalLink,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Printer,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { EditorialLayout } from "@/components/editorial/EditorialLayout";
import {
  coreCompetencies,
  educationList,
  languages,
  personalInfo,
  professionalExperience,
  resumeProjects,
} from "@/data/content";
import { useLang } from "@/i18n/LanguageContext";
import { useSEO } from "@/hooks/useSEO";

export function ResumePage() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  useSEO({
    title:
      lang === "th"
        ? "เรซูเม — ANANTASAK CHAROENSUK | Business Analyst & AI Solution Designer"
        : "Resume — ANANTASAK CHAROENSUK | Business Analyst & AI Solution Designer",
    description:
      lang === "th"
        ? "ประวัติการทำงาน, ทักษะความเชี่ยวชาญ และผลงานโปรเจกต์ของ อนันตศักดิ์ เจริญสุข"
        : "Professional experience, core competencies, and project portfolio of Anantasak Charoensuk.",
    url: "https://anantasak.com/resume",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <EditorialLayout>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
        {/* Top Control Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            <span>{lang === "th" ? "เรซูเมฉบับทางการ" : "Official Resume"}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-4 py-2 text-xs font-semibold text-[#1d1d1f] shadow-sm transition hover:bg-[#f5f5f7]"
            >
              <Printer className="h-3.5 w-3.5 text-[#0071e3]" />
              <span>{lang === "th" ? "พิมพ์ / บันทึก PDF" : "Print / Save PDF"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0071e3]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{lang === "th" ? "คัดลอกแล้ว" : "Copied"}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>{lang === "th" ? "คัดลอกอีเมล" : "Copy Email"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Document Sheet (Apple Pro Clean Style) ── */}
        <article className="overflow-hidden rounded-[2.5rem] border border-black/[0.08] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-14 print:rounded-none print:border-none print:p-0 print:shadow-none">
          {/* Header Section */}
          <header className="border-b border-black/[0.08] pb-8">
            <h1 className="text-3xl font-bold tracking-[-0.04em] text-[#1d1d1f] sm:text-5xl">
              {personalInfo.name}
            </h1>

            <p className="mt-2 text-lg font-semibold text-[#0071e3] sm:text-xl">
              {lang === "th" ? personalInfo.titleTh : personalInfo.title}
            </p>

            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#434346] sm:text-base">
              {lang === "th" ? personalInfo.summaryTh : personalInfo.summary}
            </p>

            {/* Contact Pills */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-xs text-[#6e6e73] sm:text-sm">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 transition hover:text-[#0071e3]"
              >
                <Mail className="h-4 w-4 text-[#0071e3]" />
                <span>{personalInfo.email}</span>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="inline-flex items-center gap-1.5 transition hover:text-[#0071e3]"
              >
                <Phone className="h-4 w-4 text-[#0071e3]" />
                <span>{personalInfo.phone}</span>
              </a>

              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#0071e3]" />
                <span>{lang === "th" ? personalInfo.locationTh : personalInfo.location}</span>
              </span>

              <a
                href={personalInfo.portfolio}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[#0071e3] transition hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                <span>{personalInfo.portfolio}</span>
              </a>
            </div>
          </header>

          {/* ── Two Column Body Grid ── */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:gap-12">
            {/* ── Left Sidebar (Competencies, Languages, Education) ── */}
            <aside className="space-y-9 border-b border-black/[0.08] pb-8 lg:border-b-0 lg:border-r lg:border-black/[0.08] lg:pb-0 lg:pr-8">
              {/* Core Competencies */}
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#1d1d1f]">
                  <Wrench className="h-4 w-4 text-[#0071e3]" />
                  <span>{lang === "th" ? "ทักษะความเชี่ยวชาญ" : "Core Competencies"}</span>
                </div>

                <div className="mt-6 space-y-6">
                  {/* Category 1: Business Analysis */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">
                      {lang === "th"
                        ? coreCompetencies.businessAnalysis.categoryTh
                        : coreCompetencies.businessAnalysis.category}
                    </h3>
                    <ul className="mt-3 space-y-1.5 text-xs text-[#434346] sm:text-sm">
                      {coreCompetencies.businessAnalysis.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Category 2: AI & Automation */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">
                      {lang === "th"
                        ? coreCompetencies.aiAutomation.categoryTh
                        : coreCompetencies.aiAutomation.category}
                    </h3>
                    <ul className="mt-3 space-y-1.5 text-xs text-[#434346] sm:text-sm">
                      {coreCompetencies.aiAutomation.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Category 3: Data & Technical */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0071e3]">
                      {lang === "th"
                        ? coreCompetencies.technicalTools.categoryTh
                        : coreCompetencies.technicalTools.category}
                    </h3>
                    <ul className="mt-3 space-y-1.5 text-xs text-[#434346] sm:text-sm">
                      {coreCompetencies.technicalTools.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="border-t border-black/[0.08] pt-6">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#1d1d1f]">
                  <Languages className="h-4 w-4 text-[#0071e3]" />
                  <span>{lang === "th" ? "ภาษา" : "Languages"}</span>
                </div>

                <div className="mt-4 space-y-3">
                  {languages.map((l) => (
                    <div key={l.name} className="text-xs sm:text-sm">
                      <p className="font-semibold text-[#1d1d1f]">
                        {lang === "th" ? l.nameTh : l.name}
                      </p>
                      <p className="text-[#6e6e73]">
                        {lang === "th" ? l.levelTh : l.level}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="border-t border-black/[0.08] pt-6">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#1d1d1f]">
                  <GraduationCap className="h-4 w-4 text-[#0071e3]" />
                  <span>{lang === "th" ? "การศึกษา" : "Education"}</span>
                </div>

                <div className="mt-4 space-y-5">
                  {educationList.map((edu) => (
                    <div key={edu.school} className="text-xs sm:text-sm">
                      <h4 className="font-bold text-[#1d1d1f]">
                        {lang === "th" ? edu.schoolTh : edu.school}
                      </h4>
                      <p className="mt-1 text-xs text-[#0071e3]">
                        {lang === "th" ? edu.degreeTh : edu.degree}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-[#86868b]">
                        {lang === "th" ? edu.durationTh : edu.duration}
                      </p>
                      {edu.honors && (
                        <p className="mt-1 text-xs font-medium text-emerald-700">
                          {lang === "th" ? edu.honorsTh : edu.honors}
                        </p>
                      )}
                      {edu.note && (
                        <p className="mt-1.5 text-xs italic text-[#6e6e73]">
                          {lang === "th" ? edu.noteTh : edu.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* ── Right Main Section (Experience & Selected Projects) ── */}
            <main className="space-y-10">
              {/* Professional Experience */}
              <section>
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#1d1d1f]">
                  <Briefcase className="h-4 w-4 text-[#0071e3]" />
                  <span>
                    {lang === "th" ? "ประสบการณ์การทำงาน" : "Professional Experience"}
                  </span>
                </div>

                <div className="mt-6 space-y-8">
                  {professionalExperience.map((exp) => (
                    <div key={`${exp.company}-${exp.duration}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-[#1d1d1f] sm:text-lg">
                            {lang === "th" ? exp.roleTh : exp.role}
                          </h3>
                          <p className="font-semibold text-[#0071e3]">{exp.company}</p>
                        </div>
                        <span className="font-mono text-xs text-[#86868b]">
                          {lang === "th" ? exp.durationTh : exp.duration}
                        </span>
                      </div>

                      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#434346] sm:text-sm">
                        {(lang === "th" ? exp.bulletsTh : exp.bullets).map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Selected Projects */}
              <section className="border-t border-black/[0.08] pt-8">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#1d1d1f]">
                  <Sparkles className="h-4 w-4 text-[#0071e3]" />
                  <span>
                    {lang === "th" ? "โปรเจกต์ที่โดดเด่น" : "Selected Projects"}
                  </span>
                </div>

                <div className="mt-6 space-y-7">
                  {resumeProjects.map((project) => (
                    <div key={project.title}>
                      <h3 className="text-sm font-bold text-[#1d1d1f] sm:text-base">
                        {lang === "th" ? project.titleTh : project.title}
                      </h3>

                      <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-[#434346] sm:text-sm">
                        {(lang === "th" ? project.bulletsTh : project.bullets).map(
                          (bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
                              <span>{bullet}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </article>
      </div>
    </EditorialLayout>
  );
}
