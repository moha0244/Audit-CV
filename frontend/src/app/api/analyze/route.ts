import { NextRequest, NextResponse } from "next/server";
import { ERROR_MESSAGES } from "@/lib/constants";

const PYTHON_SERVER_URL = process.env.PYTHON_SERVER_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const step = formData.get("step") as string || "complete";
    
    if (!file) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NO_FILE },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    if (!file.type.includes("pdf") && !file.name.endsWith(".docx")) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_FORMAT },
        { status: 400 }
      );
    }

    try {
      // Préparer les données pour le serveur Python
      const pythonFormData = new FormData();
      pythonFormData.append('file', file);
      pythonFormData.append('step', step);

      // Appeler le serveur Python
      const response = await fetch(`${PYTHON_SERVER_URL}/analyze`, {
        method: 'POST',
        body: pythonFormData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Erreur serveur Python: ${response.status}`);
      }

      const result = await response.json();
      console.log("Réponse reçue du serveur Python:", result);

      return NextResponse.json(result);

    } catch (fetchError) {
      console.error("Erreur lors de l'appel au serveur Python:", fetchError);
      return NextResponse.json(
        { error: "Erreur de communication avec le serveur d'analyse. Assurez-vous que le serveur Python est démarré." },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Erreur dans l'API d'analyse:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'analyse du CV" },
      { status: 500 }
    );
  }
}
