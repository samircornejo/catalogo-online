"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  tema: Theme;
  cambiarTema: () => void;
  montado: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Theme>("light");
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
    const temaGuardado = localStorage.getItem("tema") as Theme | null;
    const temaSistema = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const temaActual = temaGuardado || temaSistema;
    setTema(temaActual);
    aplicarTema(temaActual);
  }, []);

  const aplicarTema = (nuevoTema: Theme) => {
    if (nuevoTema === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("tema", nuevoTema);
  };

  const cambiarTema = () => {
    const nuevoTema = tema === "light" ? "dark" : "light";
    setTema(nuevoTema);
    aplicarTema(nuevoTema);
  };

  return (
    <ThemeContext.Provider value={{ tema, cambiarTema, montado }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe ser usado dentro de ThemeProvider");
  }
  return context;
}
