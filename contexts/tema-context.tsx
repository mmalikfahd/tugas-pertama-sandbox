"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Tema = "terang" | "gelap";

type TemaContextValue = {
  tema: Tema;
  aturTema: (tema: Tema) => void;
  gantiTema: () => void;
};

const KUNCI_TEMA = "sandbox:tema";
const TemaContext = createContext<TemaContextValue | null>(null);

export function TemaProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Tema>("terang");
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    try {
      const tersimpan = localStorage.getItem(KUNCI_TEMA);
      if (tersimpan === "gelap" || tersimpan === "terang") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- membaca preferensi setelah mount agar tidak hydration mismatch
        setTema(tersimpan);
      }
    } catch {
      // localStorage bisa diblokir browser
    }
    setSiap(true);
  }, []);

  useEffect(() => {
    if (!siap) return;

    document.documentElement.dataset.tema = tema;
    try {
      localStorage.setItem(KUNCI_TEMA, tema);
    } catch {
      // localStorage bisa penuh atau diblokir browser
    }
  }, [tema, siap]);

  const aturTema = useCallback((nilai: Tema) => setTema(nilai), []);
  const gantiTema = useCallback(
    () => setTema((sebelumnya) => (sebelumnya === "terang" ? "gelap" : "terang")),
    [],
  );

  const value = useMemo(() => ({ tema, aturTema, gantiTema }), [tema, aturTema, gantiTema]);

  return <TemaContext.Provider value={value}>{children}</TemaContext.Provider>;
}

export function useTema() {
  const context = useContext(TemaContext);
  if (!context) {
    throw new Error("useTema harus dipakai di dalam TemaProvider");
  }
  return context;
}
