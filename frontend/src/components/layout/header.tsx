import { ArrowLeft, FileCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components";

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
  isLeaving?: boolean;
}

export function Header({
  showBackButton = false,
  onBackClick,
  isLeaving = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Left section - Logo/Brand */}
        <div className="flex items-center gap-4">
          {showBackButton ? (
            <Button
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              iconPosition="left"
              onClick={onBackClick}
              disabled={isLeaving}
              className="px-4 py-2 border-2 border-slate-300 bg-white hover:bg-slate-50"
            >
              {isLeaving ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
              ) : (
                "Retourner à l'accueil"
              )}
            </Button>
          ) : (
            <Link
              href="/"
              className="group flex items-center gap-2 transition-all hover:opacity-90 md:gap-3"
            >
              <div className="rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 shadow-sm transition-all group-hover:shadow-md md:p-2">
                <FileCheck className="h-4 w-4 text-white md:h-5 md:w-5" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-slate-900 md:text-xl">
                  Votre CV,{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    notre expertise
                  </span>
                </h1>
                <p className="hidden text-xs text-slate-500 md:block">
                  Audit instantané par IA
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
