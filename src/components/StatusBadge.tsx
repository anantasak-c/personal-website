import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "present" | "ongoing" | "develop" | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
      case "on going":
      case "ongoing":
        return {
          dotColor: "bg-green-500",
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          label: status,
        };
      case "in develop":
      case "develop":
      case "coming soon":
        return {
          dotColor: "bg-yellow-500",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-700",
          label: status,
        };
      default:
        return {
          dotColor: "bg-gray-500",
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          label: status,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <span className={cn("w-2 h-2 rounded-full", config.dotColor)} />
      {config.label}
    </span>
  );
}
