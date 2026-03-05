import { motion } from "framer-motion";
import { personalInfo, education } from "@/data/content";
import { MapPin, Target, GraduationCap } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function AboutSection() {
  const { t } = useLang();

  return (
    <section className="relative py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative SVG */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute -bottom-10 -right-10 w-48 h-48 animate-float-slow opacity-15" viewBox="0 0 200 200">
          <defs>
            <radialGradient id="aboutOrb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="100" fill="url(#aboutOrb)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column - Profile Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="glass-card rounded-2xl p-6 gradient-border glow-hover"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-relaxed">
              {t("about.profileSummary")}
            </h3>

            {/* Education */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-blue-600 animate-float-slow" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{education.school}</p>
                <p className="text-sm text-gray-600">
                  {education.degree} ({education.major})
                </p>
              </div>
            </div>

            {/* Highlight */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100/50">
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-medium shimmer-text">{t("about.highlight")}:</span>{" "}
                {t("about.highlightText")}
              </p>
            </div>
          </motion.div>

          {/* Right Column - Location & Life Goal */}
          <div className="space-y-4">
            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="glass-card rounded-2xl p-5 gradient-border glow-hover"
            >
              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("about.label")}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-indigo-400 animate-float" />
                <span className="text-lg font-semibold text-gray-900">
                  {personalInfo.location}
                </span>
              </div>

              {/* Map Visualization */}
              <div className="flex items-center justify-center gap-2 py-3">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: i === 3 ? 1 : 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`w-8 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      i === 3
                        ? "bg-gradient-to-b from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-200"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Life Goal Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="glass-card rounded-2xl p-5 gradient-border glow-hover"
            >
              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("about.lifeGoal")}
                </span>
              </div>

              {/* Quote */}
              <div className="flex items-start gap-3">
                <p className="text-gray-700 leading-relaxed flex-1 text-sm italic">
                  "{t("about.lifeGoalQuote")}"
                </p>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Target className="w-6 h-6 text-red-500 animate-pulse-soft" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
