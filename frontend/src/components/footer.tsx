"use client";

import { UI_CONSTANTS } from "@/lib/constants/index";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-8">
          <div className="max-w-md">
            <h3 className="font-bold text-lg mb-4">
              {UI_CONSTANTS.FOOTER.TITLE}
            </h3>
            <p className="text-gray-400 text-sm leading-6">
              {UI_CONSTANTS.FOOTER.DESCRIPTION}
            </p>
          </div>

          {UI_CONSTANTS.FOOTER.LINKS.RESOURCES.length > 0 && (
            <div className="md:min-w-[220px]">
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {UI_CONSTANTS.FOOTER.LINKS.RESOURCES.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>{UI_CONSTANTS.FOOTER.COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
}