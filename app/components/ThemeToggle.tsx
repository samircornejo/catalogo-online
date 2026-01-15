"use client";

import { useTheme } from "@/app/providers";

export function ThemeToggle() {
  const { tema, cambiarTema, montado } = useTheme();

  if (!montado) {
    return null;
  }

  return (
    <button
      onClick={cambiarTema}
      className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg transition-colors font-medium"
      title={`Cambiar a tema ${tema === "light" ? "oscuro" : "claro"}`}
    >
      <span className="text-lg">{tema === "light" ? "🌙" : "☀️"}</span>
      <span className="hidden sm:inline text-sm">{tema === "light" ? "Oscuro" : "Claro"}</span>
    </button>
  );
}
