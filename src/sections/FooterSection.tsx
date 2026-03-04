import { motion } from "framer-motion";
import { personalInfo } from "@/data/content";
import { Copy, Check, Linkedin, MessageCircle, Facebook, Instagram } from "lucide-react";
import { useState } from "react";

export function FooterSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const footerLinks = {
    menu: [
      { label: "Profile", href: "#" },
      { label: "My Projects", href: "#projects" },
      { label: "Tech Stack", href: "#tech" },
      { label: "Contact", href: "#contact" },
    ],
    social: [
      { label: "LinkedIn", icon: Linkedin, href: "#" },
      { label: "LINE", icon: MessageCircle, href: "#" },
      { label: "Facebook", icon: Facebook, href: "#" },
      { label: "Instagram", icon: Instagram, href: "#" },
    ],
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
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
              Menu
            </h4>
            <ul className="space-y-2">
              {footerLinks.menu.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
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
              Follow
            </h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
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
            2025, {personalInfo.name}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
