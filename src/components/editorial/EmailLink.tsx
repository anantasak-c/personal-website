import { ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { personalInfo } from "@/data/content";

interface EmailLinkProps {
  subject: string;
  variant?: "light" | "dark";
  compact?: boolean;
}

export function EmailLink({ subject, variant = "light", compact = false }: EmailLinkProps) {
  const [copied, setCopied] = useState(false);
  const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}`;
  const isDark = variant === "dark";

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={mailto}
        className={`inline-flex items-center gap-2 rounded-full font-medium transition-colors ${
          compact ? "px-4 py-2 text-sm" : "px-5 py-3 text-sm"
        } ${isDark ? "bg-white text-black hover:bg-[#f5f5f7]" : "bg-[#0066cc] text-white hover:bg-[#0071e3]"}`}
      >
        Email ANAN
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={copyEmail}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
          isDark ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
        }`}
        aria-label="Copy email address"
      >
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {copied ? "Copied" : "Copy email"}
      </button>
    </div>
  );
}
