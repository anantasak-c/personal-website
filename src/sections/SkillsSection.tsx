import { motion } from "framer-motion";
import { skills } from "@/data/content";
import { SkillTag } from "@/components/SkillTag";
import { useLang } from "@/i18n/LanguageContext";

export function SkillsSection() {
  const { t } = useLang();

  // Duplicate for seamless infinite loop
  const doubledSkills = [...skills, ...skills];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-6"
        >
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {t("skills.label")}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold shimmer-text mt-1">
            {t("skills.title")}
          </h2>
        </motion.div>

        {/* Skills — Infinite Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="marquee-container"
        >
          <div className="marquee-track gap-3">
            {doubledSkills.map((skill, index) => (
              <div key={`${skill.label}-${index}`} className="flex-shrink-0 px-1">
                <SkillTag {...skill} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
