import Link from "next/link";
import Menu from "./menu";

export default function Header() {
  return (
    <header className="border-b border-[var(--garis)] bg-[var(--kartu)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-[var(--aksen)]">
          Sand Box
        </Link>
        <Menu />
      </div>
    </header>
  );
}
