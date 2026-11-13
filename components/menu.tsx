"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTema } from "@/contexts/tema-context";
import { useTodos } from "@/contexts/todo-context";

const MENU = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
  { href: "/blog", label: "Blog" },
  { href: "/demo", label: "Demo" },
  { href: "/todo", label: "Todo" },
];

export default function Menu() {
  const pathname = usePathname();
  const { jumlahAktif } = useTodos();
  const { tema, gantiTema } = useTema();

  return (
    <nav aria-label="Menu utama" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      {MENU.map((item) => {
        const aktif =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={aktif ? "page" : undefined}
            className={
              aktif
                ? "font-semibold text-[var(--aksen)] underline underline-offset-4"
                : "text-[var(--teks-lembut)] hover:text-[var(--aksen)]"
            }
          >
            {item.label}
            {item.href === "/todo" && jumlahAktif > 0 ? (
              <span className="ml-1 rounded-full bg-[var(--aksen)] px-1.5 py-0.5 text-[10px] font-bold text-white">
                {jumlahAktif}
              </span>
            ) : null}
          </Link>
        );
      })}

      <button
        type="button"
        onClick={gantiTema}
        className="rounded-full border border-[var(--garis)] px-3 py-1 text-xs font-medium text-[var(--teks-lembut)] hover:border-[var(--aksen)] hover:text-[var(--aksen)]"
        aria-label={tema === "gelap" ? "Ganti ke tema terang" : "Ganti ke tema gelap"}
      >
        {tema === "gelap" ? "☀️ Terang" : "🌙 Gelap"}
      </button>
    </nav>
  );
}
