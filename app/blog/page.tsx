import DaftarTulisan from "./_components/daftar-tulisan";

const TULISAN = ["belajar-nextjs", "hal-baru", "target-tahun-ini"];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-2 text-[var(--teks-lembut)]">
        Daftar catatan latihan. Klik salah satu tulisan untuk membuka halaman dinamisnya.
      </p>
      <div className="mt-6">
        <DaftarTulisan daftar={TULISAN} />
      </div>
    </main>
  );
}
