import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

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
  return (
    <div
      className={cn(
        "group bg-gray-50 rounded-2xl p-5",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Logo */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0",
            logoColor
          )}
        >
          {logo}
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
    </div>
  );
}
