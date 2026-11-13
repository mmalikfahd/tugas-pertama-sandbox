import Link from "next/link";
import TombolFavorit from "@/components/tombol-favorit";
import PrayerTimes from "./_components/prayer-times";

export const dynamic = "force-dynamic";

export default function Home() {
  const today = new Date();
  const hijriyah = new Intl.DateTimeFormat("id-ID-u-ca-islamic-umalqura", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  let hari = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
  }).format(today);
  hari = hari.replace("Minggu", "Ahad");

  const tanggalMasehi = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-16 pt-16">
      <h1 className="text-center text-5xl font-bold text-[var(--aksen)]">Hikmah</h1>
      <p className="mt-2 text-center text-[var(--teks-lembut)]">
        Mengamalkan ilmu secara bijaksana dan tepat pada tempatnya
      </p>

      <div className="mt-8 w-full rounded-lg border border-green-200 bg-green-50 p-6 text-green-900">
        <p className="text-center font-semibold">QS. Al-Baqarah : 269</p>
        <p className="mt-3 text-center text-xl leading-loose">
          يُؤْتِي الْحِكْمَةَ مَنْ يَشَاءُ ۚ وَمَنْ يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا
        </p>
        <p className="mt-4 text-center text-sm leading-relaxed text-green-800">
          Allah menganugerahkan Al-Hikmah kepada siapa yang Dia kehendaki. Dan barangsiapa yang
          dianugerahi Al-Hikmah itu, ia benar-benar telah dianugerahi karunia yang banyak.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center rounded-full border border-[var(--garis)] bg-[var(--kartu)] px-8 py-4 shadow-sm">
        <p className="text-center text-lg font-bold leading-none text-[var(--aksen)]">{hari}</p>
        <p className="mt-1 text-center font-semibold text-[var(--teks)]">{hijriyah}</p>
        <p className="mt-1 text-center text-sm text-[var(--teks-lembut)]">{tanggalMasehi}</p>
      </div>

      <div className="mt-8 w-full">
        <PrayerTimes />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <TombolFavorit slug={`hikmah-${tanggalMasehi}`} />
        <Link
          href="/todo"
          className="rounded-lg bg-[var(--aksen)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Buka aplikasi Todo →
        </Link>
      </div>
    </div>
  );
}
