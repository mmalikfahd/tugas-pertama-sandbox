"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import KotakCari from "./kotak-cari";

function judulDariSlug(slug: string) {
  return slug
    .split("-")
    .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1))
    .join(" ");
}

export default function DaftarTulisan({ daftar }: { daftar: string[] }) {
  const [cari, setCari] = useState("");

  const hasil = useMemo(() => {
    const kata = cari.trim().toLowerCase();
    if (!kata) return daftar;
    return daftar.filter((slug) => slug.toLowerCase().includes(kata));
  }, [daftar, cari]);

  return (
    <div className="space-y-4">
      <KotakCari nilai={cari} saatBerubah={setCari} />

      {hasil.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[var(--garis)] px-4 py-6 text-center text-sm text-[var(--teks-lembut)]">
          Tidak ada tulisan yang cocok dengan &ldquo;{cari}&rdquo;.
        </p>
      ) : (
        <ul className="divide-y divide-[var(--garis)] overflow-hidden rounded-xl border border-[var(--garis)] bg-[var(--kartu)]">
          {hasil.map((slug) => (
            <li key={slug}>
              <Link
                href={`/blog/${slug}`}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[var(--aksen-lembut)]"
              >
                <span className="font-medium">{judulDariSlug(slug)}</span>
                <span aria-hidden className="text-[var(--aksen)]">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
