import { ArrowLeft, FileCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components";

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
  isLeaving?: boolean;
}

export function Header({ showBackButton = false, onBackClick, isLeaving = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
        <div className="flex items-center gap-3">
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
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                <FileCheck size={18} className="text-blue-600" />
              </div>
              <h1 className="text-[20px] font-bold tracking-[-0.02em] text-slate-950">
               CV-Flow
              </h1>
            </Link>
          )}
        </div>
        
        <div className="text-sm text-slate-600">
          Analyse de CV instantanée par IA
        </div>
      </div>
    </header>
  );
}
