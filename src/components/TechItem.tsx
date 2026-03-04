import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TechItemProps {
  name: string;
  description: string;
  icon: string;
  main?: boolean;
  className?: string;
}

export function TechItem({ name, description, icon, main, className }: TechItemProps) {
  return (
    <div
      className={cn(
        "group flex items-start gap-3 p-3 rounded-xl",
        "transition-all duration-200 ease-out",
        "hover:bg-gray-100",
        className
      )}
    >
      {/* Icon */}
      <span className="text-2xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
        {icon}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-medium text-gray-900">{name}</span>
          {main && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              Main
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
