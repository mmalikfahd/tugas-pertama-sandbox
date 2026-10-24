import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Blog Saya</h1>
      <p className="mt-2 text-slate-600">Kumpulan tulisan dan hal-hal baru yang saya pelajari.</p>

      <ul className="mt-6 list-disc space-y-3 pl-5 underline">
        <li>
          <Link href="/blog/belajar-nextjs">Belajar Next.js</Link>
        </li>
        <li>
          <Link href="/blog/hal-baru">Hal Baru yang Saya Pelajari</Link>
        </li>
        <li>
          <Link href="/blog/target-tahun-ini">Target Tahun Ini</Link>
        </li>
      </ul>
    </main>
  );
}
