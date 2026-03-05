import { motion } from "framer-motion";
import { personalInfo, socialLinks, roleBadges } from "@/data/content";
import { SocialIcon } from "@/components/SocialIcon";
import { useLang } from "@/i18n/LanguageContext";

export function HeroSection() {
  const { t } = useLang();

  return (
    <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative inline-block mb-6"
        >
          <div className="relative">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            />
            {/* Online Status Dot */}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
        >
          {t("hero.greeting")} {personalInfo.nickname}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="text-gray-500 mb-1"
        >
          {personalInfo.subtitle}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-gray-400 text-sm mb-6"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="flex justify-center gap-3 mb-6"
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.3 + index * 0.05,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <SocialIcon {...link} />
            </motion.div>
          ))}
        </motion.div>

        {/* Role Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          <span className="text-gray-600 mr-1">{t("hero.iam")}</span>
          {roleBadges.map((badge, index) => (
            <motion.span
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.4 + index * 0.05,
                ease: [0.4, 0, 0.2, 1],
              }}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 hover:scale-105 ${badge.color}`}
            >
              <span>{badge.icon}</span>
              <span>{badge.label}</span>
            </motion.span>
          ))}
        </motion.div>

        {/* Passion Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-gray-600 max-w-lg mx-auto"
        >
          {personalInfo.passion}
        </motion.p>
      </div>
    </section>
  );
}
