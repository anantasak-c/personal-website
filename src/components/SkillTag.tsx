import { cn } from "@/lib/utils";

interface SkillTagProps {
  label: string;
  icon: string;
  color: string;
  className?: string;
}

export function SkillTag({ label, icon, color, className }: SkillTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
        "whitespace-nowrap cursor-default",
        "transition-transform duration-200 ease-out",
        "hover:scale-105",
        color,
        className
      )}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}
