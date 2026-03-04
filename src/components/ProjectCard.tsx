import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { ChevronRight } from "lucide-react";

interface ProjectCardProps {
  name: string;
  subtitle: string;
  description: string;
  status: string;
  statusColor: string;
  image: string;
  className?: string;
}

export function ProjectCard({
  name,
  subtitle,
  description,
  status,
  image,
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-gray-50 rounded-2xl p-5 overflow-hidden",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-3">
        <StatusBadge status={status} />
        <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Title */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className="text-xl">🚀</span>
          {name}
        </h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>

      {/* Image */}
      <div className="relative rounded-xl overflow-hidden aspect-video">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
