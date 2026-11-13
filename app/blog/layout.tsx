import Link from "next/link";

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <p className="bg-[var(--aksen-lembut)] px-6 py-2 text-sm text-[var(--teks-lembut)]">
        Bagian: Blog —{" "}
        <Link href="/blog" className="font-medium underline">
          semua tulisan
        </Link>
      </p>
      {children}
    </section>
  );
}
