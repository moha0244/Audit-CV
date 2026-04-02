// src/components/ui/upload-area.tsx
import { cn } from "@/services";
import { LucideIcon, Upload, X, FileText, CheckCircle2 } from "lucide-react";
import { forwardRef } from "react";
import { UploadAreaProps } from "@/lib/interfaces";

const UploadArea = forwardRef<HTMLDivElement, UploadAreaProps>(
  (
    {
      file,
      dragActive = false,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDrop,
      onClick,
      onClear,
      icon: Icon = Upload,
      title = "Déposez votre CV ici",
      subtitle = "PDF ou DOCX (max. 5 Mo)",
      acceptedTypes = ".pdf,.docx",
      maxSize = "5 Mo",
      className,
      children,
    },
    ref,
  ) => {
    // État du fichier uploadé
    if (file) {
      const fileSize = (file.size / (1024 * 1024)).toFixed(2);
      const isPdf = file.type === "application/pdf";
      const isDocx = file.name.endsWith(".docx");

      return (
        <div
          className={cn(
            "relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8",
            "border-2 border-green-200",
            className,
          )}
          ref={ref}
        >
          {/* Bouton de suppression */}
          {onClear && (
            <button
              onClick={onClear}
              className="absolute top-4 right-4 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-all hover:scale-110"
              aria-label="Supprimer le fichier"
            >
              <X size={16} className="text-gray-500" />
            </button>
          )}

          <div className="flex flex-col items-center text-center">
            {/* Icône de succès */}
            <div className="mb-4 p-3 bg-green-100 rounded-full">
              <CheckCircle2 className="text-green-600" size={32} />
            </div>

            {/* Nom du fichier */}
            <p className="font-semibold text-gray-900 text-lg mb-2 break-all max-w-full">
              {file.name}
            </p>

            {/* Détails du fichier */}
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <FileText size={14} />
                {isPdf ? "PDF" : "DOCX"}
              </span>
              <span>•</span>
              <span>{fileSize} Mo</span>
            </div>

            {/* Message de succès */}
            <p className="text-sm text-green-600 font-medium">
              ✓ Fichier prêt pour l'analyse
            </p>
          </div>
        </div>
      );
    }

    // État par défaut (aucun fichier)
    return (
      <div
        className={cn(
          "group relative cursor-pointer transition-all duration-200",
          "border-2 border-dashed rounded-2xl p-12",
          dragActive
            ? "border-blue-400 bg-blue-50 scale-[1.02]"
            : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/30",
          className,
        )}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={onClick}
        ref={ref}
      >
        {children || (
          <div className="flex flex-col items-center text-center">
            {/* Icône animée */}
            <div
              className={cn(
                "mb-6 p-4 rounded-full transition-all duration-200",
                dragActive
                  ? "bg-blue-100"
                  : "bg-gray-100 group-hover:bg-blue-100",
              )}
            >
              <Icon
                className={cn(
                  "transition-all duration-200",
                  dragActive
                    ? "text-blue-600 scale-110"
                    : "text-gray-400 group-hover:text-blue-500",
                )}
                size={48}
                strokeWidth={1.5}
              />
            </div>

            {/* Titre */}
            <p className="font-semibold text-gray-700 text-lg mb-2">
              {dragActive ? "Déposez votre fichier ici" : title}
            </p>

            {/* Sous-titre */}
            <p className="text-sm text-gray-500 mb-3">
              {dragActive ? "Relâchez pour uploader" : subtitle}
            </p>

            {/* Formats acceptés */}
            <div className="flex gap-2 text-xs text-gray-400">
              <span className="px-2 py-1 bg-white rounded-md border border-gray-200">
                PDF
              </span>
              <span className="px-2 py-1 bg-white rounded-md border border-gray-200">
                DOCX
              </span>
              <span className="px-2 py-1 bg-white rounded-md border border-gray-200">
                {maxSize} max
              </span>
            </div>

            {/* Bouton d'upload */}
            <button
              className="mt-6 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              Parcourir
            </button>
          </div>
        )}
      </div>
    );
  },
);

UploadArea.displayName = "UploadArea";

export { UploadArea };
