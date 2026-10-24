export default async function TulisanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const judul = slug
    .split("-")
    .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1))
    .join(" ");

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">{judul}</h1>

      <p className="mt-4 leading-7 text-slate-700">
        Ini adalah tulisan saya tentang {judul.toLowerCase()}. Saya ingin terus belajar, mencoba hal
        baru, dan mengembangkan kemampuan saya melalui project ini.
      </p>
    </main>
  );
}
