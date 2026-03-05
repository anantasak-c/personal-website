import { motion } from "framer-motion";
import { personalInfo } from "@/data/content";
import { Copy, Check, Linkedin, MessageCircle, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

export function FooterSection() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const footerLinks = {
    menu: [
      { label: t("footer.profile"), href: "#" },
      { label: t("footer.myBlog"), href: "/blog" },
      { label: t("footer.techStack"), href: "#tech" },
      { label: t("footer.contact"), href: "#contact" },
    ],
    social: [
      { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/anantasak-charoensuk-675544222/" },
      { label: "LINE", icon: MessageCircle, href: "#" },
      { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/m.anan.tasuk/" },
      { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/m_anantasak/" },
    ],
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100 overflow-hidden">
      {/* Decorative SVG */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute bottom-0 left-0 w-full h-1" preserveAspectRatio="none">
          <defs>
            <linearGradient id="footerLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <rect width="100%" height="1" fill="url(#footerLine)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left - Profile & Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Mini Profile */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {personalInfo.title}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{personalInfo.email}</span>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Copy email"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>

            {/* Signature */}
            <div className="mt-4 opacity-50">
              <svg
                viewBox="0 0 200 60"
                className="w-32 h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 45 Q30 10 50 35 T90 30 Q110 25 130 35 T170 30"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-400"
                />
              </svg>
            </div>
          </motion.div>

          {/* Center - Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              {t("footer.menu")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.menu.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              {t("footer.follow")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-gray-100 text-center"
        >
          <p className="text-sm text-gray-400">
            © 2025 {personalInfo.name}. {t("footer.rights")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
