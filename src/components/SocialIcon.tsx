import { cn } from "@/lib/utils";
import { Linkedin, Github, Facebook, Instagram, Mail, type LucideIcon } from "lucide-react";

interface SocialIconProps {
  name: string;
  icon: string;
  url: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Mail,
};

export function SocialIcon({ name, icon, url, className }: SocialIconProps) {
  const IconComponent = iconMap[icon] || Mail;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200",
        "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300",
        "transition-all duration-200 ease-out",
        className
      )}
      aria-label={name}
    >
      <IconComponent className="w-5 h-5" />
    </a>
  );
}
