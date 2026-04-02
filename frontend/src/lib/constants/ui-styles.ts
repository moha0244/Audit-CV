export const STYLE_VARIANTS = {
  BUTTON: {
    PRIMARY:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 focus:ring-blue-500",
    SECONDARY:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500",
    GHOST: "hover:bg-gray-100 text-gray-600 focus:ring-gray-500",
  },
  BADGE: {
    DEFAULT: "bg-blue-50 text-blue-700",
    SECONDARY: "bg-gray-100 text-gray-700",
    SUCCESS: "bg-green-50 text-green-700",
    WARNING: "bg-orange-50 text-orange-700",
  },
  VERDICT: {
    EXCELLENT: "text-green-700",
    GOOD: "text-blue-700",
    AVERAGE: "text-orange-700",
    POOR: "text-red-700",
  },
} as const;

export const SIZES = {
  BUTTON: {
    SM: "py-2 px-4 text-sm",
    MD: "py-3 px-6 text-base",
    LG: "py-4 px-8 text-lg",
  },
  BADGE: {
    SM: "px-3 py-1 text-sm",
    MD: "px-4 py-2 text-sm",
  },
} as const;
