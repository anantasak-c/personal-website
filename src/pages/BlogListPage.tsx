import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EditorialLayout } from "@/components/editorial/EditorialLayout";
import { Reveal } from "@/components/editorial/Reveal";
import { workItems } from "@/data/work";
import { useLang } from "@/i18n/LanguageContext";
import { useNotes } from "@/hooks/useNotes";
import { useSEO } from "@/hooks/useSEO";

export function BlogListPage() {
  const { lang, t } = useLang();
  const { notes, loading } = useNotes();
  const [featured, ...rest] = notes;

  useSEO({
    title: lang === "th" ? "บันทึก & บทความ — ANAN" : "Notes — ANANTASAK CHAROENSUK",
    description: "Build notes, guides, and architectural decisions from ANAN.",
    url: "https://anantasak.com/notes",
  });

  if (!featured) return null;
  const hrefFor = (href: string | undefined, slug: string) => href ?? `/notes/${slug}`;
  const featuredWork = workItems.find((item) => item.slug === featured.relatedWork);
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <EditorialLayout>
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-20 sm:px-8 sm:pb-20 sm:pt-28">
        <Reveal>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            <span>{t("nav.notes")} · {notes.length} {t("notes.allEntries")}</span>
          </div>
          <h1 className="mt-5 max-w-5xl text-balance text-5xl font-semibold tracking-[-0.055em] text-[#1d1d1f] sm:text-7xl">
            {t("notes.pageTitle")}
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-[#6e6e73]">
            {t("notes.pageSubtitle")}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal>
          <Link
            to={hrefFor(featured.href, featured.slug)}
            className="group grid overflow-hidden rounded-[2.5rem] border border-black/[0.08] bg-white/85 text-[#1d1d1f] shadow-[0_16px_40px_rgba(0,0,0,0.05)] backdrop-blur-3xl transition-all duration-300 hover:border-black/15 hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-4 lg:grid-cols-[0.82fr_1.18fr]"
          >
            <div className="flex min-h-[380px] flex-col justify-between p-8 sm:p-12">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#0071e3]">
                  Latest · {featured.contentType} · {featured.language}
                </p>
                <p className="mt-3 text-sm text-[#86868b]">
                  {formatDate(featured.publishedAt)}
                  {featured.readTime ? ` · ${featured.readTime}` : ""}
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.045em] text-[#1d1d1f] sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#6e6e73] sm:text-lg">
                  {featured.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0071e3]">
                  {t("notes.readNote")}{" "}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </div>
            {featuredWork ? (
              <div className="min-h-[320px] overflow-hidden">
                <img
                  src={featuredWork.coverImage}
                  alt={`${featured.title} cover`}
                  loading="eager"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex min-h-[320px] items-center justify-center bg-black/[0.02] p-8">
                <div className="w-full max-w-md border-y border-black/[0.08] py-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0071e3]">
                    ANAN / Notes
                  </p>
                  <div className="mt-10 space-y-4">
                    {["Observe the problem", "Record the decision", "Publish the lesson"].map(
                      (label, index) => (
                        <div
                          key={label}
                          className="grid grid-cols-[32px_1fr] border-t border-black/[0.08] pt-4 text-sm text-[#1d1d1f]"
                        >
                          <span className="font-mono text-[10px] font-bold text-[#0071e3]">0{index + 1}</span>
                          {label}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </Link>
        </Reveal>

        <div className="mt-14 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#1d1d1f]">{t("notes.viewAll")}</h2>
          {loading ? (
            <span className="font-mono text-xs text-[#86868b]">{t("notes.refreshing")}</span>
          ) : (
            <span className="font-mono text-xs text-[#86868b]">{notes.length} {t("notes.allEntries")}</span>
          )}
        </div>

        <div className="mt-6 divide-y divide-black/[0.08] rounded-3xl border border-black/[0.08] bg-white/80 px-6 shadow-sm backdrop-blur-xl sm:px-8">
          {rest.map((note, index) => (
            <Reveal key={note._id} delay={Math.min(index * 0.025, 0.12)}>
              <Link
                to={hrefFor(note.href, note.slug)}
                className="group grid gap-3 py-7 transition sm:grid-cols-[180px_1fr_auto] sm:gap-8"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0071e3]">
                    {note.contentType} · {note.language}
                  </p>
                  <p className="mt-2 text-xs text-[#86868b]">{formatDate(note.publishedAt)}</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-[#1d1d1f] transition group-hover:text-[#0071e3] sm:text-2xl">
                    {note.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6e6e73] sm:text-base">
                    {note.description}
                  </p>
                  {note.readTime ? (
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#86868b]">
                      {note.readTime}
                    </p>
                  ) : null}
                </div>
                <ArrowUpRight className="hidden h-5 w-5 text-[#86868b] transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#0071e3] sm:block" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </EditorialLayout>
  );
}
