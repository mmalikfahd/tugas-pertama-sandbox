//import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Logo */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-10 pointer-events-none"></div>

      {/* Konten Utama */}
      <main className="relative z-10 flex flex-col items-center text-center max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-4">Ini Beranda</h1>
        <p className="text-lg mb-6 animate-fade-in">
          Mau liat apa <span className="font-bold">Abang</span>Kuh
        </p>
      </main>
    </div>
  );
}
