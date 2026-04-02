import { cn } from "@/services";
import { BadgeProps } from "@/lib/interfaces";

const Badge = ({ variant = "default", size = "md", icon: Icon, children, className }: BadgeProps) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    default: "bg-blue-50 text-blue-700",
    secondary: "bg-gray-100 text-gray-700",
    success: "bg-green-50 text-green-700",
    warning: "bg-orange-50 text-orange-700"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm"
  };

  return (
    <div className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {Icon && <Icon size={14} className="mr-2" fill="currentColor" />}
      {children}
    </div>
  );
};

export default Badge;
