"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type FavoritContextValue = {
  favorit: string[];
  jumlahFavorit: number;
  apakahFavorit: (slug: string) => boolean;
  toggleFavorit: (slug: string) => void;
};

const KUNCI_FAVORIT = "sandbox:favorit";
const FavoritContext = createContext<FavoritContextValue | null>(null);

export function FavoritProvider({ children }: { children: React.ReactNode }) {
  const [favorit, setFavorit] = useState<string[]>([]);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    try {
      const tersimpan = localStorage.getItem(KUNCI_FAVORIT);
      if (tersimpan) {
        const data: unknown = JSON.parse(tersimpan);
        if (Array.isArray(data) && data.every((item) => typeof item === "string")) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- membaca data setelah mount agar tidak hydration mismatch
          setFavorit(data);
        }
      }
    } catch {
      // data rusak atau localStorage diblokir browser
    }
    setSiap(true);
  }, []);

  useEffect(() => {
    if (!siap) return;
    try {
      localStorage.setItem(KUNCI_FAVORIT, JSON.stringify(favorit));
    } catch {
      // localStorage bisa penuh atau diblokir browser
    }
  }, [favorit, siap]);

  const toggleFavorit = useCallback((slug: string) => {
    setFavorit((sebelumnya) =>
      sebelumnya.includes(slug)
        ? sebelumnya.filter((item) => item !== slug)
        : [...sebelumnya, slug],
    );
  }, []);

  const apakahFavorit = useCallback((slug: string) => favorit.includes(slug), [favorit]);

  const value = useMemo(
    () => ({
      favorit,
      jumlahFavorit: favorit.length,
      apakahFavorit,
      toggleFavorit,
    }),
    [favorit, apakahFavorit, toggleFavorit],
  );

  return <FavoritContext.Provider value={value}>{children}</FavoritContext.Provider>;
}

export function useFavorit() {
  const context = useContext(FavoritContext);
  if (!context) {
    throw new Error("useFavorit harus dipakai di dalam FavoritProvider");
  }
  return context;
}
