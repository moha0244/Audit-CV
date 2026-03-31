"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface RouteGuardProps {
  children: React.ReactNode;
  requireAnalysis?: boolean;
  requireUploadedFile?: boolean;
  redirectTo?: string;
}

// Session key for tracking if an analysis session has started
const SESSION_STARTED_KEY = "analysisSessionStarted";

export function startAnalysisSession() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_STARTED_KEY, "true");
  }
}

export function clearAllSessionData() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_STARTED_KEY);
    sessionStorage.removeItem("uploadedFile");
    sessionStorage.removeItem("cvAnalysisResult");
  }
}

export function isAnalysisSessionStarted(): boolean {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(SESSION_STARTED_KEY) === "true";
  }
  return false;
}

export default function RouteGuard({
  children,
  requireAnalysis = false,
  requireUploadedFile = false,
  redirectTo = "/",
}: RouteGuardProps) {
  const router = useRouter();

  useEffect(() => {
    const checkAccess = () => {
      const hasSession = isAnalysisSessionStarted();
      const analysisData = sessionStorage.getItem("cvAnalysisResult");
      const storedFile = sessionStorage.getItem("uploadedFile");

      let shouldRedirect = false;

      // For loading page: need uploaded file AND active session (still in analysis)
      if (requireUploadedFile) {
        if (!storedFile || !hasSession) {
          shouldRedirect = true;
        }
      }

      // For result page: only need analysis result (session ends after analysis)
      if (requireAnalysis) {
        if (!analysisData) {
          shouldRedirect = true;
        }
      }

      if (shouldRedirect) {
        // Clear all session data when access is denied
        clearAllSessionData();
        // Replace current history entry to prevent back button loops
        router.replace(redirectTo);
        return false;
      }
      return true;
    };

    // Initial check
    if (!checkAccess()) {
      return;
    }

    // Handle browser back button and other navigation
    const handlePopState = (event: PopStateEvent) => {
      // When navigating back, clear everything and go to home
      event.preventDefault();
      clearAllSessionData();
      router.replace(redirectTo);
    };

    // Push a new state to capture back button
    if (requireAnalysis || requireUploadedFile) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router, requireAnalysis, requireUploadedFile, redirectTo]);

  return <>{children}</>;
}
