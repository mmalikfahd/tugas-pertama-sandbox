"use client";

import { useRouter } from "next/navigation";

export default function TombolBeranda() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
    >
      Kembali keBeranda
    </button>
  );
}
