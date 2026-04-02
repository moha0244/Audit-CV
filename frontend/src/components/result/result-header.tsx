import { ResultHeaderProps } from "@/lib/interfaces";
import { Header } from "@/components/layout";
import { ConfirmDialog } from "@/components/feedback";
import { clearAllSessionData } from "@/components/guards/route-guard";
import { clearAnalysisResult } from "@/services";

import { useState } from "react";

export function ResultHeader({}: ResultHeaderProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleGoBack = () => {
    setShowConfirmDialog(true);
  };

  const confirmGoBack = () => {
    setIsLeaving(true);
    setShowConfirmDialog(false);

    // Petit délai pour montrer le feedback
    setTimeout(() => {
      clearAllSessionData();
      clearAnalysisResult();
      window.location.href = "/";
    }, 200);
  };

  const cancelGoBack = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Header
        showBackButton={true}
        onBackClick={handleGoBack}
        isLeaving={isLeaving}
      />

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={cancelGoBack}
        onConfirm={confirmGoBack}
        title="Confirmer le retour"
        message="Êtes-vous sûr de vouloir retourner à la page d'accueil ? Toutes les données d'analyse seront effacées."
        confirmText="Confirmer"
        cancelText="Annuler"
      />
    </>
  );
}
