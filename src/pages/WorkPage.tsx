import { EditorialLayout } from "@/components/editorial/EditorialLayout";
import { Reveal } from "@/components/editorial/Reveal";
import { WorkCard } from "@/components/editorial/WorkCard";
import { workItems } from "@/data/work";
import { useLang } from "@/i18n/LanguageContext";
import { useSEO } from "@/hooks/useSEO";

export function WorkPage() {
  const { lang, t } = useLang();
  const [featured, ...rest] = workItems;

  useSEO({
    title: lang === "th" ? "ผลงานที่คัดสรร — ANAN" : "Selected Work — ANANTASAK CHAROENSUK",
    description:
      lang === "th"
        ? "เรื่องราวและสถาปัตยกรรมของผลิตภัณฑ์ AI ที่สร้างและทดสอบจริงโดย ANAN"
        : "Project Stories about practical AI products and deterministic systems built by ANAN.",
    url: "https://anantasak.com/work",
  });

  return (
    <EditorialLayout>
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-8 sm:pb-24 sm:pt-28">
        <Reveal>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0071e3] sm:text-xs sm:tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            <span>{t("nav.work")} · 05 Stories</span>
          </div>
          <h1 className="mt-4 max-w-5xl text-balance text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:mt-5 sm:text-7xl lg:text-[5.5rem] lg:leading-[1.02]">
            {lang === "th" ? (
              <>
                ระบบที่ซับซ้อน,<br />เล่าผ่านเรื่องราวที่ชัดเจน
              </>
            ) : (
              <>
                Complex systems,<br />told as clear stories.
              </>
            )}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6e6e73] sm:mt-7 sm:text-xl sm:leading-8">
            {lang === "th"
              ? "การตัดสินใจในการสร้าง, Flow การทำงานจริง, และสิ่งที่ได้เรียนรู้ — นำเสนอด้วยภาพที่สอดคล้องกับความเป็นจริง"
              : "Product decisions, working flows, and what changed after building—presented with truthful visuals instead of public demos."}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-8 sm:pb-28">
        <Reveal>
          <WorkCard item={featured} index={0} featured />
        </Reveal>
        <div className="mt-10 sm:mt-14">
          {rest.map((item, index) => (
            <Reveal key={item.slug} delay={0.04}>
              <WorkCard item={item} index={index + 1} />
            </Reveal>
          ))}
        </div>
      </section>
    </EditorialLayout>
  );
}
