"use client";

import { useFavorit } from "@/contexts/favorit-context";

export default function TombolFavorit({ slug }: { slug: string }) {
  const { apakahFavorit, toggleFavorit } = useFavorit();
  const aktif = apakahFavorit(slug);

  return (
    <button
      type="button"
      onClick={() => toggleFavorit(slug)}
      aria-pressed={aktif}
      className={
        aktif
          ? "rounded-lg border border-amber-400 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700"
          : "rounded-lg border border-[var(--garis)] px-4 py-2 text-sm font-medium text-[var(--teks-lembut)] hover:border-amber-400 hover:text-amber-600"
      }
    >
      {aktif ? "★ Favorit" : "☆ Favorit"}
    </button>
  );
}
