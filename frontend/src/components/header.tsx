// src/components/Navbar.tsx
import { FileCheck } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-white">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <FileCheck className="text-blue-600" size={20} />
          <span className="text-xl font-bold text-slate-800">Audit-Flow</span>
        </Link>
        

      </div>
      
      <div className="text-sm text-gray-600">
        Analyse de CV instantanée par IA
      </div>
    </nav>
  );
}
