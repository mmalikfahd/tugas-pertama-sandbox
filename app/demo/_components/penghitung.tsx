"use client";

import { useCallback, useState } from "react";

export default function Penghitung() {
  const [nilai, setNilai] = useState(0);

  const tambah = useCallback(() => setNilai((sebelumnya) => sebelumnya + 1), []);
  const kurangi = useCallback(() => setNilai((sebelumnya) => sebelumnya - 1), []);
  const reset = useCallback(() => setNilai(0), []);

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Demo Penghitung</h1>
      <p className="mt-2 text-sm text-[var(--teks-lembut)]">
        Contoh state interaktif dengan <code>useState</code> dan <code>useCallback</code>.
      </p>
      <p className="my-8 text-6xl font-bold tabular-nums text-[var(--aksen)]">{nilai}</p>
      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={kurangi}
          className="rounded-lg border border-[var(--garis)] px-4 py-2 font-medium hover:border-[var(--aksen)]"
        >
          −1
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-[var(--garis)] px-4 py-2 font-medium hover:border-[var(--aksen)]"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={tambah}
          className="rounded-lg bg-[var(--aksen)] px-4 py-2 font-medium text-white hover:opacity-90"
        >
          +1
        </button>
      </div>
    </div>
  );
}
