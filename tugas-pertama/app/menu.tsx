"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
  { href: "/blog", label: "Blog" },
];

export default function Menu() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-6 border-b px-6 py-4">
      {menuItems.map((item) => {
        const aktif =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              aktif
                ? "font-bold text-blue-600 underline underline-offset-4"
                : "text-slate-600 hover:text-blue-600"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
