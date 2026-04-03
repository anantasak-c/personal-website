import { motion } from "framer-motion";
import { personalInfo, socialLinks, roleBadges } from "@/data/content";
import { SocialIcon } from "@/components/SocialIcon";
import { useLang } from "@/i18n/LanguageContext";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative pt-16 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* ── Animated SVG Background Decorations ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gradient orb top-left */}
        <svg className="absolute -top-20 -left-20 w-72 h-72 animate-float opacity-30" viewBox="0 0 200 200">
          <defs>
            <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="100" fill="url(#orb1)" />
        </svg>

        {/* Gradient orb top-right */}
        <svg className="absolute -top-10 -right-16 w-60 h-60 animate-float-delay opacity-25" viewBox="0 0 200 200">
          <defs>
            <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="100" fill="url(#orb2)" />
        </svg>

        {/* Small decorative circle bottom */}
        <svg className="absolute bottom-4 left-1/4 w-24 h-24 animate-pulse-soft" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#c7d2fe" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#e0e7ff" strokeWidth="0.5" />
        </svg>

        {/* Rotating ring right */}
        <svg className="absolute bottom-10 right-10 w-16 h-16 animate-spin-slow opacity-20" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="25" fill="none" stroke="#818cf8" strokeWidth="1" strokeDasharray="8 4" />
        </svg>

        {/* Floating dots */}
        <svg className="absolute top-1/3 right-1/4 w-4 h-4 animate-float-slow" viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="3" fill="#a78bfa" opacity="0.4" />
        </svg>
        <svg className="absolute top-1/2 left-1/6 w-3 h-3 animate-float" viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="3" fill="#818cf8" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative inline-block mb-6"
        >
          <div className="relative">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover avatar-glow transition-transform duration-300 hover:scale-105"
            />
            {/* Online Status Dot */}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Name — shimmer effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-2xl sm:text-3xl font-bold mb-2 shimmer-text"
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
          {t("hero.subtitle")}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-sm font-medium mb-6"
        >
          {t("hero.tagline")}
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="flex justify-center gap-3 mb-4"
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

        {/* Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex justify-center mb-6"
        >
          <Button
            asChild
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md shadow-indigo-200/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-300/50"
          >
            <a href="/" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              View Show Case
            </a>
          </Button>
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
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium glow-hover cursor-default ${badge.color}`}
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
          className="text-gray-600 max-w-lg mx-auto leading-relaxed"
        >
          {t("hero.passion")}
        </motion.p>
      </div>
    </section>
  );
}
