import { useState } from "react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLang } from "@/i18n/LanguageContext";

interface WorkCardProps {
  company: string;
  role: string;
  duration: string;
  status: string;
  description: string;
  logo: string;
  logoColor: string;
  className?: string;
}

export function WorkCard({
  company,
  role,
  duration,
  status,
  description,
  logo,
  logoColor,
  className,
}: WorkCardProps) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const descriptionBlocks = description
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const URL_REGEX = /(https?:\/\/[^\s]+)/g;

  function renderBlock(text: string) {
    const parts = text.split(URL_REGEX);
    return parts.map((part, i) =>
      URL_REGEX.test(part) ? (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all hover:text-blue-800"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group bg-gray-50 rounded-2xl p-5 w-full text-left",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {/* Logo */}
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 overflow-hidden",
              logoColor
            )}
          >
            {logo.endsWith(".png") || logo.endsWith(".jpg") || logo.endsWith(".jpeg") ? (
              <img src={logo} alt={`${company} logo`} className="w-full h-full object-cover" />
            ) : (
              logo
            )}
          </div>

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{company}</h3>
            <p className="text-sm text-gray-600">{role}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">{duration}</span>
              <StatusBadge status={status} />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{company}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {role} · {duration}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-400">
              <StatusBadge status={status} />
              <span>{status === "present" ? t("work.currently") : t("work.previously")}</span>
            </div>
            <div className="space-y-3 leading-relaxed text-gray-700">
              {descriptionBlocks.map((block, idx) => (
                <p key={idx}>{renderBlock(block)}</p>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
