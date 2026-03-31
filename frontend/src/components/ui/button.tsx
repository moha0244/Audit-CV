import { cn } from "@/services";
import { ButtonProps } from "@/lib/ui-types";
import { forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", icon: Icon, iconPosition = "left", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 focus:ring-blue-500",
      secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500",
      ghost: "hover:bg-gray-100 text-gray-600 focus:ring-gray-500"
    };

    const sizes = {
      sm: "py-2 px-4 text-sm",
      md: "py-3 px-6 text-base",
      lg: "py-4 px-8 text-lg"
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon size={20} className="mr-2" />}
        {children}
        {Icon && iconPosition === "right" && <Icon size={20} className="ml-2" />}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
