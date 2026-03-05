import { motion } from "framer-motion";
import { techStack } from "@/data/content";
import { TechItem } from "@/components/TechItem";
import { useLang } from "@/i18n/LanguageContext";

export function TechStackSection() {
  const { t } = useLang();

  return (
    <section className="relative py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative SVG */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute top-10 -right-8 w-32 h-32 animate-float opacity-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#818cf8" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#a78bfa" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#c4b5fd" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-6"
        >
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {t("tech.label")}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold shimmer-text mt-1">
            {t("tech.title")}
          </h2>
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="glass-card rounded-2xl p-4"
          >
            <h3 className="text-sm font-medium text-gray-500 mb-3 px-3">
              {t("tech.languages")}
            </h3>
            <div className="space-y-1">
              {techStack.languages.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2 + index * 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <TechItem {...tech} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Business & Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="glass-card rounded-2xl p-4"
          >
            <h3 className="text-sm font-medium text-gray-500 mb-3 px-3">
              {t("tech.business")}
            </h3>
            <div className="space-y-1">
              {techStack.business.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + index * 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <TechItem {...tech} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Analytics & Logging */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="glass-card rounded-2xl p-4"
          >
            <h3 className="text-sm font-medium text-gray-500 mb-3 px-3">
              {t("tech.analytics")}
            </h3>
            <div className="space-y-1">
              {techStack.analytics.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.4 + index * 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <TechItem {...tech} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
