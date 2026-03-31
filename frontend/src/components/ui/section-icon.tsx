import {
  Briefcase,
  Code2,
  FileText,
  GraduationCap,
  User,
} from "lucide-react";

interface SectionIconProps {
  title: string;
}

export function SectionIcon({ title }: SectionIconProps) {
  const lower = title.toLowerCase();

  if (
    lower.includes("profil") ||
    lower.includes("résumé") ||
    lower.includes("resume")
  ) {
    return <User size={18} className="text-blue-600" />;
  }

  if (lower.includes("expérience") || lower.includes("experience")) {
    return <Briefcase size={18} className="text-blue-600" />;
  }

  if (lower.includes("formation")) {
    return <GraduationCap size={18} className="text-blue-600" />;
  }

  if (
    lower.includes("compétence") ||
    lower.includes("competence") ||
    lower.includes("skills")
  ) {
    return <Code2 size={18} className="text-blue-600" />;
  }

  return <FileText size={18} className="text-blue-600" />;
}
