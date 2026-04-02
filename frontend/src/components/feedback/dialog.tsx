import { X } from "lucide-react";
import { Button } from "@/components";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  message,
  children,
  actions,
  showCloseButton = true,
  size = "md",
  className
}: DialogProps) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-xl p-6 mx-4 shadow-xl ${sizes[size]} ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            {title}
          </h3>
          {showCloseButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1"
            >
              <X size={20} />
            </Button>
          )}
        </div>
        
        {message && (
          <p className="text-slate-600 mb-6">
            {message}
          </p>
        )}
        
        {children && (
          <div className="mb-6">
            {children}
          </div>
        )}
        
        {actions && (
          <div className="flex gap-3 justify-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  confirmVariant = "primary",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "secondary" | "danger";
}) {
  const actions = (
    <>
      <Button
        variant="secondary"
        onClick={onClose}
      >
        {cancelText}
      </Button>
      <Button
        variant={confirmVariant === "danger" ? "secondary" : confirmVariant}
        onClick={onConfirm}
        className={confirmVariant === "danger" ? "bg-red-600 hover:bg-red-700" : ""}
      >
        {confirmText}
      </Button>
    </>
  );

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      message={message}
      actions={actions}
    />
  );
}
