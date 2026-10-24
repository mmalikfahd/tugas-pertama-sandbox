import TombolBeranda from "../TombolBeranda";

export default function TentangPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Tentang Saya</h1>
      <p className="text-lg text-center max-w-2xl">
        Halo! Perkenalkan, nama saya Malik Fahd. Saya adalah seorang pelajar yang memiliki
        ketertarikan dalam bidang teknologi, pemrograman, dan pengembangan website. Saya senang
        mempelajari hal-hal baru, mengembangkan keterampilan, serta membuat proyek kreatif yang
        bermanfaat. Melalui website ini, saya ingin memperkenalkan diri, menampilkan karya yang
        telah saya buat, dan terus berkembang menjadi pribadi yang lebih kreatif, mandiri, dan
        inovatif.**
      </p>
      <TombolBeranda />
    </div>
  );
}
