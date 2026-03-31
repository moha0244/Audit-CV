import { ResultHeaderProps } from "@/lib/interfaces";
import { ArrowLeft, FileText, SlidersHorizontal } from "lucide-react";
import { clearAllSessionData } from "@/components/guards/route-guard";
import { clearAnalysisResult } from "@/services";

export function ResultHeader({}: ResultHeaderProps) {
  const handleGoBack = () => {
    // Clear session data when leaving result page
    clearAllSessionData();
    clearAnalysisResult();
    window.location.href = "/";
  };

  return (
    <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleGoBack}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft size={22} />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
              <FileText size={18} className="text-blue-600" />
            </div>
            <h1 className="text-[20px] font-bold tracking-[-0.02em] text-slate-950">
              Audit-Mon-CV
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
